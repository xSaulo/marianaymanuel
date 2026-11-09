/* =========================================================
   Boda Mariana & Manuel · Sobre de entrada
   ========================================================= */

/* La configuración (fecha, WhatsApp, enlace) está en js/config.js */

const $ = (id) => document.getElementById(id);
const dos = (n) => String(n).padStart(2, '0');

/* =========================================================
   1. Sobre de entrada: geometría responsive
   ========================================================= */
function dibujarSobre() {
  const vw = window.innerWidth, vh = window.innerHeight;
  const vertical = vw / vh < 0.85;
  const W = vertical ? 620 : 1440;
  const H = vertical ? 1000 : 900;
  const escala = Math.max(vw / W, vh / H);
  const cx = W / 2;
  const yBorde = vertical ? 300 : 190;   // donde la solapa toca los lados
  const yPunta = vertical ? 560 : 500;   // punta de la solapa (donde va el sello)
  const yPliegue = vertical ? 640 : 560;

  const esc = $('escenario');
  esc.style.width = W + 'px';
  esc.style.height = H + 'px';
  esc.style.transform = `translate(-50%, -50%) scale(${escala})`;

  const svg = $('pliegues');
  svg.setAttribute('width', W); svg.setAttribute('height', H);
  svg.setAttribute('viewBox', `0 0 ${W} ${H}`);
  $('pliegue-oscuro').setAttribute('d',
    `M0 ${H} L${cx - 40} ${yPliegue} M${W} ${H} L${cx + 40} ${yPliegue} ` +
    `M0 ${yBorde + 40} L${cx - 60} ${yPliegue + 10} M${W} ${yBorde + 40} L${cx + 60} ${yPliegue + 10}`);
  $('pliegue-claro').setAttribute('d',
    `M2 ${H - 2} L${cx - 38} ${yPliegue + 2} M${W - 2} ${H - 2} L${cx + 38} ${yPliegue + 2}`);

  $('solapa').style.clipPath =
    `polygon(0 0, 100% 0, 100% ${yBorde / H * 100}%, 50% ${yPunta / H * 100}%, 0 ${yBorde / H * 100}%)`;

  const largo = Math.hypot(cx, yPunta - yBorde) + 40;
  const angIzq = Math.atan2(yPunta - yBorde, cx) * 180 / Math.PI;
  const angDer = Math.atan2(yBorde - yPunta, W - cx) * 180 / Math.PI;
  const izq = $('encaje-izq'), der = $('encaje-der');
  izq.style.cssText = `left:-20px; top:${yBorde - (yPunta - yBorde) * 20 / cx}px; width:${largo}px; transform:rotate(${angIzq}deg)`;
  der.style.cssText = `left:${cx}px; top:${yPunta}px; width:${largo}px; transform:rotate(${angDer}deg)`;

  const sello = $('sello');
  sello.style.left = (cx - 75) + 'px';
  sello.style.top = (yPunta - 95) + 'px';

  $('texto-sobre').style.top = vertical ? '20%' : '22%';
  $('texto-abrir').style.top = vertical ? '74%' : '78%';
}

/* =========================================================
   2. Letras que se escriben (máquina de escribir)
   ========================================================= */
const LINEA1 = 'Una carta de amor de';
const LINEA2 = 'Mariana & Manuel';
const PAUSA = 4;
let temporizadorEscritura = null;

function escribir() {
  clearInterval(temporizadorEscritura);
  let n = 0;
  const total = LINEA1.length + PAUSA + LINEA2.length;
  const pintar = () => {
    const n1 = Math.min(n, LINEA1.length);
    const n2 = Math.max(0, Math.min(n - LINEA1.length - PAUSA, LINEA2.length));
    $('linea1').textContent = LINEA1.slice(0, n1);
    $('resto1').textContent = LINEA1.slice(n1);
    $('linea2').textContent = LINEA2.slice(0, n2);
    $('resto2').textContent = LINEA2.slice(n2);
    $('abrir').classList.toggle('visible', n >= total);
  };
  pintar();
  setTimeout(() => {
    temporizadorEscritura = setInterval(() => {
      n++;
      pintar();
      if (n >= total) clearInterval(temporizadorEscritura);
    }, 95);
  }, 600);
}

/* =========================================================
   3. Al abrir: el sobre se aleja, se abre, sale la invitación
      y luego pasa al collage (inicio.html)
   ========================================================= */
const sobre = $('sobre');
const destello = $('destello');
const ap = $('apertura');
let tiempos = [];

/* Fecha en la tarjeta (de js/config.js) */
(function () {
  const f = new Date(CONFIG.fecha);
  const meses = ['enero','febrero','marzo','abril','mayo','junio','julio','agosto','septiembre','octubre','noviembre','diciembre'];
  const el = document.querySelector('[data-fecha-apertura]');
  if (el && !isNaN(f)) el.textContent = f.getDate() + ' · ' + meses[f.getMonth()] + ' · ' + f.getFullYear();
})();

function fase(n) { ap.classList.add('f' + n); }

function abrirInvitacion() {
  if (ap.classList.contains('f1')) return;
  ap.setAttribute('aria-hidden', 'false');
  sobre.classList.add('alejar');
  requestAnimationFrame(() => fase(1));             // el sobre completo aparece alejándose
  tiempos = [
    setTimeout(() => fase(2), 1300),                // se quita el sello y se abre la solapa
    setTimeout(() => fase(3), 2400),                // la invitación sale del sobre
    setTimeout(() => fase(4), 3600),                // el sobre baja y la invitación queda al centro
    setTimeout(continuar, 5900)                     // pasa sola al collage
  ];
}

function continuar() {
  if (ap.classList.contains('f5')) return;
  tiempos.forEach(clearTimeout);
  fase(5);
  setTimeout(() => { window.location.href = 'inicio.html'; }, 850);
}

$('ap-card').addEventListener('click', () => { if (ap.classList.contains('f4')) continuar(); });
$('sello').addEventListener('click', abrirInvitacion);
$('abrir').addEventListener('click', abrirInvitacion);

/* Si se vuelve con el botón "atrás" del navegador, el sobre aparece cerrado otra vez */
window.addEventListener('pageshow', (e) => {
  if (e.persisted) {
    tiempos.forEach(clearTimeout);
    ap.className = 'apertura'; ap.setAttribute('aria-hidden', 'true');
    sobre.classList.remove('alejar'); destello.classList.remove('activo'); escribir();
  }
});

dibujarSobre();
escribir();
window.addEventListener('resize', dibujarSobre);
