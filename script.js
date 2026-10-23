const projects = window.PORTFOLIO_PROJECTS;
const grid = document.querySelector('#project-grid');
const modal = document.querySelector('#project-modal');
let trigger;
function render(category = 'All') {
  grid.replaceChildren();
  const visible = projects.filter(p => category === 'All' || p.category === category);
  visible.forEach(project => {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'project-card';
    button.setAttribute('aria-label', `View ${project.title} — placeholder project`);
    const image = document.createElement('div');
    image.className = 'project-image';
    const img = document.createElement('img');
    img.src = `images/${project.file}`;
    img.alt = `${project.title} — temporary artwork`;
    img.loading = 'lazy';
    img.width = 1200; img.height = 900;
    img.addEventListener('error', () => { img.src = 'images/01-event-branding.svg'; }, {once:true});
    const arrow = document.createElement('span');
    arrow.className = 'open'; arrow.textContent = '↗'; arrow.setAttribute('aria-hidden','true');
    image.append(img, arrow);
    const meta = document.createElement('div'); meta.className = 'project-meta';
    const title = document.createElement('h3'); title.textContent = project.title;
    const kind = document.createElement('p'); kind.textContent = project.kind;
    meta.append(title, kind); button.append(image, meta);
    button.addEventListener('click', () => openProject(project, button)); grid.append(button);
  });
  document.querySelector('#filter-status').textContent = `${visible.length} projects shown`;
}
function openProject(project, button) {
  trigger = button;
  document.querySelector('#modal-title').textContent = project.title;
  document.querySelector('#modal-category').textContent = project.kind;
  document.querySelector('#modal-description').textContent = project.desc;
  const img = document.querySelector('#modal-image'); img.src = `images/${project.file}`; img.alt = `${project.title} — temporary artwork`;
  const list = document.querySelector('#modal-outputs'); list.replaceChildren();
  project.outputs.forEach(text => { const li = document.createElement('li'); li.textContent = text; list.append(li); });
  modal.showModal(); modal.scrollTop = 0; document.body.classList.add('modal-open');
}
document.querySelectorAll('.filter').forEach(button => button.addEventListener('click', () => {
  document.querySelectorAll('.filter').forEach(b => { b.classList.remove('active'); b.setAttribute('aria-pressed', 'false'); });
  button.classList.add('active'); button.setAttribute('aria-pressed', 'true'); render(button.dataset.filter);
}));
document.querySelector('#close-modal').addEventListener('click', () => modal.close());
modal.addEventListener('click', event => { if (event.target === modal) { const r = modal.getBoundingClientRect(); if (event.clientX < r.left || event.clientX > r.right || event.clientY < r.top || event.clientY > r.bottom) modal.close(); } });
modal.addEventListener('close', () => { document.body.classList.remove('modal-open'); trigger?.focus(); });
document.querySelector('#year').textContent = new Date().getFullYear();
render();
