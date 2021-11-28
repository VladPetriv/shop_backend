import supertest from 'supertest';
import app from '../index.js';
import { destroyAllModels, productTestHelper } from './testHelper.js';
import { NO_PRODUCT_WITH_ID } from '../error_messages/productErrorMessages.js';

const request = supertest(app);

describe('Rating tests', () => {
  beforeAll(async () => {
    await destroyAllModels();
  });
  afterAll(async () => {
    await destroyAllModels();
  });

  describe('GET ratings => /api/rating/:productId', () => {
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
    it('it should throw error that product is not exist', async () => {
      const response = await request.get(`/api/rating/items/${productId + 1}`);

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty('message');
      expect(response.body.message).toBe(NO_PRODUCT_WITH_ID);
    });
  });

  describe('GET rating => /api/rating/item/:productId', () => {
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
      await request
        .post(`/api/rating/items/${productId}`)
        .set('Authorization', 'Bearer ' + jwt.body.token)
        .send({
          value: 3,
        });
    });
    it('it should return rating object', async () => {
      const response = await request
        .get(`/api/rating/item/${productId}`)
        .set('Authorization', 'Bearer ' + jwt.body.token);

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('rating');
      expect(response.body.rating.productId).toBe(productId);
      expect(response.body.rating.value).toBe(3);
    });

    it('it should throw error that product is not exist', async () => {
      const response = await request
        .get(`/api/rating/item/${productId + 1}`)
        .set('Authorization', 'Bearer ' + jwt.body.token);

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty('message');
      expect(response.body.message).toBe(NO_PRODUCT_WITH_ID);
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

    it('it should create rating', async () => {
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

    it('it should throw error that product is not exist', async () => {
      const response = await request
        .post(`/api/rating/items/${productId + 1}`)
        .set('Authorization', 'Bearer ' + jwt.body.token);

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty('message');
      expect(response.body.message).toBe(NO_PRODUCT_WITH_ID);
    });
  });

  describe('DELETE rating => /api/rating/items/:productId', () => {
    const login = 'test_login';
    const email = 'teste@gmail.com';
    const password = 'testp';
    let jwt;
    let productId;
    let ratingId;
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
      ratingId = await request
        .post(`/api/rating/items/${productId}`)
        .set('Authorization', 'Bearer ' + jwt.body.token)
        .send({
          value: 3,
        });
    });

    it('it should delete rating', async () => {
      const response = await request
        .delete(`/api/rating/items/${productId}`)
        .set('Authorization', 'Bearer ' + jwt.body.token)
        .send({
          ratingId,
        });

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('message');
      expect(response.body.message).toBe('Rating was deleted');
    });

    it('it should throw error that product is not exist', async () => {
      const response = await request
        .post(`/api/rating/items/${productId + 1}`)
        .set('Authorization', 'Bearer ' + jwt.body.token);

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty('message');
      expect(response.body.message).toBe(NO_PRODUCT_WITH_ID);
    });
  });

  describe('PUT rating => /api/rating/item/:productId', () => {
    const login = 'test_login';
    const email = 'teste@gmail.com';
    const password = 'testp';
    let jwt;
    let productId;
    let ratingId;
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
      await request
        .post(`/api/rating/items/${productId}`)
        .set('Authorization', 'Bearer ' + jwt.body.token)
        .send({
          value: 3,
        });
    });
    it('it should update rating', async () => {
      const response = await request
        .put(`/api/rating/item/${productId}`)
        .set('Authorization', 'Bearer ' + jwt.body.token)
        .send({
          value: 2,
        });

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('message');
      expect(response.body.message).toBe('Rating was updated');
    });
    it('it should throw error that product is not exist', async () => {
      const response = await request
        .put(`/api/rating/item/${productId + 1}`)
        .set('Authorization', 'Bearer ' + jwt.body.token);

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty('message');
      expect(response.body.message).toBe(NO_PRODUCT_WITH_ID);
    });
  });
});
