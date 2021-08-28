const request = require('supertest');
const app = require('../index.js');

describe('Brand test', () => {
  test('It should return 200 status code', async () => {
    const response = await request(app).get('/api/brand/items');
    expect(response.statusCode).toBe(200);
  });
});
