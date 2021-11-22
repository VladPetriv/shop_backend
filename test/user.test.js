import supertest from 'supertest';
import app from '../index.js';
import { userTestHelper } from './testHelper.js';
import {
  USE_ANOTHER_LOGIN,
  INCORRECT_LOGIN,
  INCORRECT_PASSWORD,
  NOT_VALID_LOGIN,
  NOT_VALID_EMAIL,
  NOT_VALID_PASSWORD,
} from '../error_messages/userErrorMessages.js';

const request = supertest(app);

describe('User test', () => {
  beforeEach(async () => await userTestHelper().destroyTestUser());
  afterAll(async () => await userTestHelper().destroyTestUser());

  describe('POST user => api/registration', () => {
    const login = 'login';
    const email = 'test@test.com';
    const password = 'password';
    beforeEach(async () => {
      await userTestHelper().createTestUser(login, password);
    });
    it('It should create user and return jwt token', async () => {
      const response = await request.post('/api/registration').send({
        login: 'test_user',
        email: 'testemail@test.com',
        password: 'test_password',
      });

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('token');
    });
    it('it should throw error that user with this login is exist', async () => {
      const response = await request.post('/api/registration').send({
        login,
        email,
        password,
      });
      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty('message');
      expect(response.body.message).toBe(USE_ANOTHER_LOGIN);
    });
    it('it should throw error that email is not valid', async () => {
      const response = await request.post('/api/registration').send({
        login: 'test login',
        email: 'bademail',
        password: 'password',
      });
      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty('errors');
      expect(response.body.errors[0].msg).toBe(NOT_VALID_EMAIL);
    });
    it('it should throw error that login is not valid', async () => {
      const response = await request.post('/api/registration').send({
        login: 'lg',
        email: 'test@test.com',
        password: 'password',
      });
      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty('errors');
      expect(response.body.errors[0].msg).toBe(NOT_VALID_LOGIN);
    });
    it('it should throw error that password is not valid', async () => {
      const response = await request.post('/api/registration').send({
        login: 'login',
        email: 'test@test.com',
        password: 'psw',
      });
      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty('errors');
      expect(response.body.errors[0].msg).toBe(NOT_VALID_PASSWORD);
    });
  });

  describe('POST user => /api/login', () => {
    const login = 'test_login';
    const email = 'testemail@test.com';
    const password = 'test_password';
    beforeEach(async () => {
      await request.post('/api/registration').send({ login, email, password });
    });
    it('it should  return jwt token', async () => {
      const response = await request.post('/api/login').send({
        login,
        email,
        password,
      });
      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('token');
    });
    it('it should throw error that login is incorrect', async () => {
      const response = await request.post('/api/login').send({
        login: login + '/',
        email,
        password,
      });
      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty('message');
      expect(response.body.message).toBe(INCORRECT_LOGIN);
    });
    it('it should throw error that password is incorrect', async () => {
      const response = await request.post('/api/login').send({
        login,
        email,
        password: password + '/',
      });
      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty('message');
      expect(response.body.message).toBe(INCORRECT_PASSWORD);
    });
  });
});
