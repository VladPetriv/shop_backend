const supertest = require('supertest');
const app = require('../index.js');
const { Brand } = require('../models/models.js');
const BrandService = require('../services/brandService.js');
const request = supertest(app);

describe('Brand test', () => {
  beforeEach(async () => {
    await Brand.destroy({ where: {} });
  });
  afterAll(async () => {
    await Brand.destroy({ where: {} });
  });
  describe('GET brands => /api/brand/items', () => {
    it('It should return  brands with 200 as status code', async () => {
      const response = await request.get('/api/brand/items');
      expect(response.status).toBe(200);
      expect(response.body).toStrictEqual([]);
      expect(response.body.length).toBe(0);
      return response;
    });
  });
  describe('GET brand => /api/brand/items/id', () => {
    let id;
    let name;
    beforeEach(async () => {
      const brand = await BrandService.create('test');
      id = brand.id;
      name = brand.name;
    });
    it('It should return brand with 200 as status code', async () => {
      const response = await request.get(`/api/brand/items/${id}`);
      expect(response.status).toBe(200);
      expect(response.body).toBeInstanceOf(Object);
      expect(response.body.id).toBe(id);
      expect(response.body.name).toBe(name);
      return response;
    });
  });
  describe('POST brand => api/brand/create', () => {
    it('It should create new brand and return 200 as status code', async () => {
      const response = await request.post('/api/brand/create').send({
        name: 'test_brand',
      });
      expect(response.status).toBe(200);
      expect(response.body).toBeInstanceOf(Object);
      expect(response.body.id).not.toBeUndefind;
      expect(response.body.name).toBe('test_brand');
    });
  });

  describe('DELETE brand => /api/brand/items/id', () => {
    let id;
    beforeEach(async () => {
      const brand = await BrandService.create('test_brand');
      id = brand.id;
    });
    it('It should delete brand and return 200 as status code', async () => {
      const response = await request.delete(`/api/brand/items/${id}`);
      expect(response.status).toBe(200);
      expect(response.body).not.toBeUndefind;
    });
  });

  describe('PUT brand /api/brand/items/id', () => {
    let id;
    beforeEach(async () => {
      const brand = await BrandService.create('test_brand');
      id = brand.id;
    });
    it('It should update brand and return 200 as status code', async () => {
      const response = await request.put(`/api/brand/items/${id}`);
      expect(response.status).toBe(200);
      expect(response.body).not.toBeUndefind;
    });
  });
});
