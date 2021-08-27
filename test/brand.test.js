const request = require('supertest');
const app = require('../index.js');

describe('GET /api/brand', () => {
  it('It should return all brands', async (done) => {
    const response = await request(app).get('/api/brand/items');
    expect(response.statusCode).toBe(200);
    done();
  });
});
