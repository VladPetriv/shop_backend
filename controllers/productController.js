const path = require('path');
const uuid = require('uuid');
const { ProductInfo } = require('../models/models.js');
const ProductService = require('../services/productService.js');

class ProductController {
  async createProduct(req, res) {
    try {
      let { name, price, brandId, typeId, info } = req.body;
      const { img } = req.files;
      const fileName = uuid.v4() + '.jpg';
      img.mv(path.resolve(__dirname, '..', 'static', fileName));
      const product = await ProductService.create(
        name,
        price,
        brandId,
        typeId,
        fileName
      );
      if (info) {
        info = JSON.parse(info);
        info.forEach((i) => {
          ProductInfo.create({
            title: i.title,
            description: i.description,
            productId: product.id,
          });
        });
      }
      return res.json(product);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  }
  async getOneProduct(req, res) {
    try {
      const { id } = req.params;
      const product = await ProductService.getOne(id);
      return res.json(product);
    } catch (err) {
      return res.status(500).json(err);
    }
  }
  async getAllProduct(req, res) {
    try {
      const products = await ProductService.getAll();
      return res.json(products);
    } catch (err) {
      return res.status(500).json(err);
    }
  }
}

module.exports = new ProductController();
