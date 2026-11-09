/* =========================================================
   Mariana & Manuel · Funciones compartidas
   (fechas, cuenta regresiva, WhatsApp)
   ========================================================= */
const FECHA = new Date(CONFIG.fecha);
const MESES = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'];
const DIAS = ['domingo', 'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado'];
const dos = (n) => String(n).padStart(2, '0');
const mayuscula = (t) => t.charAt(0).toUpperCase() + t.slice(1);

const textosFecha = {
  corta: () => `${dos(FECHA.getDate())}.${dos(FECHA.getMonth() + 1)}.${FECHA.getFullYear()}`,
  'corta-texto': () => `${FECHA.getDate()} · ${MESES[FECHA.getMonth()]} · ${FECHA.getFullYear()}`,
  larga: () => `${mayuscula(DIAS[FECHA.getDay()])}, ${FECHA.getDate()} de ${MESES[FECHA.getMonth()]} de ${FECHA.getFullYear()}`,
  hora: () => {
    const h = FECHA.getHours(), m = FECHA.getMinutes();
    return `A las ${((h + 11) % 12) + 1}:${dos(m)} ${h < 12 ? 'a. m.' : 'p. m.'}`;
  }
};

// Rellena cualquier elemento con data-fecha="corta | corta-texto | larga | hora"
if (!isNaN(FECHA)) {
  document.querySelectorAll('[data-fecha]').forEach((el) => {
    const f = textosFecha[el.dataset.fecha];
    if (f) el.textContent = f();
  });
}

// Cuenta regresiva (si la página tiene los elementos cd-dias, cd-horas, cd-min, cd-seg)
function iniciarCuentaRegresiva() {
  const el = { d: document.getElementById('cd-dias'), h: document.getElementById('cd-horas'), m: document.getElementById('cd-min'), s: document.getElementById('cd-seg') };
  if (!el.d) return;
  const pintar = () => {
    let resto = Math.max(0, FECHA.getTime() - Date.now());
    const d = Math.floor(resto / 86400000); resto -= d * 86400000;
    const h = Math.floor(resto / 3600000); resto -= h * 3600000;
    const m = Math.floor(resto / 60000); resto -= m * 60000;
    el.d.textContent = d; el.h.textContent = dos(h); el.m.textContent = dos(m); el.s.textContent = dos(Math.floor(resto / 1000));
  };
  pintar();
  setInterval(pintar, 1000);
}
iniciarCuentaRegresiva();

// Abre WhatsApp con el mensaje
function abrirWhatsApp(texto) {
  const tel = String(CONFIG.whatsapp || '').replace(/\D/g, '');
  const url = 'https://api.whatsapp.com/send?' + (tel ? 'phone=' + tel + '&' : '') + 'text=' + encodeURIComponent(texto);
  const ventana = window.open(url, '_blank', 'noopener');
  if (!ventana) window.location.href = url;
}

// Emojis escritos como códigos para que nunca se dañen
const EMOJI = {
  anillo: '\u{1F48D}', brillo: '✨', ramo: '\u{1F490}', calendario: '\u{1F4C5}', corazon: '\u{1F90D}',
  copas: '\u{1F942}', persona: '\u{1F464}', pareja: '\u{1F46B}', plato: '\u{1F37D}️', alerta: '⚠️',
  musica: '\u{1F3B6}', carta: '\u{1F48C}', ok: '✅', paloma: '\u{1F54A}️', fiesta: '\u{1F389}'
};
