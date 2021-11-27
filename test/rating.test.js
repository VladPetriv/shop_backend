import supertest from 'supertest';
import app from '../index.js';
import { destroyAllModels, productTestHelper } from './testHelper.js';

const request = supertest(app);

describe('Rating tests', () => {
  beforeAll(async () => {
    await destroyAllModels();
  });
  afterAll(async () => {
    await destroyAllModels();
  });
  describe('GET rating => /api/rating/:productId', () => {
    let productId;
    beforeEach(async () => {
      productId = await productTestHelper().addNewTestProduct();
    });
    it('it should return all rating by productId', async () => {
      const response = await request.get(`/api/rating/items/${productId}`);
      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('ratings');
      expect(response.body.ratings).toStrictEqual([]);
    });
  });
  describe('POST rating => /api/rating/items/:productId', () => {
    const login = 'test_login';
    const email = 'teste@gmail.com';
    const password = 'testp';
    let jwt;
    let productId;
    beforeEach(async () => {
      productId = await productTestHelper().addNewTestProduct();
      await request.post('/api/registration').send({
        login,
        email,
        password,
      });
      jwt = await request.post('/api/login').send({
        login,
        email,
        password,
      });
    });
    it('it should return rating object', async () => {
      const response = await request
        .post(`/api/rating/items/${productId}`)
        .set('Authorization', 'Bearer ' + jwt.body.token)
        .send({
          value: 3,
        });
      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('value');
      expect(response.body).toHaveProperty('productId');
      expect(response.body).toHaveProperty('userId');
      expect(response.body.value).toBe(3);
      expect(response.body.productId).toBe(productId);
    });
  });
});
