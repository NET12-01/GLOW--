/* ============================================================
   GLOW by Ro — Revista Digital
   ============================================================ */

const CONFIG = {
  WHATSAPP: '5491123456789',
  MODE: 'auto',
  TOTAL_PAGES: 20,
  IMAGE_EXT: 'jpg',
  PAGE_WIDTH: 519,
  PAGE_HEIGHT: 793,
  DOWNLOAD_URL: ''
};

const PRODUCTOS_DEFAULT = [
  { id:1,  marca:'Glow Lab',      nombre:'Sérum Iluminador Vitamina C',  cat:'Skincare',   precio:34900, tag:'Best seller', desc:'Unifica el tono y aporta luminosidad inmediata.', img:'' },
  { id:2,  marca:'Glow Lab',      nombre:'Crema Hidratante Hialurónico', cat:'Skincare',   precio:28500, tag:'',            desc:'Hidratación profunda 24 h, textura ligera.', img:'' },
  { id:3,  marca:'Botica Verde',  nombre:'Aceite Facial Rosa Mosqueta',  cat:'Skincare',   precio:31000, tag:'Nuevo',       desc:'Regenera y nutre la piel durante la noche.', img:'' },
  { id:4,  marca:'Botica Verde',  nombre:'Limpiador Suave de Rosas',     cat:'Skincare',   precio:19900, tag:'',            desc:'Espuma delicada que limpia sin resecar.', img:'' },
  { id:5,  marca:'Velvet Beauty', nombre:'Labial Líquido Mate Velvet',   cat:'Maquillaje', precio:16900, tag:'Best seller', desc:'Color intenso de larga duración.', img:'' },
  { id:6,  marca:'Velvet Beauty', nombre:'Base Luminosa Skin Glow',      cat:'Maquillaje', precio:27500, tag:'',            desc:'Cobertura media modulable, acabado natural.', img:'' },
  { id:7,  marca:'Velvet Beauty', nombre:'Paleta de Sombras Nude',       cat:'Maquillaje', precio:32000, tag:'',            desc:'12 tonos neutros mate y satinados.', img:'' },
  { id:8,  marca:'Velvet Beauty', nombre:'Máscara de Pestañas Volumen',  cat:'Maquillaje', precio:14900, tag:'',            desc:'Volumen extremo y curvatura duradera.', img:'' },
  { id:9,  marca:'Maison Aura',   nombre:'Eau de Parfum Vainilla Ámbar', cat:'Fragancias', precio:59000, tag:'Exclusivo',   desc:'Notas cálidas de vainilla, ámbar y sándalo.', img:'' },
  { id:10, marca:'Maison Aura',   nombre:'Bruma Corporal Flor de Azahar',cat:'Fragancias', precio:24000, tag:'',            desc:'Bruma ligera y refrescante.', img:'' },
  { id:11, marca:'Lumi Hair',     nombre:'Shampoo Reparador Keratina',   cat:'Cabello',    precio:21500, tag:'',            desc:'Repara la fibra capilar y sella las puntas.', img:'' },
  { id:12, marca:'Lumi Hair',     nombre:'Mascarilla Capilar Nutritiva', cat:'Cabello',    precio:23000, tag:'Nuevo',       desc:'Tratamiento intensivo con karité y aguacate.', img:'' }
];

const $ = s => document.querySelector(s);
const money = n => '$' + Number(n).toLocaleString('es-AR');
const pad = n => String(n).padStart(4, '0');

let pageFlip = null;
let pagesList = [];

let lastDateKey = '';
function actualizarFecha(){
  const d = new Date();
  const key = `${d.getFullYear()}-${d.getMonth()}-${d.getDate()}`;
  if (key === lastDateKey) return;
  lastDateKey = key;
  const dd = String(d.getDate()).padStart(2,'0');
  const mm = String(d.getMonth()+1).padStart(2,'0');
  const el = $('#topSub');
  if (el) el.textContent = `Precios al ${dd}/${mm}/${d.getFullYear()} · Revista digital`;
}

function applyWhatsAppLinks(){
  const msg = '¡Hola GLOW by Ro! Quiero hacer un pedido 💫';
  const url = `https://wa.me/${CONFIG.WHATSAPP}?text=${encodeURIComponent(msg)}`;
  $('#btnWhats').href = url;
  $('#waFloat').href = url;
}

function buildPagesList(){
  pagesList = [];

  if (CONFIG.MODE === 'images'){
    for (let i = 1; i <= CONFIG.TOTAL_PAGES; i++){
      pagesList.push({
        src: `pages/${pad(i)}.${CONFIG.IMAGE_EXT}`,
        label: `Página ${i}`,
        isImagePage: true
      });
    }
    return;
  }

  pagesList.push({ type: 'cover', label: 'Portada' });
  for (let i = 0; i < PRODUCTOS_DEFAULT.length; i += 2){
    pagesList.push({
      type: 'products',
      products: PRODUCTOS_DEFAULT.slice(i, i + 2),
      label: `Productos ${i+1}-${Math.min(i+2, PRODUCTOS_DEFAULT.length)}`
    });
  }
  pagesList.push({ type: 'back', label: 'Contratapa' });
}

function renderFlipbookDOM(){
  const fb = $('#flipbook');
  fb.innerHTML = '';

  pagesList.forEach((page, idx) => {
    const el = document.createElement('div');
    el.className = 'page';
    el.dataset.idx = idx;

    if (page.isImagePage){
      el.innerHTML = `
        <div class="page-inner page-image-inner">
          <img src="${page.src}" alt="${page.label}" loading="lazy"
               onerror="this.style.display='none'; this.parentElement.classList.add('page-error');">
        </div>
      `;
    } else if (page.type === 'cover'){
      el.classList.add('page-cover');
      el.innerHTML = `
        <div class="page-inner cover-inner">
          <div class="cover-logo">
            <img src="img/logo.png" alt="GLOW by Ro"
                 onerror="this.style.display='none'; this.nextElementSibling.style.display='grid'">
            <div class="cover-logo-fallback">✦</div>
          </div>
          <p class="cover-kicker">Edición especial</p>
          <h2 class="cover-title">Belleza que<br>brilla</h2>
          <p class="cover-desc">Hojalá la revista y descubrí lo mejor en skincare, maquillaje, fragancias y cabello.</p>
          <p class="cover-hint">← Arrastrá o usá las flechas →</p>
        </div>
      `;
    } else if (page.type === 'back'){
      el.classList.add('page-back');
      el.innerHTML = `
        <div class="page-inner back-inner">
          <div class="back-logo">✦</div>
          <h2 class="back-title">¡Gracias por<br>tu visita!</h2>
          <p class="back-desc">Cualquier consulta, escribinos por WhatsApp. ¡Te esperamos!</p>
          <a class="btn-primary btn-large" href="https://wa.me/${CONFIG.WHATSAPP}" target="_blank">Escribinos</a>
        </div>
      `;
    } else if (page.type === 'products'){
      el.classList.add('page-products');
      el.innerHTML = `
        <div class="page-inner products-inner">
          ${page.products.map(renderProductCard).join('')}
        </div>
      `;
    }

    fb.appendChild(el);
  });
}

function renderProductCard(p){
  const imgSrc = p.img ? (p.img.startsWith('img/') ? p.img : 'img/' + p.img) : `img/${p.id}.jpg`;
  const msg = `¡Hola! Quiero pedir: ${p.nombre} (${money(p.precio)})`;
  return `
    <div class="product-card" data-id="${p.id}">
      <div class="card-img-wrap">
        ${p.tag ? `<span class="card-tag">${p.tag}</span>` : ''}
        <img class="card-img" src="${imgSrc}" alt="${p.nombre}" loading="lazy"
             onerror="this.style.display='none'">
      </div>
      ${p.marca ? `<div class="card-brand">${p.marca}</div>` : ''}
      <div class="card-name">${p.nombre}</div>
      ${p.desc ? `<div class="card-desc">${p.desc}</div>` : ''}
      <div class="card-price">${money(p.precio)}</div>
      <a class="card-add" href="https://wa.me/${CONFIG.WHATSAPP}?text=${encodeURIComponent(msg)}" target="_blank">
        Pedir por WhatsApp
      </a>
    </div>
  `;
}

function initFlipbook(){
  const fb = $('#flipbook');

  requestAnimationFrame(() => {
    setTimeout(() => {
      try {
        pageFlip = new St.PageFlip(fb, {
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

        pageFlip.loadFromHTML(fb.querySelectorAll('.page'));

        const updateUI = () => {
          const total = pageFlip.getPageCount();
          const curr = pageFlip.getCurrentPageIndex() + 1;
          $('#piLabel').textContent = `${curr} / ${total}`;
        };
        pageFlip.on('flip', updateUI);
        setTimeout(updateUI, 150);

        $('#pageIndicator').hidden = false;

        const loader = $('#loader');
        const bar = $('#loaderBar');
        bar.style.width = '100%';
        setTimeout(() => { loader.classList.add('loader--done'); }, 250);
        setTimeout(() => { loader.style.display = 'none'; }, 700);

      } catch (err){
        console.error('Error StPageFlip:', err);
        $('#loader').innerHTML = '<p>No se pudo cargar la revista.</p>';
      }
    }, 400);
  });
}

function bindNavControls(){
  $('#piPrev').addEventListener('click', () => { if (pageFlip) pageFlip.flipPrev(); });
  $('#piNext').addEventListener('click', () => { if (pageFlip) pageFlip.flipNext(); });

  document.addEventListener('keydown', e => {
    if (!$('#pagesModal').hidden) return;
    if (e.key === 'ArrowLeft')  { if (pageFlip) pageFlip.flipPrev(); }
    if (e.key === 'ArrowRight') { if (pageFlip) pageFlip.flipNext(); }
  });
}

function renderPagesGrid(){
  const grid = $('#pagesGrid');
  grid.innerHTML = '';

  const total = pageFlip ? pageFlip.getPageCount() : pagesList.length;

  for (let i = 0; i < total; i++){
    const pageData = pagesList[i];
    const thumb = document.createElement('button');
    thumb.className = 'page-thumb';
    thumb.dataset.idx = i;

    if (pageData && pageData.isImagePage){
      thumb.innerHTML = `
        <img src="${pageData.src}" alt="Página ${i+1}" loading="lazy"
             onerror="this.style.display='none'; this.parentElement.classList.add('thumb-error');">
        <span class="thumb-num">${i+1}</span>
      `;
    } else if (pageData && pageData.type === 'cover'){
      thumb.innerHTML = `<div class="thumb-placeholder thumb-cover">✦<span class="thumb-num">${i+1}</span></div>`;
    } else if (pageData && pageData.type === 'back'){
      thumb.innerHTML = `<div class="thumb-placeholder thumb-back">✦<span class="thumb-num">${i+1}</span></div>`;
    } else if (pageData && pageData.type === 'products'){
      const first = pageData.products[0];
      const src = first.img ? (first.img.startsWith('img/') ? first.img : 'img/' + first.img) : `img/${first.id}.jpg`;
      thumb.innerHTML = `
        <img src="${src}" alt="Página ${i+1}" loading="lazy"
             onerror="this.style.display='none'; this.parentElement.classList.add('thumb-error');">
        <span class="thumb-num">${i+1}</span>
      `;
    } else {
      thumb.innerHTML = `<div class="thumb-placeholder"><span class="thumb-num">${i+1}</span></div>`;
    }

    thumb.addEventListener('click', () => {
      if (pageFlip){
        try { pageFlip.turnToPage(i); } catch(e){}
      }
      closePagesModal();
    });

    grid.appendChild(thumb);
  }
}

function openPagesModal(){
  renderPagesGrid();
  $('#pagesModal').hidden = false;
  document.body.style.overflow = 'hidden';
}
function closePagesModal(){
  $('#pagesModal').hidden = true;
  document.body.style.overflow = '';
}

let toastTimer;
function toast(msg){
  const el = $('#toast');
  el.textContent = msg;
  el.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => el.classList.remove('show'), 2200);
}

function bindUI(){
  $('#btnPages').addEventListener('click', openPagesModal);
  $('#closePages').addEventListener('click', closePagesModal);
  $('#pagesModal').addEventListener('click', e => {
    if (e.target === $('#pagesModal')) closePagesModal();
  });

  $('#btnDownload').addEventListener('click', () => {
    if (CONFIG.DOWNLOAD_URL){
      window.open(CONFIG.DOWNLOAD_URL, '_blank');
    } else {
      toast('La descarga estará disponible pronto');
    }
  });

  $('#btnMenu').addEventListener('click', () => {
    openPagesModal();
  });
}

function init(){
  actualizarFecha();
  applyWhatsAppLinks();
  buildPagesList();
  renderFlipbookDOM();
  initFlipbook();
  bindNavControls();
  bindUI();

  setInterval(actualizarFecha, 30000);
  document.addEventListener('visibilitychange', () => {
    if (!document.hidden) actualizarFecha();
  });
}

document.addEventListener('DOMContentLoaded', init);