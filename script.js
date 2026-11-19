<!DOCTYPE html>
<html lang="es-AR">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>GLOW by Ro — Revista digital</title>
<meta name="description" content="Revista digital de GLOW by Ro: catálogo de productos de belleza y pedidos por WhatsApp.">
<meta name="theme-color" content="#A63608">
<meta property="og:title" content="GLOW by Ro — Revista digital">
<meta property="og:description" content="Catálogo de productos de belleza y pedidos por WhatsApp.">
<meta property="og:type" content="website">
<meta property="og:image" content="img/logo.png">
<link rel="icon" href="img/logo.png">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,600..800&family=Figtree:wght@400;500;600;700&display=swap" rel="stylesheet">
<link rel="stylesheet" href="styles.css">
</head>
<body>

<header class="topbar">
  <div class="brand">
    <span class="mark" aria-hidden="true"><img src="img/logo.png" alt="" onerror="this.remove()">✦</span>
    <div class="brand-text">
      <h1>GLOW by Ro</h1>
      <p id="topSub">Revista digital</p>
    </div>
  </div>
  <nav class="actions" aria-label="Acciones">
    <button class="btn-ghost" id="btnIndex" type="button" aria-label="Ver índice de páginas">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/></svg>
      <span class="label">Índice</span>
    </button>
    <button class="btn-ghost" id="btnDownload" type="button" aria-label="Descargar revista" hidden>
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><path d="m7 10 5 5 5-5"/><path d="M12 15V3"/></svg>
      <span class="label">Descargar</span>
    </button>
    <a class="btn-wa" id="btnWhats" href="#" target="_blank" rel="noopener" aria-label="Pedir por WhatsApp">
      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M17.5 14.4c-.3-.2-1.7-.8-2-.9-.3-.1-.5-.2-.7.2-.2.3-.8 1-1 1.2-.2.2-.4.2-.7.1-1.8-.9-3-1.6-4.2-3.7-.3-.5.3-.5.9-1.5.1-.2 0-.4 0-.5s-.7-1.6-.9-2.2c-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4-.3.3-1 1-1 2.5s1.1 2.9 1.2 3.1c.2.2 2.1 3.3 5.1 4.6 1.9.8 2.7.9 3.6.7.6-.1 1.7-.7 1.9-1.4.2-.7.2-1.3.2-1.4-.1-.2-.3-.2-.6-.4z"/><path d="M12 2C6.5 2 2 6.5 2 12c0 1.8.5 3.5 1.3 5L2 22l5.1-1.3c1.4.8 3.1 1.3 4.9 1.3 5.5 0 10-4.5 10-10S17.5 2 12 2z"/></svg>
      <span class="label">WhatsApp</span>
    </a>
  </nav>
</header>

<main class="viewer" id="viewer">
  <div class="flipbook" id="flipbook"></div>
  <div class="loader" id="loader" role="status">
    <div class="spinner" aria-hidden="true"></div>
    <p>Cargando revista…</p>
  </div>
</main>

<nav class="pager" id="pager" aria-label="Navegación de páginas" hidden>
  <button class="pager-btn" id="piPrev" type="button" aria-label="Página anterior">
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" aria-hidden="true"><path d="m15 18-6-6 6-6"/></svg>
  </button>
  <span class="pager-label" id="piLabel" aria-live="polite">1 / 1</span>
  <button class="pager-btn" id="piNext" type="button" aria-label="Página siguiente">
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" aria-hidden="true"><path d="m9 18 6-6-6-6"/></svg>
  </button>
</nav>

<div class="modal" id="pagesModal" hidden>
  <div class="modal-box" role="dialog" aria-modal="true" aria-labelledby="pagesTitle">
    <div class="modal-head">
      <h2 id="pagesTitle">Índice de páginas</h2>
      <button class="icon-btn" id="closePages" type="button" aria-label="Cerrar">✕</button>
    </div>
    <div class="pages-grid" id="pagesGrid"></div>
  </div>
</div>

<script src="https://cdn.jsdelivr.net/npm/page-flip@2.0.7/dist/js/page-flip.browser.js"></script>
<script src="script.js"></script>
</body>
</html>
