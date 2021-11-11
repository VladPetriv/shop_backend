import BrandService from '../services/brandService.js';

class BrandController {
  async getAllBrands(req, res) {
    try {
      const brands = await BrandService.getAll();
      res.json(brands);
    } catch (err) {
      console.error({ err });
      res.status(500).json(err.message);
    }
  }
  async getOneBrand(req, res) {
    try {
      const { id } = req.params;
      const brand = await BrandService.getOne(id);
      if (!brand) {
        return res
          .status(400)
          .json({ message: 'Brand with this id doesnt exist' });
      }
      res.json(brand);
    } catch (err) {
      res.status(500).json(err);
    }
  }
  async createBrand(req, res) {
    try {
      const { name } = req.body;
      const brand = await BrandService.create(name);
      res.json({ brand, message: 'Brand was created' });
    } catch (err) {
      console.error({ err });
      res.status(500).json(err.message);
    }
  }
  async deleteBrand(req, res) {
    try {
      const { id } = req.params;
      const candidate = await BrandService.getOne(id);
      if (!candidate) {
        return res
          .status(400)
          .json({ message: 'Brand with this id doesnt exist' });
      }
      await BrandService.delete(id);
      res.json({ message: 'Brand was deleted' });
    } catch (err) {
      res.status(500).json(err.message);
    }
  }
  async updateBrand(req, res) {
    try {
      const { id } = req.params;
      const { name } = req.body;
      const candidate = await BrandService.getOne(id);
      if (!candidate) {
        return res
          .status(400)
          .json({ message: 'Brand with this id doesnt exist' });
      }
      await BrandService.update(id, name);
      res.json({ message: 'Brand was updated' });
    } catch (err) {
      res.status(500).json(err.message);
    }
  }
}

export default new BrandController();
