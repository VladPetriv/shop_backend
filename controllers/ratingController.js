import RatingService from '../services/ratingService.js';
import { RATING_IS_EXIST } from '../error_messages/ratingErrorMessages.js';

class RatingController {
  async getAllRating(req, res) {
    try {
      const { productId } = req.params;
      const ratings = await RatingService.getAll(productId);
      res.json({ ratings });
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
      const candidate = await RatingService.getOne(user.id, productId);
      if (candidate) {
        return res.status(400).json({ RATING_IS_EXIST });
      }
      const rating = await RatingService.create(value, user.id, productId);
      res.json(rating);
    } catch (err) {
      console.error({ err });
      return res.status(500).json(err.message);
    }
  }
}

export default new RatingController();
