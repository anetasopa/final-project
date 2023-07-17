export function selectedCategoriesId(
  selectedOption: ReadonlyArray<{ id: number }>,
): number[] {
  return selectedOption.map((selected) => selected.id);
}
