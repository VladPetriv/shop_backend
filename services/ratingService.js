import { Rating } from '../models/models.js';

class RatingService {
  async getAll(productId) {
    const rating = await Rating.findAll({ where: { productId } });
    return rating;
  }
  async getOne(userId, productId) {
    const rating = await Rating.findOne({ where: { userId, productId } });
    return rating;
  }

  async create(value, userId, productId) {
    const rating = await Rating.create({ value, productId, userId });
    return rating;
  }
}

export default new RatingService();
