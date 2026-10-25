const viewer = document.querySelector('#image-viewer');
const viewerImage = document.querySelector('#viewer-image');
const artworkLinks = [...document.querySelectorAll('.artwork-link')];
let imageIndex = 0;
let lastImage;
function showArtwork(index) {
  imageIndex = index;
  const link = artworkLinks[index];
  viewerImage.src = link.href;
  viewerImage.alt = link.querySelector('img').alt;
  document.querySelector('#viewer-caption').textContent = link.dataset.caption;
  document.querySelector('#image-position').textContent = `${index + 1} / ${artworkLinks.length}`;
  document.querySelector('#previous-image').disabled = index === 0;
  document.querySelector('#next-image').disabled = index === artworkLinks.length - 1;
  viewer.scrollTop = 0;
}
artworkLinks.forEach((link, index) => {
  link.addEventListener('click', event => {
    if (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
    if (typeof viewer.showModal !== 'function') return;
    event.preventDefault();
    lastImage = link;
    showArtwork(index);
    viewer.showModal();
    document.body.classList.add('modal-open');
  });
});
document.querySelector('#viewer-close').addEventListener('click', () => viewer.close());
document.querySelector('#previous-image').addEventListener('click', () => { if (imageIndex > 0) showArtwork(imageIndex - 1); });
document.querySelector('#next-image').addEventListener('click', () => { if (imageIndex < artworkLinks.length - 1) showArtwork(imageIndex + 1); });
viewer.addEventListener('keydown', event => {
  if (event.key === 'ArrowLeft' && imageIndex > 0) { event.preventDefault(); showArtwork(imageIndex - 1); }
  if (event.key === 'ArrowRight' && imageIndex < artworkLinks.length - 1) { event.preventDefault(); showArtwork(imageIndex + 1); }
});
viewer.addEventListener('click', event => {
  if (event.target !== viewer) return;
  const rect = viewer.getBoundingClientRect();
  if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) viewer.close();
});
viewer.addEventListener('close', () => { document.body.classList.remove('modal-open'); lastImage?.focus(); });
if ('IntersectionObserver' in window) {
  const categoryLinks = [...document.querySelectorAll('.gallery-nav a')];
  const observer = new IntersectionObserver(entries => {
    const section = entries.find(entry => entry.isIntersecting);
    if (!section) return;
    categoryLinks.forEach(link => {
      if (link.hash === `#${section.target.id}`) link.setAttribute('aria-current', 'location');
      else link.removeAttribute('aria-current');
    });
  }, { rootMargin: '-100px 0px -65% 0px' });
  document.querySelectorAll('.gallery-section').forEach(section => observer.observe(section));
}
document.querySelector('#year').textContent = new Date().getFullYear();
