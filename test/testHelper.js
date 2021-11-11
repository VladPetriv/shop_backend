import { Type, Product, Brand, User } from '../models/models.js';
import TypeService from '../services/typeService.js';
import BrandService from '../services/brandService.js';
import ProductService from '../services/productService.js';
import UserService from '../services/userService.js';
import CartService from '../services/cartService.js';

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
        process.env.IMAGE_PATH,
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
    async createTestUser(login, password) {
      const user = await UserService.create(login, password);
      await CartService.create(user.id);
    },
  };
};

export { brandTestHelper, typeTestHelper, productTestHelper, userTestHelper };
