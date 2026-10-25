(() => {
  const icon = document.querySelector('#site-favicon');
  if (!icon) return;
  const theme = window.matchMedia('(prefers-color-scheme: dark)');
  const updateIcon = () => {
    icon.href = theme.matches
      ? 'images/brand/favicon-dark.png'
      : 'images/brand/favicon-light.png';
  };
  updateIcon();
  theme.addEventListener('change', updateIcon);
})();
