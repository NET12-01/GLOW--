/* ============================================================
   GLOW by Ro — Revista digital
   ============================================================ */

const CONFIG = {
  WHATSAPP: '5491123456789',  // Reemplazar por el número real: código de país + área + número, sin "+" ni espacios
  MODE: 'auto',               // 'auto' = catálogo generado · 'images' = páginas en la carpeta pages/
  TOTAL_PAGES: 20,            // Solo para MODE 'images'
  IMAGE_EXT: 'jpg',           // Solo para MODE 'images'
  PAGE_WIDTH: 519,
  PAGE_HEIGHT: 793,
  DOWNLOAD_URL: ''            // URL del PDF. Si está vacío, el botón Descargar se oculta
};

const PRODUCTOS = [
  { id: 1,  marca: 'Glow Lab',      nombre: 'Sérum Iluminador Vitamina C',       cat: 'Cuidado de la piel', precio: 34900, tag: 'Más vendido', desc: 'Unifica el tono y aporta luminosidad inmediata.' },
  { id: 2,  marca: 'Glow Lab',      nombre: 'Crema Hidratante de Ácido Hialurónico', cat: 'Cuidado de la piel', precio: 28500, tag: '', desc: 'Hidratación profunda por 24 h, textura liviana.' },
  { id: 3,  marca: 'Botica Verde',  nombre: 'Aceite Facial de Rosa Mosqueta',    cat: 'Cuidado de la piel', precio: 31000, tag: 'Nuevo', desc: 'Regenera y nutre la piel durante la noche.' },
  { id: 4,  marca: 'Botica Verde',  nombre: 'Limpiador Suave de Rosas',          cat: 'Cuidado de la piel', precio: 19900, tag: '', desc: 'Espuma delicada que limpia sin resecar.' },
  { id: 5,  marca: 'Velvet Beauty', nombre: 'Labial Líquido Mate Velvet',        cat: 'Maquillaje', precio: 16900, tag: 'Más vendido', desc: 'Color intenso de larga duración.' },
  { id: 6,  marca: 'Velvet Beauty', nombre: 'Base Luminosa Skin Glow',           cat: 'Maquillaje', precio: 27500, tag: '', desc: 'Cobertura media regulable, acabado natural.' },
  { id: 7,  marca: 'Velvet Beauty', nombre: 'Paleta de Sombras Neutras',            cat: 'Maquillaje', precio: 32000, tag: '', desc: '12 tonos neutros mate y satinados.' },
  { id: 8,  marca: 'Velvet Beauty', nombre: 'Máscara de Pestañas Volumen',       cat: 'Maquillaje', precio: 14900, tag: '', desc: 'Volumen extremo y curvatura duradera.' },
  { id: 9,  marca: 'Maison Aura',   nombre: 'Eau de Parfum Vainilla Ámbar',      cat: 'Fragancias', precio: 59000, tag: 'Exclusivo', desc: 'Notas cálidas de vainilla, ámbar y sándalo.' },
  { id: 10, marca: 'Maison Aura',   nombre: 'Bruma Corporal Flor de Azahar',     cat: 'Fragancias', precio: 24000, tag: '', desc: 'Bruma ligera y refrescante.' },
  { id: 11, marca: 'Lumi Hair',     nombre: 'Champú Reparador de Queratina',    cat: 'Cabello', precio: 21500, tag: '', desc: 'Repara la fibra capilar y sella las puntas.' },
  { id: 12, marca: 'Lumi Hair',     nombre: 'Mascarilla Capilar Nutritiva',      cat: 'Cabello', precio: 23000, tag: 'Nuevo', desc: 'Tratamiento intensivo con karité y aguacate.' }
];

const $ = s => document.querySelector(s);
const money = n => '$' + Number(n).toLocaleString('es-AR');
const pad = n => String(n).padStart(4, '0');
const waUrl = text => `https://wa.me/${CONFIG.WHATSAPP}${text ? `?text=${encodeURIComponent(text)}` : ''}`;
const LOGO = '<img src="img/logo.png" alt="" onerror="this.remove()">✦';

let pageFlip = null;
let pages = [];

/* ---------- Estructura de páginas ---------- */
function buildPages(){
  if (CONFIG.MODE === 'images'){
    return Array.from({ length: CONFIG.TOTAL_PAGES }, (_, i) => ({
      type: 'image', src: `pages/${pad(i + 1)}.${CONFIG.IMAGE_EXT}`, label: `Página ${i + 1}`
    }));
  }
  const list = [{ type: 'cover' }];
  for (let i = 0; i < PRODUCTOS.length; i += 2){
    list.push({ type: 'products', items: PRODUCTOS.slice(i, i + 2) });
  }
  list.push({ type: 'back' });
  return list;
}

/* ---------- Render ---------- */
function cardHTML(p){
  const src = p.img || `img/${p.id}.jpg`;
  const msg = `¡Hola! Quiero pedir: ${p.nombre} (${money(p.precio)})`;
  return `
    <article class="product-card">
      <div class="card-img">
        ${p.tag ? `<span class="card-tag">${p.tag}</span>` : ''}
        <img src="${src}" alt="${p.nombre}" loading="lazy" onerror="this.remove()">
      </div>
      <div class="card-brand">${p.marca}</div>
      <h3 class="card-name">${p.nombre}</h3>
      <p class="card-desc">${p.desc}</p>
      <div class="card-price">${money(p.precio)}</div>
      <a class="card-cta" href="${waUrl(msg)}" target="_blank" rel="noopener">Pedir por WhatsApp</a>
    </article>`;
}

function pageHTML(p){
  switch (p.type){
    case 'image':
      return `<div class="page-inner">
        <img src="${p.src}" alt="${p.label}" loading="lazy"
             onerror="this.parentElement.classList.add('page-error'); this.remove()">
      </div>`;
    case 'cover':
      return `
        <div class="page-inner cover">
          <span class="mark mark-lg" aria-hidden="true">${LOGO}</span>
          <p class="kicker">Edición especial</p>
          <h2 class="cover-title">Belleza que<br>brilla</h2>
          <p class="cover-desc">Lo mejor en cuidado de la piel, maquillaje, fragancias y cabello, en un solo lugar.</p>
          <p class="hint">Arrastrar o usar las flechas para pasar las páginas</p>
        </div>`;
    case 'products':
      return `
        <div class="page-inner products">
          <div class="cat-head">${p.items[0].cat}</div>
          <div class="cards">${p.items.map(cardHTML).join('')}</div>
        </div>`;
    case 'back':
      return `
        <div class="page-inner back">
          <div class="back-logo" aria-hidden="true">✦</div>
          <h2 class="back-title">¡Gracias por<br>tu visita!</h2>
          <p class="back-desc">Para consultas, te respondemos por WhatsApp. ¡Te esperamos!</p>
          <a class="btn-light" href="${waUrl()}" target="_blank" rel="noopener">Escribir por WhatsApp</a>
        </div>`;
  }
  return '';
}

function renderBook(){
  $('#flipbook').innerHTML = pages
    .map(p => `<div class="page page-${p.type}">${pageHTML(p)}</div>`)
    .join('');
}

function thumbHTML(p, i){
  let body;
  if (p.type === 'image'){
    body = `<img src="${p.src}" alt="" loading="lazy" onerror="this.remove()">`;
  } else if (p.type === 'products'){
    const first = p.items[0];
    const last = p.items[p.items.length - 1];
    body = `<div class="thumb-txt">${first.cat}<small>Productos ${first.id} a ${last.id}</small></div>`;
  } else {
    body = `<div class="thumb-txt">${p.type === 'cover' ? 'Portada' : 'Contratapa'}</div>`;
  }
  return `<button class="thumb" type="button" data-idx="${i}" aria-label="Ir a la página ${i + 1}">
    ${body}<span class="thumb-num">${i + 1}</span>
  </button>`;
}

function renderIndex(){
  $('#pagesGrid').innerHTML = pages.map(thumbHTML).join('');
}

/* ---------- Revista ---------- */
function updateLabel(){
  $('#piLabel').textContent = `${pageFlip.getCurrentPageIndex() + 1} / ${pageFlip.getPageCount()}`;
}

function hideLoader(){
  const loader = $('#loader');
  loader.classList.add('done');
  setTimeout(() => loader.remove(), 500);
}

function showError(){
  $('#loader').innerHTML = '<p>No se pudo cargar la revista. Recargar la página para intentarlo de nuevo.</p>';
}

function initBook(){
  if (typeof St === 'undefined'){
    showError();
    return;
  }
  try {
    pageFlip = new St.PageFlip($('#flipbook'), {
      width: CONFIG.PAGE_WIDTH,
      height: CONFIG.PAGE_HEIGHT,
      size: 'stretch',
      minWidth: 260,
      maxWidth: 720,
      minHeight: 400,
      maxHeight: 1150,
      showCover: true,
      usePortrait: true,
      drawShadow: true,
      maxShadowOpacity: 0.35,
      showPageCorners: true,
      useMouseEvents: true,
      mobileScrollSupport: false,
      swipeDistance: 25,
      clickEventForward: true,
      startPage: 0
    });
    pageFlip.loadFromHTML($('#flipbook').querySelectorAll('.page'));
    pageFlip.on('flip', updateLabel);
    updateLabel();
    $('#pager').hidden = false;
    hideLoader();
  } catch (err){
    console.error('Error al iniciar la revista:', err);
    showError();
  }
}

/* ---------- Índice ---------- */
function openIndex(){
  $('#pagesModal').hidden = false;
  document.body.style.overflow = 'hidden';
  $('#closePages').focus();
}

function closeIndex(){
  $('#pagesModal').hidden = true;
  document.body.style.overflow = '';
  $('#btnIndex').focus();
}

/* ---------- Eventos ---------- */
function bindEvents(){
  $('#piPrev').addEventListener('click', () => pageFlip?.flipPrev());
  $('#piNext').addEventListener('click', () => pageFlip?.flipNext());

  $('#btnIndex').addEventListener('click', openIndex);
  $('#closePages').addEventListener('click', closeIndex);
  $('#pagesModal').addEventListener('click', e => {
    if (e.target === e.currentTarget) closeIndex();
  });
  $('#pagesGrid').addEventListener('click', e => {
    const thumb = e.target.closest('.thumb');
    if (!thumb) return;
    pageFlip?.turnToPage(Number(thumb.dataset.idx));
    closeIndex();
  });

  $('#btnDownload').addEventListener('click', () => {
    window.open(CONFIG.DOWNLOAD_URL, '_blank', 'noopener');
  });

  document.addEventListener('keydown', e => {
    if (!$('#pagesModal').hidden){
      if (e.key === 'Escape') closeIndex();
      return;
    }
    if (e.key === 'ArrowLeft') pageFlip?.flipPrev();
    if (e.key === 'ArrowRight') pageFlip?.flipNext();
  });
}

function actualizarFecha(){
  const hoy = new Date().toLocaleDateString('es-AR', { day: '2-digit', month: '2-digit', year: 'numeric' });
  $('#topSub').textContent = `Precios actualizados al ${hoy}`;
}

/* ---------- Inicio ---------- */
function init(){
  $('#btnWhats').href = waUrl('¡Hola GLOW by Ro! Quiero hacer un pedido 💫');
  $('#btnDownload').hidden = !CONFIG.DOWNLOAD_URL;

  actualizarFecha();
  document.addEventListener('visibilitychange', () => {
    if (!document.hidden) actualizarFecha();
  });

  pages = buildPages();
  renderBook();
  renderIndex();
  bindEvents();

  requestAnimationFrame(() => setTimeout(initBook, 300));
}

document.addEventListener('DOMContentLoaded', init);
