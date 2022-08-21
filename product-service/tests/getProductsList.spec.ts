import { getAll } from '../src/services/product.service';

describe('getAll', () => {
  test('getAll returns an array', () => {
    expect(Array.isArray(getAll())).toBe(true);
  });
  test('array is not empty', () => {
    expect(getAll().length).toBeGreaterThan(0);
  });
});