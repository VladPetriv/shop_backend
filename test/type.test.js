const supertest = require('supertest');
const app = require('../index.js');
const { Type } = require('../models/models.js');
const TypeService = require('../services/typeService.js');
const request = supertest(app);

describe('Type test', () => {
  beforeEach(async () => {
    await Type.destroy({ where: {} });
  });
  afterAll(async () => {
    await Type.destroy({ where: {} });
  });
  describe('GET types => /api/type/items', () => {
    it('it should return all types and 200 as status code', async () => {
      const response = await request.get('/api/type/items');
      expect(response.status).toBe(200);
      expect(response.body).toStrictEqual([]);
      expect(response.body.length).toBe(0);
    });
  });
  describe('GET type => /api/type/items/id', () => {
    let id;
    let name;
    beforeEach(async () => {
      const type = await TypeService.create('test_type');
      id = type.id;
      name = type.name;
    });
    it('it should return type and 200 as status code', async () => {
      const response = await request.get(`/api/type/items/${id}`);
      expect(response.status).toBe(200);
      expect(response.body).not.toBeUndefind;
      expect(response.body.id).toBe(id);
      expect(response.body.name).toBe(name);
    });
  });
  describe('POST type => /api/type/create', () => {
    it('It should create type and return 200 as status code', async () => {
      const response = await request.post('/api/type/create').send({
        name: 'test_type',
      });
      expect(response.status).toBe(200);
      expect(response.body).not.toBeUndefind;
      expect(response.body).toBeInstanceOf(Object);
      expect(response.body.name).toBe('test_type');
    });
  });

  describe('DELETE type => /api/type/items/id', () => {
    let id;
    beforeEach(async () => {
      const type = await TypeService.create('test_brand');
      id = type.id;
    });
    it('It should delete type and return 200 as status code', async () => {
      const response = await request.delete(`/api/type/items/${id}`);

      expect(response.status).toBe(200);
      expect(response.body).not.toBeUndefind;
      expect(response.body).toBe(1);
    });
  });

  describe('PUT type => /api/type/items/id', () => {
    let id;
    beforeEach(async () => {
      const type = await TypeService.create('test_type');
      id = type.id;
    });
    it('it should update type and return 200 as status code', async () => {
      const response = await request
        .put(`/api/type/items/${id}`)
        .send({ name: 'updated_type' });
      expect(response.status).toBe(200);
      expect(response.body).not.toBeUndefind;
      expect(response.body).toStrictEqual([1]);
    });
  });
});
