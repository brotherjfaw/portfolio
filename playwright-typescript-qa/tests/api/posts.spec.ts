import { test, expect } from '@playwright/test';

const API_URL = 'https://jsonplaceholder.typicode.com';

test.describe('REST API contract smoke tests', () => {
  test('GET known post returns the expected structure', async ({ request }) => {
    const response = await request.get(`${API_URL}/posts/1`);
    expect(response.ok()).toBeTruthy();
    const body: unknown = await response.json();
    expect(body).toEqual(expect.objectContaining({
      userId: expect.any(Number),
      id: 1,
      title: expect.any(String),
      body: expect.any(String),
    }));
  });

  test('GET an unknown resource returns 404', async ({ request }) => {
    const response = await request.get(`${API_URL}/posts/999999`);
    expect(response.status()).toBe(404);
  });

  test('POST accepts a valid JSON payload', async ({ request }) => {
    const payload = { userId: 1, title: 'Playwright API test', body: 'Contract check' };
    const response = await request.post(`${API_URL}/posts`, { data: payload });
    expect(response.status()).toBe(201);
    const body = await response.json();
    expect(body).toEqual(expect.objectContaining(payload));
    expect(body.id).toBeDefined();
  });
});
