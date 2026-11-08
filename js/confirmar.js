/* Confirma tu asistencia: opciones, validación y envío por WhatsApp */
const respuestas = { asiste: '', acomp: '', menu: [] };
const $ = (id) => document.getElementById(id);

document.querySelectorAll('.opts').forEach((grupo) => {
  const nombre = grupo.dataset.grupo;
  const multiple = grupo.dataset.multiple === 'true';
  grupo.querySelectorAll('.opt').forEach((boton) => {
    boton.addEventListener('click', () => {
      const valor = boton.dataset.valor;
      if (multiple) {
        const i = respuestas[nombre].indexOf(valor);
        if (i >= 0) respuestas[nombre].splice(i, 1); else respuestas[nombre].push(valor);
        const activo = respuestas[nombre].includes(valor);
        boton.classList.toggle('on', activo);
        boton.setAttribute('aria-pressed', activo);
      } else {
        respuestas[nombre] = valor;
        grupo.querySelectorAll('.opt').forEach((b) => {
          b.classList.toggle('on', b === boton);
          b.setAttribute('aria-pressed', b === boton);
        });
      }
      $('solo-si').hidden = respuestas.asiste !== 'si';
      $('campo-acomp').hidden = respuestas.acomp !== 'si';
      $('r-error').hidden = true;
    });
  });
});

function crearMensaje() {
  const E = EMOJI;
  const si = respuestas.asiste === 'si';
  const v = (id) => $(id).value.trim();
  const l = [
    `${E.anillo}${E.brillo} *CONFIRMACIÓN DE ASISTENCIA* ${E.brillo}${E.anillo}`,
    `${E.ramo} Boda de *Mariana & Manuel*`,
    '',
    `${E.persona} *Nombre:* ${v('r-nombre')}`,
    si ? `${E.ok} *¡Asistiré!* No me lo perdería.` : `${E.carta} *No podré asistir*, les mando mucho cariño.`
  ];
  if (si) {
    l.push(`${E.pareja} *Acompañante:* ${respuestas.acomp === 'si' ? (v('r-acomp') || 'Sí') : 'No'}`);
    l.push(`${E.plato} *Menú:* ${respuestas.menu.length ? respuestas.menu.join(', ') : 'Sin indicar'}`);
    if (v('r-alergias')) l.push(`${E.alerta} *Alergias:* ${v('r-alergias')}`);
    if (v('r-cancion')) l.push(`${E.musica} *Canción para bailar:* ${v('r-cancion')}`);
  }
  if (v('r-mensaje')) { l.push('', `${E.carta} *Mensaje para los novios:*`, `_“${v('r-mensaje')}”_`); }
  l.push('', si ? `¡Nos vemos en el gran día! ${E.fiesta}` : `Con cariño ${E.corazon}`);
  return l.join('\n');
}

$('form-rsvp').addEventListener('submit', (e) => {
  e.preventDefault();
  const error = $('r-error');
  if (!$('r-nombre').value.trim()) { error.textContent = 'Por favor escribe tu nombre completo.'; error.hidden = false; $('r-nombre').focus(); return; }
  if (!respuestas.asiste) { error.textContent = 'Por favor cuéntanos si nos acompañarás.'; error.hidden = false; return; }
  abrirWhatsApp(crearMensaje());
  $('form-rsvp').hidden = true;
  $('r-gracias').hidden = false;
  window.scrollTo({ top: 0, behavior: 'smooth' });
});
$('r-nombre').addEventListener('input', () => { $('r-error').hidden = true; });
$('r-editar').addEventListener('click', () => { $('r-gracias').hidden = true; $('form-rsvp').hidden = false; });
