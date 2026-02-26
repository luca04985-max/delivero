import request from 'supertest';
import server from '../src/app.js';

describe('Health endpoint', () => {
  test('GET /health responds with 200', async () => {
    const res = await request(server).get('/health');
    expect([200, 204]).toContain(res.statusCode);
  });
});
