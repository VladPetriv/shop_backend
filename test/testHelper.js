const { Type, Product, Brand } = require('../models/models.js');
const TypeService = require('../services/typeService.js');
const BrandService = require('../services/brandService.js');
const ProductService = require('../services/productService');

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

module.exports = {
  brandTestHelper,
  typeTestHelper,
  productTestHelper,
};
