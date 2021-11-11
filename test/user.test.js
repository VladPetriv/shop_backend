import supertest from 'supertest';
import app from '../index.js';
import { userTestHelper } from './testHelper.js';

const request = supertest(app);

describe('User test', () => {
  beforeEach(async () => await userTestHelper().destroyTestUser());
  afterAll(async () => await userTestHelper().destroyTestUser());

  describe('POST user => api/registration', () => {
    const login = 'test_login';
    const password = 'test_password';
    beforeAll(async () => {
      await userTestHelper().createTestUser(login, password);
    });
    it('It should create user and return jwt token', async () => {
      const response = await request.post('/api/registration').send({
        login: 'test_user',
        password: 'test_password',
      });

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('token');
    });
  });

  describe('POST user => /api/login', () => {
    const login = 'test_login';
    const password = 'test_password';
    beforeEach(async () => {
      await request.post('/api/registration').send({ login, password });
    });
    it('it should  return jwt token', async () => {
      const response = await request.post('/api/login').send({
        login,
        password,
      });
      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('token');
    });
  });
});
