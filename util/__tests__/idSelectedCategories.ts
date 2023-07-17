import { expect, test } from '@jest/globals';
import { selectedCategoriesId } from '../../app/profile/[userName]/idSelectedCategories';

const selectedOption = [{ id: 1 }, { id: 2 }, { id: 3 }];

test('maps selectedOption to idSelectedCategories', () => {
  const result = selectedCategoriesId(selectedOption);
  expect(result).toEqual([1, 2, 3]);
});

test('idSelectedCategories is an array', () => {
  const result = Array.isArray(selectedCategoriesId(selectedOption));
  expect(result).toBe(true);
});

test('idSelectedCategories length matches selectedOption length', () => {
  const result = selectedCategoriesId(selectedOption).length;
  expect(result).toBe(selectedOption.length);
});
