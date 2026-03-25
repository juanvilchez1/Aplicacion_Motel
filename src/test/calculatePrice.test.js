import { calculatePrice } from '../src/utils/calculatePrice';

test('calcula precio correctamente', () => {
  expect(calculatePrice(10, 3)).toBe(30);
});

test('lanza error si duración es inválida', () => {
  expect(() => calculatePrice(10, 0)).toThrow("Duración inválida");
});