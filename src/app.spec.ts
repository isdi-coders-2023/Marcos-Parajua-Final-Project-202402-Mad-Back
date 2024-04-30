import { createApp } from './app.js';

describe('Given the function createApp ', () => {
  test('Then it should be call and return app', () => {
    const app = createApp();
    expect(app).toBeDefined();
  });
});
