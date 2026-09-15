export function useFormat() {
  function formatDevices(count: number, onlyText: boolean = false) {
    const pr = new Intl.PluralRules("ru-RU");
    const forms: any = {
      one: "устройство",
      few: "устройства",
      many: "устройств",
    };
    if (onlyText) return `${forms[pr.select(count)]}`;
    return `${count} ${forms[pr.select(count)]}`;
  }

  function formatMonths(count: number) {
    const pr = new Intl.PluralRules("ru-RU");
    const forms: any = {
      one: "месяц",
      few: "месяца",
      many: "месяцев",
    };

    return `${count} ${forms[pr.select(count)]}`;
  }
  return { formatDevices, formatMonths };
}
