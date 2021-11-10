import path from 'path';
import { v4 } from 'uuid';
import ProductService from '../services/productService.js';

class ProductController {
  async getAllProduct(req, res) {
    try {
      const products = await ProductService.getAll();
      res.json(products);
    } catch (err) {
      res.status(500).json(err.message);
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
      const { name, price, brandId, typeId, description } = req.body;
      const { img } = req.files;
      const fileName = v4() + '.jpg';
      img.mv(path.resolve(__dirname, '..', 'static', fileName));
      const product = await ProductService.create(
        name,
        price,
        brandId,
        typeId,
        fileName,
        description
      );
      res.json(product);
    } catch (err) {
      res.status(500).json(err.message);
    }
  }
  async deleteProduct(req, res) {
    try {
      const { id } = req.params;
      const product = await ProductService.delete(id);
      res.json(product);
    } catch (err) {
      res.status(500).json(err.message);
    }
  }
  async updateProduct(req, res) {
    try {
      const { id } = req.params;
      const { name, price, brandId, typeId, description } = req.body;
      const product = await ProductService.update(
        id,
        name,
        price,
        brandId,
        typeId,
        description
      );
      res.json(product);
    } catch (err) {
      res.status(500).json(err.message);
    }
  }
}

export default new ProductController();
