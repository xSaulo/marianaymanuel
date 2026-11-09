/* Presiona para revelar: abre y cierra la caja */
const caja = document.getElementById('revelar');
document.getElementById('abrir-caja').addEventListener('click', () => caja.classList.add('open'));
document.getElementById('cerrar-caja').addEventListener('click', () => caja.classList.remove('open'));
