import { join, resolve } from 'path';
import supertest from 'supertest';
import app from '../index.js';
import {
  destroyAllModels,
  productTestHelper,
  brandTestHelper,
  typeTestHelper,
  userTestHelper,
} from './testHelper.js';
import {
  NO_PRODUCT_WITH_ID,
  NOT_VALID_NAME,
} from '../error_messages/productErrorMessages.js';

const request = supertest(app);

describe('Product test', () => {
  beforeEach(async () => await destroyAllModels());
  afterAll(async () => await destroyAllModels());

  describe('GET products => /api/product/items', () => {
    it('It should get products', async () => {
      const response = await request.get('/api/product/items');

      expect(response.status).toBe(200);
      expect(response.body.length).toBe(0);
      expect(response.body).toStrictEqual([]);
    });
  });

  describe('GET product => /api/product/items/id', () => {
    let id;
    beforeEach(async () => {
      id = await productTestHelper().addNewTestProduct();
    });

    it('It should return product', async () => {
      const response = await request.get(`/api/product/items/${id}`);

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('id');
      expect(response.body).toHaveProperty('name');
      expect(response.body).toHaveProperty('price');
      expect(response.body).toHaveProperty('description');
      expect(response.body).toHaveProperty('rating');
      expect(response.body).toHaveProperty('img');
      expect(response.body.id).toBe(id);
      expect(response.body.name).toBe('test');
      expect(response.body.price).toBe(1000);
    });

    it('it should throw error that product with this id doesnt exist', async () => {
      const response = await request.get(`/api/product/items/${id + 1}`);

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty('message');
      expect(response.body.message).toBe(NO_PRODUCT_WITH_ID);
    });
  });

  describe('DELETE product => /api/product/items/id', () => {
    let productId;
    let jwt;
    let jwt2;
    const login = 'test';
    const email = 'testfajsfde@test.com';
    const password = 'testfjasdfjk';
    const role = 'ADMIN';

    beforeEach(async () => {
      productId = await productTestHelper().addNewTestProduct();
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

    it('it should delete product', async () => {
      const response = await request
        .delete(`/api/product/items/${productId}`)
        .set('Authorization', 'Bearer ' + jwt.body.token);

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('message');
      expect(response.body.message).toBe('Product was deleted');
    });

    it('it should throw error that product with this id doesnt exist', async () => {
      const response = await request
        .delete(`/api/product/items/${productId + 1}`)
        .set('Authorization', 'Bearer ' + jwt.body.token);

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty('message');
      expect(response.body.message).toBe(NO_PRODUCT_WITH_ID);
    });

    it('it should throw error that user is not logined', async () => {
      const response = await request.delete(`/api/product/items/${productId}`);

      expect(response.status).toBe(401);
      expect(response.body).toHaveProperty('message');
      expect(response.body.message).toBe('User is not logined');
    });

    it('it should throw error that user dont have accsess', async () => {
      const response = await request
        .delete(`/api/product/items/${productId}`)
        .set('Authorization', 'Bearer ' + jwt2.body.token);

      expect(response.status).toBe(403);
      expect(response.body).toHaveProperty('message');
      expect(response.body.message).toBe('No accsess');
    });
  });

  describe('POST product => /api/product/', () => {
    let typeId;
    let brandId;
    let jwt;
    let jwt2;
    const login = 'test';
    const email = 'testfajsfde@test.com';
    const password = 'testfjasdfjk';
    const role = 'ADMIN';

    beforeEach(async () => {
      typeId = await typeTestHelper().addNewTestType();
      brandId = await brandTestHelper().addNewTestBrand();
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

    it('it should create new product', async () => {
      const response = await request
        .post('/api/product/create')
        .set('Authorization', 'Bearer ' + jwt.body.token)
        .field('name', 'test_product')
        .field('price', 1000)
        .field('description', 'test description')
        .field('typeId', typeId)
        .field('brandId', brandId)
        .attach('img', join(resolve(), '/' + process.env.IMAGE_NAME));

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('message');
      expect(response.body.product).toHaveProperty('id');
      expect(response.body.product).toHaveProperty('name');
      expect(response.body.product).toHaveProperty('price');
      expect(response.body.product).toHaveProperty('description');
      expect(response.body.product).toHaveProperty('rating');
      expect(response.body.product).toHaveProperty('img');
      expect(response.body.product).toHaveProperty('typeId');
      expect(response.body.product).toHaveProperty('brandId');
      expect(response.body.product.name).toBe('test_product');
      expect(response.body.product.price).toBe(1000);
      expect(response.body.product.description).toBe('test description');
      expect(response.body.product.typeId).toBe(typeId);
      expect(response.body.product.brandId).toBe(brandId);
      expect(response.body.message).toBe('Product was created');
    });

    it('it should throw error that name is not valid', async () => {
      const response = await request
        .post('/api/product/create')
        .set('Authorization', 'Bearer ' + jwt.body.token)
        .field('name', 't')
        .field('price', 1000)
        .field('description', 'test description')
        .field('typeId', typeId)
        .field('brandId', brandId)
        .attach('img', join(resolve(), '/' + process.env.IMAGE_NAME));
      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty('errors');
      expect(response.body.errors[0].msg).toBe(NOT_VALID_NAME);
    });

    it('it should throw error that user is not logined', async () => {
      const response = await request
        .post('/api/product/create')
        .field('name', 't')
        .field('price', 1000)
        .field('description', 'test description')
        .field('typeId', typeId)
        .field('brandId', brandId)
        .attach('img', join(resolve(), '/' + process.env.IMAGE_NAME));

      expect(response.status).toBe(401);
      expect(response.body).toHaveProperty('message');
      expect(response.body.message).toBe('User is not logined');
    });

    it('it should throw error that user dont have accsess', async () => {
      const response = await request
        .post('/api/type/create')
        .set('Authorization', 'Bearer ' + jwt2.body.token)
        .field('name', 't')
        .field('price', 1000)
        .field('description', 'test description')
        .field('typeId', typeId)
        .field('brandId', brandId)
        .attach('img', join(resolve(), '/' + process.env.IMAGE_NAME));

      expect(response.status).toBe(403);
      expect(response.body).toHaveProperty('message');
      expect(response.body.message).toBe('No accsess');
    });
  });

  describe('PUT product => /api/product/items/:productId', () => {
    let productId;
    let jwt;
    let jwt2;
    const login = 'test';
    const email = 'testfajsfde@test.com';
    const password = 'testfjasdfjk';
    const role = 'ADMIN';

    beforeEach(async () => {
      productId = await productTestHelper().addNewTestProduct();
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

    it('it should update product and return message', async () => {
      const response = await request
        .put(`/api/product/items/${productId}`)
        .set('Authorization', 'Bearer ' + jwt.body.token)
        .send({
          name: 'test1',
          price: 1500,
          description: 'test description 1',
        });
      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('message');
      expect(response.body.message).toBe('Product was updated');
    });

    it('it should throw error that product is not exist', async () => {
      const response = await request
        .put(`/api/product/items/${productId + 1}`)
        .set('Authorization', 'Bearer ' + jwt.body.token);

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty('message');
      expect(response.body.message).toBe(NO_PRODUCT_WITH_ID);
    });

    it('it should throw error that user is not logined', async () => {
      const response = await request.put(`/api/product/items/${productId}`);

      expect(response.status).toBe(401);
      expect(response.body).toHaveProperty('message');
      expect(response.body.message).toBe('User is not logined');
    });

    it('it should throw error that user dont have accsess', async () => {
      const response = await request
        .put(`/api/product/items/${productId}`)
        .set('Authorization', 'Bearer ' + jwt2.body.token);

      expect(response.status).toBe(403);
      expect(response.body).toHaveProperty('message');
      expect(response.body.message).toBe('No accsess');
    });
  });
});
