/* =========================================================
   Boda Mariana & Manuel · Lógica de la invitación
   ========================================================= */

/* ---------- Configuración (edita aquí) ---------- */
const CONFIG = {
  // Fecha y hora de la boda (con la zona horaria; -06:00 = Costa Rica)
  fecha: '2027-06-19T16:00:00-06:00',

  // Número de WhatsApp que recibe las confirmaciones (con código de país, sin + ni espacios).
  // Si lo dejas vacío, WhatsApp pedirá elegir a quién enviar el mensaje.
  whatsapp: '',

  // Enlace del botón "Compártenos tu dirección aquí" (formulario, WhatsApp, etc.)
  enlaceDireccion: '#'
};

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
   3. Transición sobre ⇄ invitación
   ========================================================= */
const sobre = $('sobre');
const destello = $('destello');
const portada = $('portada');

function abrirInvitacion() {
  if (sobre.classList.contains('abriendo')) return;
  sobre.classList.add('abriendo');
  setTimeout(() => destello.classList.add('activo'), 250);
  setTimeout(() => {
    sobre.hidden = true;
    sobre.classList.remove('abriendo');
    document.body.classList.remove('bloqueado');
    window.scrollTo(0, 0);
    portada.classList.remove('entrar');
    void portada.offsetWidth;
    portada.classList.add('entrar');
    destello.classList.remove('activo');
  }, 1100);
}

function volverAlSobre() {
  destello.classList.add('activo');
  setTimeout(() => {
    sobre.hidden = false;
    document.body.classList.add('bloqueado');
    window.scrollTo(0, 0);
    dibujarSobre();
    escribir();
    destello.classList.remove('activo');
  }, 850);
}

$('sello').addEventListener('click', abrirInvitacion);
$('abrir').addEventListener('click', abrirInvitacion);
$('volver').addEventListener('click', volverAlSobre);

/* =========================================================
   4. Escena del sobre abierto: se escala al ancho de pantalla
   ========================================================= */
function ajustarEscena() {
  const escala = Math.min((window.innerWidth - 16) / 900, Math.max(1, window.innerHeight / 760), 1.3);
  $('escena').style.transform = `translateX(-50%) scale(${escala})`;
  portada.style.height = Math.round(56 + 820 * escala) + 'px';
}

/* =========================================================
   5. Fecha, hora y cuenta regresiva
   ========================================================= */
const fecha = new Date(CONFIG.fecha);
const MESES = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'];
const DIAS = ['domingo', 'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado'];

function textosDeFecha() {
  if (isNaN(fecha)) return;
  $('fecha-corta').textContent = `${dos(fecha.getDate())}.${dos(fecha.getMonth() + 1)}.${fecha.getFullYear()}`;
  $('fecha-larga').textContent = `El ${DIAS[fecha.getDay()]}, ${fecha.getDate()} de ${MESES[fecha.getMonth()]} de ${fecha.getFullYear()}`;
  const h = fecha.getHours(), m = fecha.getMinutes();
  const h12 = ((h + 11) % 12) + 1;
  const parte = h < 12 ? 'de la mañana' : (h < 19 ? 'de la tarde' : 'de la noche');
  $('hora-texto').textContent = `a las ${h12}${m ? ':' + dos(m) : ''} ${parte}.`;
}

function actualizarCuenta() {
  let resto = Math.max(0, fecha.getTime() - Date.now());
  const d = Math.floor(resto / 86400000); resto -= d * 86400000;
  const h = Math.floor(resto / 3600000); resto -= h * 3600000;
  const m = Math.floor(resto / 60000); resto -= m * 60000;
  const s = Math.floor(resto / 1000);
  $('cd-dias').textContent = d;
  $('cd-horas').textContent = dos(h);
  $('cd-min').textContent = dos(m);
  $('cd-seg').textContent = dos(s);
}

/* =========================================================
   6. Confirmación por WhatsApp
   ========================================================= */
const E = {
  anillo: '\u{1F48D}', brillo: '✨', ramo: '\u{1F490}', calendario: '\u{1F4C5}',
  corazon: '\u{1F90D}', copas: '\u{1F942}', persona: '\u{1F464}', carta: '\u{1F48C}',
  paloma: '\u{1F54A}️', fiesta: '\u{1F389}'
};

function crearMensaje(nombre, mensaje) {
  const dia = isNaN(fecha) ? '' :
    `${DIAS[fecha.getDay()].charAt(0).toUpperCase() + DIAS[fecha.getDay()].slice(1)} ${fecha.getDate()} de ${MESES[fecha.getMonth()]} de ${fecha.getFullYear()}`;
  return [
    `${E.anillo}${E.brillo} *CONFIRMACIÓN DE ASISTENCIA* ${E.brillo}${E.anillo}`,
    `${E.ramo} Boda de *Mariana & Manuel*`,
    `${E.calendario} ${dia}`,
    '',
    `¡Hola! ${E.corazon} Con mucha alegría confirmo mi asistencia a su boda. Será un honor acompañarlos y celebrar juntos este día tan especial. ${E.copas}`,
    '',
    `${E.persona} *Nombre completo:* ${nombre}`,
    '',
    `${E.carta} *Mensaje para los novios:*`,
    mensaje ? `_“${mensaje}”_` : '-',
    '',
    `¡Nos vemos en el gran día! ${E.paloma}${E.fiesta}`
  ].join('\n');
}

const form = $('form-rsvp');
form.addEventListener('submit', (e) => {
  e.preventDefault();
  const nombre = $('rsvp-nombre').value.trim();
  const mensaje = $('rsvp-mensaje').value.trim();
  if (!nombre) {
    $('campo-nombre').classList.add('campo--error');
    $('rsvp-nombre').focus();
    return;
  }
  $('campo-nombre').classList.remove('campo--error');

  const tel = CONFIG.whatsapp.replace(/\D/g, '');
  const url = 'https://api.whatsapp.com/send?' + (tel ? 'phone=' + tel + '&' : '') +
              'text=' + encodeURIComponent(crearMensaje(nombre, mensaje));
  const ventana = window.open(url, '_blank', 'noopener');
  if (!ventana) window.location.href = url;

  form.hidden = true;
  $('rsvp-gracias').hidden = false;
});
$('rsvp-nombre').addEventListener('input', () => $('campo-nombre').classList.remove('campo--error'));
$('rsvp-editar').addEventListener('click', () => {
  $('rsvp-gracias').hidden = true;
  form.hidden = false;
  $('rsvp-nombre').focus();
});

/* =========================================================
   7. Aparición al hacer scroll
   ========================================================= */
const revelar = document.querySelectorAll('.revelar');
if ('IntersectionObserver' in window) {
  const obs = new IntersectionObserver((entradas) => {
    entradas.forEach((en) => {
      if (en.isIntersecting) { en.target.classList.add('visible'); obs.unobserve(en.target); }
    });
  }, { threshold: 0.12 });
  revelar.forEach((el) => obs.observe(el));
} else {
  revelar.forEach((el) => el.classList.add('visible'));
}

/* =========================================================
   Inicio
   ========================================================= */
$('boton-direccion').href = CONFIG.enlaceDireccion;
textosDeFecha();
actualizarCuenta();
setInterval(actualizarCuenta, 1000);
dibujarSobre();
ajustarEscena();
escribir();
window.addEventListener('resize', () => { dibujarSobre(); ajustarEscena(); });
