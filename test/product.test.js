import supertest from 'supertest';
import app from '../index.js';
import { productTestHelper } from './testHelper.js';

const request = supertest(app);

describe('Product test', () => {
  beforeEach(async () => await productTestHelper().destroyAllModels());
  afterAll(async () => await productTestHelper().destroyAllModels());

  describe('GET products => /api/product/items', () => {
    it('It should get products', async () => {
      const response = await request.get('/api/product/items');
      expect(response.status).toBe(200);
      expect(response.body.length).toBe(0);
      expect(response.body).toStrictEqual([]);
    });
  });

  describe('GET product => /api/product/items/id', () => {
    let id;
    beforeEach(async () => {
      id = await productTestHelper().addNewTestProduct();
    });
    it('It should return product', async () => {
      const response = await request.get(`/api/product/items/${id}`);
      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('id');
      expect(response.body).toHaveProperty('name');
      expect(response.body).toHaveProperty('price');
      expect(response.body).toHaveProperty('description');
      expect(response.body).toHaveProperty('rating');
      expect(response.body).toHaveProperty('img');
      expect(response.body.id).toBe(id);
      expect(response.body.name).toBe('test');
      expect(response.body.price).toBe(1000);
    });
    it('it should throw error that product with this id doesnt exist', async () => {
      const response = await request.get(`/api/product/items/${id + 1}`);
      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty('message');
      expect(response.body.message).toBe('Product with this id doesnt exist');
    });
  });

  describe('DELETE product => /api/product/items/id', () => {
    let id;
    beforeEach(async () => {
      id = await productTestHelper().addNewTestProduct();
    });
    it('it should delete product', async () => {
      const response = await request.delete(`/api/product/items/${id}`);

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('message');
      expect(response.body.message).toBe('Product was deleted');
    });
    it('it should throw error that product with this id doesnt exist', async () => {
      const response = await request.delete(`/api/product/items/${id + 1}`);
      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty('message');
      expect(response.body.message).toBe('Product with this id doesnt exist');
    });
  });
});
