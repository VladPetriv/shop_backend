import supertest from 'supertest';
import app from '../index.js';
import { brandTestHelper, userTestHelper } from './testHelper.js';
import {
  NOT_VALID_NAME,
  NO_BRAND_WITH_ID,
} from '../error_messages/brandErrorMessages.js';

const request = supertest(app);

describe('Brand test', () => {
  beforeEach(async () => {
    await brandTestHelper().destroyAllBrands();
    await userTestHelper().destroyTestUser();
  });
  afterAll(async () => {
    await brandTestHelper().destroyAllBrands();
    await userTestHelper().destroyTestUser();
  });

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
      expect(response.body.message).toBe(NO_BRAND_WITH_ID);
    });
  });
  describe('POST brand => api/brand/create', () => {
    const name = 'test';
    let jwt;
    let jwt2;
    const login = 'test';
    const email = 'testfajsfde@test.com';
    const password = 'testfjasdfjk';
    const role = 'ADMIN';

    beforeEach(async () => {
      await userTestHelper().createTestUser(login, email, password, role);
      await userTestHelper().createTestUser(
        'testlogin',
        'testemeil@test.com',
        'testpassword'
      );
      jwt = await request.post('/api/login').send({ login, email, password });
      jwt2 = await request.post('/api/login').send({
        login: 'testlogin',
        email: 'testemail@test.com',
        password: 'testpassword',
      });
    });
    it(`It should create new brand with name - ${name}`, async () => {
      const response = await request
        .post('/api/brand/create')
        .set('Authorization', 'Bearer ' + jwt.body.token)
        .send({
          name,
        });

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('brand');
      expect(response.body).toHaveProperty('message');
      expect(response.body.brand).toHaveProperty('id');
      expect(response.body.brand).toHaveProperty('name');
      expect(response.body.brand.name).toBe(name);
      expect(response.body.message).toBe('Brand was created');
    });
    it('it should throw error that user is not logined', async () => {
      const response = await request.post('/api/brand/create').send({
        name,
      });

      expect(response.status).toBe(401);
      expect(response.body).toHaveProperty('message');
      expect(response.body.message).toBe('User is not logined');
    });

    it('it should throw error that name is not valid', async () => {
      const response = await request
        .post('/api/brand/create')
        .set('Authorization', 'Bearer ' + jwt.body.token)
        .send({
          name: 't',
        });

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty('errors');
      expect(response.body.errors[0].msg).toBe(NOT_VALID_NAME);
    });

    it('it should throw error that user dont have accsess', async () => {
      const response = await request
        .post('/api/brand/create')
        .set('Authorization', 'Bearer ' + jwt2.body.token)
        .send({ name });

      expect(response.status).toBe(403);
      expect(response.body).toHaveProperty('message');
      expect(response.body.message).toBe('No accsess');
    });
  });

  describe('DELETE brand => /api/brand/items/id', () => {
    let id;
    let jwt;
    let jwt2;
    const login = 'test';
    const email = 'testfajsfde@test.com';
    const password = 'testfjasdfjk';
    const role = 'ADMIN';

    beforeEach(async () => {
      id = await brandTestHelper().addNewTestBrand();
      await userTestHelper().createTestUser(login, email, password, role);
      await userTestHelper().createTestUser(
        'testlogin',
        'testemeil@test.com',
        'testpassword'
      );
      jwt = await request.post('/api/login').send({ login, email, password });
      jwt2 = await request.post('/api/login').send({
        login: 'testlogin',
        email: 'testemail@test.com',
        password: 'testpassword',
      });
    });

    it('It should delete brand', async () => {
      const response = await request
        .delete(`/api/brand/items/${id}`)
        .set('AUthorization', 'Bearer ' + jwt.body.token);

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('message');
      expect(response.body.message).toBe('Brand was deleted');
    });

    it('it should throw error that user is not logined', async () => {
      const response = await request.delete(`/api/brand/items/${id}`);

      expect(response.status).toBe(401);
      expect(response.body).toHaveProperty('message');
      expect(response.body.message).toBe('User is not logined');
    });

    it('it should throw error that user dont have accsess', async () => {
      const response = await request
        .delete(`/api/brand/items/${id}`)
        .set('Authorization', 'Bearer ' + jwt2.body.token);

      expect(response.status).toBe(403);
      expect(response.body).toHaveProperty('message');
      expect(response.body.message).toBe('No accsess');
    });

    it('it should throw an error that brand doesnt exits', async () => {
      const response = await request
        .delete(`/api/brand/items/${id + 1}`)
        .set('Authorization', 'Bearer ' + jwt.body.token);

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty('message');
      expect(response.body.message).toBe(NO_BRAND_WITH_ID);
    });
  });

  describe('PUT brand /api/brand/items/id', () => {
    let id;
    let jwt;
    let jwt2;
    const login = 'test';
    const email = 'testfajsfde@test.com';
    const password = 'testfjasdfjk';
    const role = 'ADMIN';

    beforeEach(async () => {
      id = await brandTestHelper().addNewTestBrand();
      await userTestHelper().createTestUser(login, email, password, role);
      await userTestHelper().createTestUser(
        'testlogin',
        'testemeil@test.com',
        'testpassword'
      );
      jwt = await request.post('/api/login').send({ login, email, password });
      jwt2 = await request.post('/api/login').send({
        login: 'testlogin',
        email: 'testemail@test.com',
        password: 'testpassword',
      });
    });

    it('It should update brand', async () => {
      const response = await request
        .put(`/api/brand/items/${id}`)
        .set('Authorization', 'Bearer ' + jwt.body.token);

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('message');
      expect(response.body.message).toBe('Brand was updated');
    });

    it('it should throw error that user is not logined', async () => {
      const response = await request.put(`/api/brand/items/${id}`);

      expect(response.status).toBe(401);
      expect(response.body).toHaveProperty('message');
      expect(response.body.message).toBe('User is not logined');
    });

    it('it should throw error that user dont have accsess', async () => {
      const response = await request
        .put(`/api/brand/items/${id}`)
        .set('Authorization', 'Bearer ' + jwt2.body.token);

      expect(response.status).toBe(403);
      expect(response.body).toHaveProperty('message');
      expect(response.body.message).toBe('No accsess');
    });

    it('it should throw error that brand doesnt exist', async () => {
      const response = await request
        .put(`/api/brand/items/${id + 1}`)
        .set('Authorization', 'Bearer ' + jwt.body.token);

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty('message');
      expect(response.body.message).toBe(NO_BRAND_WITH_ID);
    });
  });
});
