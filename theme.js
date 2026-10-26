(() => {
  const root = document.documentElement;
  const system = window.matchMedia('(prefers-color-scheme: dark)');
  let preference;
  try { preference = localStorage.getItem('portfolio-theme'); } catch (_) {}
  const apply = value => {
    const dark = value === 'dark';
    root.dataset.theme = dark ? 'dark' : 'light';
    root.style.colorScheme = dark ? 'dark' : 'light';
    const button = document.querySelector('.theme-toggle');
    if (button) {
      button.setAttribute('aria-pressed', String(dark));
      button.setAttribute('aria-label', dark ? 'Switch to light mode' : 'Switch to dark mode');
      button.title = dark ? 'Switch to light mode' : 'Switch to dark mode';
      button.querySelector('span').textContent = dark ? '☀' : '☾';
    }
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', dark ? '#101d30' : '#f3f7fc');
  };
  apply(preference === 'light' || preference === 'dark' ? preference : system.matches ? 'dark' : 'light');
  document.addEventListener('DOMContentLoaded', () => {
    apply(root.dataset.theme);
    document.querySelector('.theme-toggle')?.addEventListener('click', () => {
      preference = root.dataset.theme === 'dark' ? 'light' : 'dark';
      try { localStorage.setItem('portfolio-theme', preference); } catch (_) {}
      apply(preference);
    });
  });
  system.addEventListener('change', () => { if (preference !== 'light' && preference !== 'dark') apply(system.matches ? 'dark' : 'light'); });
})();
