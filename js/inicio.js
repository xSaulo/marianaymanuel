/* Inicio photo booth: ajusta la escena del sobre al tamaño de pantalla */
function ajustarEscena() {
  const vw = window.innerWidth;
  const movil = vw < 700;                       // en celular: encuadre vertical más grande
  const escala = movil ? (vw - 6) / 600 : Math.min(1.15, (vw - 12) / 1000);
  const escena = document.getElementById('escena');
  escena.style.width = (movil ? 600 : 1000) + 'px';
  escena.style.transform = `translateX(-50%) scale(${escala})`;
  document.getElementById('escena-int').style.transform = `translateX(${movil ? -150 : 0}px)`;
  document.getElementById('hero').style.height = Math.round((movil ? 680 : 700) * escala) + 'px';

  const tira = document.getElementById('tira');
  tira.style.left = (movil ? 612 : 700) + 'px';
  tira.style.width = (movil ? 128 : 150) + 'px';

  document.getElementById('amaranto').style.left = (movil ? 146 : 98) + 'px';


  // Collage: mesa de 600px que se escala al ancho de la pantalla
  const csc = Math.min(1.3, (vw - 16) / 600);
  document.getElementById('mesa').style.transform = `translateX(-50%) scale(${csc})`;
  document.getElementById('collage').style.height = Math.round(1380 * csc) + 'px';
}
ajustarEscena();
window.addEventListener('resize', ajustarEscena);

/* Disco: al tocarlo gira y suena la canción (YouTube, oculto) */
const disco = document.getElementById('disco');
const nota = document.getElementById('disco-nota');
const yt = document.getElementById('yt-mm');
disco.addEventListener('click', () => {
  const on = !disco.classList.contains('sonando');
  disco.classList.toggle('sonando', on);
  disco.setAttribute('aria-pressed', on);
  nota.textContent = on ? '♪ Toca para pausar' : '♪ Toca el disco';
  yt.contentWindow.postMessage(JSON.stringify({ event: 'command', func: on ? 'playVideo' : 'pauseVideo', args: [] }), '*');
});
