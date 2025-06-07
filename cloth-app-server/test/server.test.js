const path = require('path');
const { spawn } = require('child_process');
const request = require('supertest');

const BASE_URL = 'http://localhost:3000';
let serverProcess;

beforeAll(done => {
  serverProcess = spawn('node', [path.join(__dirname, '../server.js')]);
  serverProcess.stdout.on('data', data => {
    if (data.toString().includes('Server is running')) {
      done();
    }
  });
});

afterAll(() => {
  if (serverProcess) {
    serverProcess.kill();
  }
});

describe('POST /api/add-item', () => {
  test('stores an item', async () => {
    const item = { type: 'JestType', color: 'JestColor', tag: 'jest-' + Date.now() };
    const postRes = await request(BASE_URL)
      .post('/api/add-item')
      .send(item);

    expect(postRes.statusCode).toBe(201);
    expect(postRes.body.item).toMatchObject(item);

    const getRes = await request(BASE_URL).get('/api/items');
    const found = getRes.body.find(i => i.tag === item.tag);
    expect(found).toBeDefined();
  });
});

describe('GET /api/items', () => {
  test('returns the stored items', async () => {
    const res = await request(BASE_URL).get('/api/items');
    expect(Array.isArray(res.body)).toBe(true);
  });
});

describe('DELETE /api/item/:id', () => {
  test('deletes a specific item', async () => {
    const item = { type: 'DelType', color: 'DelColor', tag: 'del-' + Date.now() };
    const postRes = await request(BASE_URL)
      .post('/api/add-item')
      .send(item);

    const id = postRes.body.item.id;

    const delRes = await request(BASE_URL).delete(`/api/item/${id}`);
    expect(delRes.statusCode).toBe(200);

    const getRes = await request(BASE_URL).get('/api/items');
    const found = getRes.body.find(i => i.id === id);
    expect(found).toBeUndefined();
  });
});
