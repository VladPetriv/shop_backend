import supertest from 'supertest';
import app from '../index.js';
import { brandTestHelper } from './testHelper.js';

const request = supertest(app);

describe('Brand test', () => {
  beforeEach(async () => brandTestHelper().destroyAllBrands());
  afterAll(async () => await brandTestHelper().destroyAllBrands());

  describe('GET brands => /api/brand/items', () => {
    it('It should return all brands', async () => {
      const response = await request.get('/api/brand/items');
      expect(response.status).toBe(200);
      expect(response.body).toStrictEqual([]);
      expect(response.body.length).toBe(0);
    });
  });

  describe('GET brand => /api/brand/items/id', () => {
    let id;
    beforeEach(async () => {
      id = await brandTestHelper().addNewTestBrand();
    });
    it(`It should return brand with id-${id}`, async () => {
      const response = await request.get(`/api/brand/items/${id}`);
      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('id');
      expect(response.body).toHaveProperty('name');
      expect(response.body.id).toBe(id);
      expect(response.body.name).toBe('test');
    });
    it('it should throw error that brand doesnt exist', async () => {
      const response = await request.get(`/api/brand/items/${id + 1}`);
      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty('message');
      expect(response.body.message).toBe('Brand with this id doesnt exist');
    });
  });
  describe('POST brand => api/brand/create', () => {
    const name = 'test';
    it(`It should create new brand with name - ${name}`, async () => {
      const response = await request.post('/api/brand/create').send({
        name,
      });
      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('brand');
      expect(response.body).toHaveProperty('message');
      expect(response.body.brand).toHaveProperty('id');
      expect(response.body.brand).toHaveProperty('name');
      expect(response.body.brand.name).toBe(name);
    });
  });

  describe('DELETE brand => /api/brand/items/id', () => {
    let id;
    beforeEach(async () => {
      id = await brandTestHelper().addNewTestBrand();
    });
    it('It should delete brand', async () => {
      const response = await request.delete(`/api/brand/items/${id}`);
      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('message');
      expect(response.body.message).toBe('Brand was deleted');
    });
    it('it should throw an error that brand doesnt exits', async () => {
      const response = await request.delete(`/api/brand/items/${id + 1}`);
      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty('message');
      expect(response.body.message).toBe('Brand with this id doesnt exist');
    });
  });

  describe('PUT brand /api/brand/items/id', () => {
    let id;
    beforeEach(async () => {
      id = await brandTestHelper().addNewTestBrand();
    });
    it('It should update brand', async () => {
      const response = await request.put(`/api/brand/items/${id}`);
      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('message');
      expect(response.body.message).toBe('Brand was updated');
    });
    it('it should throw an error that brand doesnt exist', async () => {
      const response = await request.put(`/api/brand/items/${id + 1}`);
      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty('message');
      expect(response.body.message).toBe('Brand with this id doesnt exist');
    });
  });
});
