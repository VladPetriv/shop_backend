import supertest from 'supertest';
import app from '../index.js';
import { productTestHelper } from './testHelper.js';

const request = supertest(app);

describe('Product test', () => {
  beforeEach(async () => await productTestHelper().destroyAllModels());
  afterAll(async () => await productTestHelper().destroyAllModels());

  describe('GET products => /api/product/items', () => {
    it('It should get products and return 200 as status code', async () => {
      const response = await request.get('/api/product/items');
      expect(response.status).toBe(200);
      expect(response.body).not.toBeUndefind;
      expect(response.body.length).toBe(0);
      expect(response.body).toStrictEqual([]);
    });
  });
  describe('GET product => /api/product/items/id', () => {
    let id;
    beforeEach(async () => {
      id = await productTestHelper().addNewTestProduct();
    });
    it('It should get product and return 200 as status code', async () => {
      const response = await request.get(`/api/product/items/${id}`);
      expect(response.status).toBe(200);
      expect(response.body).not.toBeUndefind;
      expect(response.body.id).toBe(id);
      expect(response.body.name).toBe('test');
      expect(response.body.price).toBe(1000);
      expect(response.files).not.toBeUndefind;
    });
  });

  describe('DELETE product => /api/product/items/id', () => {
    let id;
    beforeEach(async () => {
      id = await productTestHelper().addNewTestProduct();
    });
    it('it should delete product and return 200 as status code', async () => {
      const response = await request.delete(`/api/product/items/${id}`);

      expect(response.status).toBe(200);
      expect(response.body).not.toBeUndefind;
      expect(response.body).toStrictEqual(1);
    });
  });
});
