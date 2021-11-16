import supertest from 'supertest';
import app from '../index.js';
import { userTestHelper } from './testHelper.js';

const request = supertest(app);

describe('User test', () => {
  beforeEach(async () => await userTestHelper().destroyTestUser());
  afterAll(async () => await userTestHelper().destroyTestUser());

  describe('POST user => api/registration', () => {
    const login = 'login';
    const password = 'password';
    beforeEach(async () => {
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
    it('it should throw error that user with this login is exist', async () => {
      const response = await request.post('/api/registration').send({
        login,
        password,
      });
      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty('message');
      expect(response.body.message).toBe('User with this login is exist');
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
    it('it should throw error that login is incorrect', async () => {
      const response = await request.post('/api/login').send({
        login: login + '/',
        password,
      });
      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty('message');
      expect(response.body.message).toBe('Incorrect login');
    });
    it('it should throw error that password is incorrect', async () => {
      const response = await request.post('/api/login').send({
        login,
        password: password + '/',
      });
      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty('message');
      expect(response.body.message).toBe('Incorrect password');
    });
  });
});
