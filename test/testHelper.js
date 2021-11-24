import { resolve, join } from 'path';
import { Type, Product, Brand, User, Cart } from '../models/models.js';
import TypeService from '../services/typeService.js';
import BrandService from '../services/brandService.js';
import ProductService from '../services/productService.js';
import UserService from '../services/userService.js';
import CartService from '../services/cartService.js';
import CartProductService from '../services/cartProductService.js';

const cartProductTestHelper = () => {
  return {
    async destroyAllModels() {
      await Brand.destroy({ where: {} });
      await Type.destroy({ where: {} });
      await Product.destroy({ where: {} });
      await User.destroy({ where: {} });
      await Cart.destroy({ where: {} });
    },
    async createTestCartProduct(cartId, productId) {
      await CartProductService.create(cartId, productId);
    },
  };
};

const brandTestHelper = () => {
  return {
    async destroyAllBrands() {
      await Brand.destroy({ where: {} });
    },
    async addNewTestBrand() {
      const brand = await BrandService.create('test');
      return brand.id;
    },
  };
};
const typeTestHelper = () => {
  return {
    async destroyAllTypes() {
      await Type.destroy({ where: {} });
    },
    async addNewTestType() {
      const type = await TypeService.create('test');
      return type.id;
    },
  };
};
const productTestHelper = () => {
  return {
    async destroyAllModels() {
      await Type.destroy({ where: {} });
      await Brand.destroy({ where: {} });
      await Product.destroy({ where: {} });
    },
    async addNewTestProduct() {
      const brand = await BrandService.create('test');
      const type = await TypeService.create('test');
      const product = await ProductService.create(
        'test',
        1000,
        brand.id,
        type.id,
        join(resolve(), '/' + process.env.IMAGE_NAME),
        'test description'
      );
      return product.id;
    },
  };
};

const userTestHelper = () => {
  return {
    async destroyTestUser() {
      await User.destroy({ where: {} });
    },
    async createTestUser(login, email, password) {
      const user = await UserService.create(login, email, password);
      const cart = await CartService.create(user.id);
      return cart.id;
    },
  };
};

export {
  brandTestHelper,
  typeTestHelper,
  productTestHelper,
  userTestHelper,
  cartProductTestHelper,
};
