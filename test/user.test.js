import supertest from 'supertest';
import app from '../index.js';
import { userTestHelper } from './testHelper.js';

const request = supertest(app);

describe('User test', () => {
  beforeEach(async () => await userTestHelper().destroyTestUser());
  afterAll(async () => await userTestHelper().destroyTestUser());

  describe('POST user => api/registration', () => {
    it('It should create user and return jwt token with 200 as status code', async () => {
      const response = await request.post('/api/registration').send({
        login: 'test_user',
        password: 'test_password',
      });

      expect(response.status).toBe(200);
      expect(response.body).not.toBeUndefind;
      expect(response.body).toBeInstanceOf(Object);
      expect(response.body.token).not.toBeUndefind;
    });
  });

  describe('POST user => /api/login', () => {
    const login = 'test_login';
    const password = 'test_password';
    beforeEach(async () => {
      await request.post('/api/registration').send({ login, password });
    });
    it('it should login user and return token with 200 as status code', async () => {
      const response = await request.post('/api/login').send({
        login,
        password,
      });
      expect(response.status).toBe(200);
      expect(response.body).not.toBeUndefind;
      expect(response.body).toBeInstanceOf(Object);
      expect(response.body.token).not.toBeUndefind;
    });
  });
});
