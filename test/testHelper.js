import { resolve, join } from 'path';
import { Type, Rating, Product, Brand, User, Cart } from '../models/models.js';
import TypeService from '../services/typeService.js';
import BrandService from '../services/brandService.js';
import ProductService from '../services/productService.js';
import UserService from '../services/userService.js';
import CartService from '../services/cartService.js';
import CartProductService from '../services/cartProductService.js';
import PasswordUtils from '../utils/passwordUtils.js';

const destroyAllModels = async () => {
  await Brand.destroy({ where: {} });
  await Type.destroy({ where: {} });
  await Product.destroy({ where: {} });
  await User.destroy({ where: {} });
  await Cart.destroy({ where: {} });
  await Rating.destroy({ where: {} });
};

const cartProductTestHelper = () => {
  return {
    async createTestCartProduct(cartId, productId) {
      const cartProduct = await CartProductService.create(cartId, productId);
      return cartProduct.id;
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
    async createTestUser(login, email, password, role) {
      const hashedPassword = PasswordUtils.hash(password);
      const user = await UserService.create(login, email, hashedPassword, role);
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
  destroyAllModels,
};
