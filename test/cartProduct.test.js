import supertest from 'supertest';
import app from '../index.js';
import {
  cartProductTestHelper,
  userTestHelper,
  productTestHelper,
} from './testHelper.js';
import { NO_CART_WITH_ID } from '../error_messages/cartProductErrorMessages.js';

const request = supertest(app);

describe('Cart product test', () => {
  beforeAll(async () => {
    await cartProductTestHelper().destroyAllModels();
  });
  afterAll(async () => {
    await cartProductTestHelper().destroyAllModels();
  });
  describe('GET cart product => /api/cart_product/:cartId/items', () => {
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
  describe('GET Cart Product => /api/cart_product/:cartId/items/:productId', () => {
    const login = 'testlogin_';
    const email = 'testemail_@test.com';
    const password = 'test';
    let cartId;
    let productId;
    beforeAll(async () => {
      cartId = await userTestHelper().createTestUser(login, email, password);
      productId = await productTestHelper().addNewTestProduct();
      await cartProductTestHelper().createTestCartProduct(cartId, productId);
    });
    it('it should retur cart product', async () => {
      const response = await request.get(
        `/api/cart_product/${cartId}/items/${productId}`
      );
      console.log(response.body);
      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('cartProduct');
    });
  });
});
