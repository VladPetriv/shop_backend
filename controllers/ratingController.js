import RatingService from '../services/ratingService.js';
import ProductService from '../services/productService.js';
import {
  RATING_IS_EXIST,
  RATING_IS_NOT_EXIST,
} from '../error_messages/ratingErrorMessages.js';
import { NO_PRODUCT_WITH_ID } from '../error_messages/productErrorMessages.js';

class RatingController {
  async getAllRating(req, res) {
    try {
      const { productId } = req.params;
      const product = await ProductService.getOne(productId);
      if (!product) {
        return res.status(400).json({
          message: NO_PRODUCT_WITH_ID,
        });
      }

      const ratings = await RatingService.getAll(productId);

      res.json({ ratings });
    } catch (err) {
      console.error({ err });
      res.status(500).json(err.message);
    }
  }

  async getOneRating(req, res) {
    try {
      const { user } = req;
      const { productId } = req.params;
      const product = await ProductService.getOne(productId);
      if (!product) {
        return res.status(400).json({
          message: NO_PRODUCT_WITH_ID,
        });
      }

      const rating = await RatingService.getOne(user.id, productId);
      if (!rating) {
        return res.status(400).json({
          message: RATING_IS_NOT_EXIST,
        });
      }

      res.json({ rating });
    } catch (err) {
      console.error({ err });
      res.status(500).json(err.message);
    }
  }

  async createRating(req, res) {
    try {
      const { user } = req;
      const { value } = req.body;
      const { productId } = req.params;
      const product = await ProductService.getOne(productId);
      if (!product) {
        return res.status(400).json({
          message: NO_PRODUCT_WITH_ID,
        });
      }

      const candidate = await RatingService.getOne(user.id, productId);
      if (candidate) {
        return res.status(400).json({
          message: RATING_IS_EXIST,
        });
      }

      const rating = await RatingService.create(value, user.id, productId);

      res.json(rating);
    } catch (err) {
      console.error({ err });
      return res.status(500).json(err.message);
    }
  }

  async deleteRating(req, res) {
    try {
      const { user } = req;
      const { productId } = req.params;
      const product = await ProductService.getOne(productId);
      if (!product) {
        return res.status(400).json({
          message: NO_PRODUCT_WITH_ID,
        });
      }

      const candidate = await RatingService.getOne(user.id, productId);
      if (!candidate) {
        return res.status(400).json({
          message: RATING_IS_NOT_EXIST,
        });
      }

      await RatingService.delete(candidate.id);

      res.json({ message: 'Rating was deleted' });
    } catch (err) {
      console.error({ err });
      res.status(500).json(err.message);
    }
  }

  async updateRating(req, res) {
    try {
      const { user } = req;
      const { productId } = req.params;
      const { value } = req.body;
      const product = await ProductService.getOne(productId);
      if (!product) {
        return res.status(400).json({
          message: NO_PRODUCT_WITH_ID,
        });
      }

      const candidate = await RatingService.getOne(user.id, productId);
      if (!candidate) {
        return res.status(400).json({
          message: RATING_IS_NOT_EXIST,
        });
      }

      await RatingService.update(value, candidate.id, productId);

      res.json({ message: 'Rating was updated' });
    } catch (err) {
      console.error({ err });
      res.status(500).json(err.message);
    }
  }
}

export default new RatingController();
