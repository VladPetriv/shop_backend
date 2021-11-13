import { join, resolve } from 'path';
import supertest from 'supertest';
import app from '../index.js';
import {
  productTestHelper,
  brandTestHelper,
  typeTestHelper,
} from './testHelper.js';

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

  describe('POST product => /api/product/', () => {
    let typeId;
    let brandId;
    beforeEach(async () => {
      typeId = await typeTestHelper().addNewTestType();
      brandId = await brandTestHelper().addNewTestBrand();
    });

    it('it should create new product', async () => {
      const response = await request
        .post('/api/product/create')
        .field('name', 'test_product')
        .field('price', 1000)
        .field('description', 'test description')
        .field('typeId', typeId)
        .field('brandId', brandId)
        .attach('img', join(resolve(), '/' + process.env.IMAGE_NAME));

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('message');
      expect(response.body.product).toHaveProperty('id');
      expect(response.body.product).toHaveProperty('name');
      expect(response.body.product).toHaveProperty('price');
      expect(response.body.product).toHaveProperty('description');
      expect(response.body.product).toHaveProperty('rating');
      expect(response.body.product).toHaveProperty('img');
      expect(response.body.product).toHaveProperty('typeId');
      expect(response.body.product).toHaveProperty('brandId');
      expect(response.body.product.name).toBe('test_product');
      expect(response.body.product.price).toBe(1000);
      expect(response.body.product.description).toBe('test description');
      expect(response.body.product.typeId).toBe(typeId);
      expect(response.body.product.brandId).toBe(brandId);
      expect(response.body.message).toBe('Product was created');
    });
  });
});
