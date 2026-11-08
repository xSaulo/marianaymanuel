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

  const flores = document.getElementById('flores');
  flores.style.left = (movil ? 70 : 40) + 'px';
  flores.style.top = (movil ? 400 : 300) + 'px';
  flores.style.width = (movil ? 170 : 200) + 'px';
  flores.style.height = (movil ? 340 : 400) + 'px';
}
ajustarEscena();
window.addEventListener('resize', ajustarEscena);
