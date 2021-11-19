import supertest from 'supertest';
import app from '../index.js';
import { typeTestHelper } from './testHelper.js';
import {
  NOT_VALID_NAME,
  NO_TYPE_WITH_ID,
} from '../error_messages/typeErrorMessages.js';

const request = supertest(app);

describe('Type test', () => {
  beforeEach(async () => await typeTestHelper().destroyAllTypes());
  afterAll(async () => await typeTestHelper().destroyAllTypes());
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
    beforeEach(async () => {
      id = await typeTestHelper().addNewTestType();
    });
    it('it should return type and 200 as status code', async () => {
      const response = await request.get(`/api/type/items/${id}`);
      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('id');
      expect(response.body).toHaveProperty('name');
      expect(response.body.id).toBe(id);
      expect(response.body.name).toBe('test');
    });
    it('it should throw error that type with this id doesnt exits', async () => {
      const response = await request.get(`/api/type/items/${id + 1}`);
      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty('message');
      expect(response.body.message).toBe(NO_TYPE_WITH_ID);
    });
  });
  describe('POST type => /api/type/create', () => {
    it('It should create type and return 200 as status code', async () => {
      const response = await request.post('/api/type/create').send({
        name: 'test',
      });
      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('type');
      expect(response.body).toHaveProperty('message');
      expect(response.body.type.name).toBe('test');
      expect(response.body.message).toBe('Type was created');
    });
    it('it should throw error that name is not valid', async () => {
      const response = await request.post('/api/type/create').send({
        name: 't',
      });
      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty('errors');
      expect(response.body.errors[0].msg).toBe(NOT_VALID_NAME);
    });
  });

  describe('DELETE type => /api/type/items/id', () => {
    let id;
    beforeEach(async () => {
      id = await typeTestHelper().addNewTestType();
    });
    it('It should delete type and return message', async () => {
      const response = await request.delete(`/api/type/items/${id}`);

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('message');
      expect(response.body.message).toBe('Type was deleted');
    });
    it('it should throw error that type doesnt exist', async () => {
      const response = await request.delete(`/api/type/items/${id + 1}`);
      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty('message');
      expect(response.body.message).toBe(NO_TYPE_WITH_ID);
    });
  });

  describe('PUT type => /api/type/items/id', () => {
    let id;
    beforeEach(async () => {
      id = await typeTestHelper().addNewTestType();
    });
    it('it should update type', async () => {
      const response = await request
        .put(`/api/type/items/${id}`)
        .send({ name: 'updated_type' });
      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('message');
      expect(response.body.message).toBe('Type was updated');
    });
    it('it should throw error that type doesnt exist', async () => {
      const response = await request.put(`/api/type/items/${id + 1}`);
      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty('message');
      expect(response.body.message).toBe(NO_TYPE_WITH_ID);
    });
  });
});
