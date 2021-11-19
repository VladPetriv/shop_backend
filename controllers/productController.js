import { resolve } from 'path';
import { v4 } from 'uuid';
import { validationResult } from 'express-validator';
import ProductService from '../services/productService.js';
import { NO_PRODUCT_WITH_ID } from '../error_messages/productErrorMessages.js';

class ProductController {
  async getAllProduct(req, res) {
    try {
      const products = await ProductService.getAll();
      res.json(products);
    } catch (err) {
      console.error({ err });
      res.status(500).json(err.message);
    }
  }
  async getOneProduct(req, res) {
    try {
      const { id } = req.params;
      const product = await ProductService.getOne(id);
      if (!product) {
        return res.status(400).json({ message: NO_PRODUCT_WITH_ID });
      }
      return res.json(product);
    } catch (err) {
      console.error({ err });
      return res.status(500).json(err);
    }
  }
  async createProduct(req, res) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array(),
        });
      }
      const { name, price, brandId, typeId, description } = req.body;
      const { img } = req.files;
      const fileName = v4() + '.jpg';
      img.mv(resolve(resolve(), 'static', fileName));
      const product = await ProductService.create(
        name,
        price,
        brandId,
        typeId,
        fileName,
        description
      );
      res.json({ product, message: 'Product was created' });
    } catch (err) {
      console.error({ err });
      res.status(500).json(err.message);
    }
  }
  async deleteProduct(req, res) {
    try {
      const { id } = req.params;
      const candidate = await ProductService.getOne(id);
      if (!candidate) {
        return res.status(400).json({ message: NO_PRODUCT_WITH_ID });
      }
      await ProductService.delete(id);
      res.json({ message: 'Product was deleted' });
    } catch (err) {
      console.error({ err });
      res.status(500).json(err.message);
    }
  }
  async updateProduct(req, res) {
    try {
      const { id } = req.params;
      const { name, price, brandId, typeId, description } = req.body;
      const candidate = await ProductService.getOne(id);
      if (!candidate) {
        return res.status(400).json({ message: NO_PRODUCT_WITH_ID });
      }
      await ProductService.update(
        id,
        name,
        price,
        brandId,
        typeId,
        description
      );
      res.json({ message: 'Product was updated' });
    } catch (err) {
      console.error({ err });
      res.status(500).json(err.message);
    }
  }
}

export default new ProductController();
