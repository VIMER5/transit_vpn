export function useCurrency() {
  function kopecksInRUB(value: number) {
    return value / 100;
  }
  return { kopecksInRUB };
}
