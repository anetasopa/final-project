// export const idSelectedCategories: number[] = selectedOption.map(
//   (selected) => selected.id,
// );
export function selectedCategoriesId(
  selectedOption: { id: number }[],
): number[] {
  return selectedOption.map((selected) => selected.id);
}
