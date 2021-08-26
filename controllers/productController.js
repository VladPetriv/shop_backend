const path = require('path');
const uuid = require('uuid');
const ProductService = require('../services/productService.js');

class ProductController {
  async getAllProduct(req, res) {
    try {
      const products = await ProductService.getAll();
      return res.json(products);
    } catch (err) {
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
  async createProduct(req, res) {
    try {
      const { }name, price, brandId, typeId, description  = req.body;
      const { img } = req.files;
      const fileName = uuid.v4() + '.jpg';
      img.mv(path.resolve(__dirname, '..', 'static', fileName));
      const product = await ProductService.create(
        name,
        price,
        brandId,
        typeId,
        fileName,
        description
      );
      return res.json(product);
    } catch (err) {
      return res.status(500).json(err);
    }
  }
  async deleteProduct(req, res) {
    try {
      const { id } = req.params;
      const product = await ProductService.delete(id);
      return res.json(product);
    } catch (err) {
      return res.status(500).json(err);
    }
  }
  async updateProduct(req, res) {
    try {
      const { id } = req.params;
      const {name, price, brandId, typeId, description } = req.body;
      const product = await ProductService.update(id,name,price,brandId,typeId,description);
      return res.json(product)
    } catch (err) {
      return res.status(500).json(err);
    }
  }
}

module.exports = new ProductController();
