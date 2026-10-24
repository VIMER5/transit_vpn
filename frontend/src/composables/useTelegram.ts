export function useTelegram() {
  const tg = window.Telegram?.WebApp;
  return {
    tg,
    initData: tg?.initData ?? "",
    ready: () => tg?.ready(),
    expand: () => tg?.expand(),
    close: () => tg?.close(),
    openTelegramLink: (url: string) => tg?.openTelegramLink(url),
    openLink: (url: string) => tg?.openLink(url),
  };
}
