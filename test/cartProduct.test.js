import supertest from 'supertest';
import app from '../index.js';
import {
  cartProductTestHelper,
  userTestHelper,
  productTestHelper,
} from './testHelper.js';
import {
  NO_CART_WITH_ID,
  NO_CART_PRODUCT_WITH_ID,
} from '../error_messages/cartProductErrorMessages.js';

const request = supertest(app);

describe('Cart product test', () => {
  beforeAll(async () => {
    await cartProductTestHelper().destroyAllModels();
  });
  afterAll(async () => {
    await cartProductTestHelper().destroyAllModels();
  });
  describe('GET cart products => /api/cart_product/:cartId/items', () => {
    const login = 'testlogin';
    const email = 'testemail@test.com';
    const password = 'test';
    let cartId;
    beforeAll(async () => {
      cartId = await userTestHelper().createTestUser(login, email, password);
    });
    it('it should return list of cart products', async () => {
      const response = await request.get(`/api/cart_product/${cartId}/items`);
      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('cartProducts');
      expect(response.body.cartProducts).toStrictEqual([]);
    });
    it('it should throw error that cart is not exist', async () => {
      const response = await request.get(
        `/api/cart_product/${cartId + 1}/items`
      );
      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty('message');
      expect(response.body.message).toBe(NO_CART_WITH_ID);
    });
  });
  describe('GET cart product => /api/cart_product/:cartId/items/:cartProductId', () => {
    const login = 'testlogin_';
    const email = 'testemail_@test.com';
    const password = 'test';
    let cartId;
    let productId;
    let cartProductId;
    beforeAll(async () => {
      cartId = await userTestHelper().createTestUser(login, email, password);
      productId = await productTestHelper().addNewTestProduct();
      cartProductId = await cartProductTestHelper().createTestCartProduct(
        cartId,
        productId
      );
    });
    it('it should return cart product', async () => {
      const response = await request.get(
        `/api/cart_product/${cartId}/items/${cartProductId}`
      );

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('cartProduct');
      expect(response.body.cartProduct['product.id']).toBe(productId);
      expect(response.body.cartProduct['product.name']).toBe('test');
      expect(response.body.cartProduct['product.price']).toBe(1000);
      expect(response.body.cartProduct['product.rating']).toBe(0);
      expect(response.body.cartProduct['product.description']).toBe(
        'test description'
      );
    });
    it('it should throw error that cart is not exist', async () => {
      const response = await request.get(
        `/api/cart_product/${cartId + 1}/items`
      );
      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty('message');
      expect(response.body.message).toBe(NO_CART_WITH_ID);
    });
    it('it should throw error that cart product is not exist', async () => {
      const response = await request.get(
        `/api/cart_product/${cartId}/items/${cartProductId + 1}`
      );
      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty('message');
      expect(response.body.message).toBe(NO_CART_PRODUCT_WITH_ID);
    });
  });

  describe('DELETE cart product => /api/cart_product/:cartId/items/:cartProductId', () => {
    const login = 'testlogin__';
    const email = 'testemail__@test.com';
    const password = 'test';
    let cartId;
    let productId;
    let cartProductId;
    beforeAll(async () => {
      cartId = await userTestHelper().createTestUser(login, email, password);
      productId = await productTestHelper().addNewTestProduct();
      cartProductId = await cartProductTestHelper().createTestCartProduct(
        cartId,
        productId
      );
    });
    it('it should return message that cart product was deleted', async () => {
      const response = await request.delete(
        `/api/cart_product/${cartId}/items/${cartProductId}`
      );
      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('message');
      expect(response.body.message).toBe('Cart product was deleted');
    });
    it('it should throw error that cart is not exist', async () => {
      const response = await request.delete(
        `/api/cart_product/${cartId + 1}/items/${cartProductId}`
      );
      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty('message');
      expect(response.body.message).toBe(NO_CART_WITH_ID);
    });
    it('it should throw error that cart product is not exist', async () => {
      const response = await request.delete(
        `/api/cart_product/${cartId}/items/${cartProductId + 1}`
      );
      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty('message');
      expect(response.body.message).toBe(NO_CART_PRODUCT_WITH_ID);
    });
  });
});
