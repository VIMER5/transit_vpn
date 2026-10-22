export function useCurrency() {
  function kopecksInRUB(value: number) {
    return value / 100;
  }
  function formatVolute(value: number) {
    return Number(value).toLocaleString("de-DE") ?? value;
  }
  return { kopecksInRUB, formatVolute };
}
