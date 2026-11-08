/* Los detalles: preguntas frecuentes que se abren y cierran */
document.querySelectorAll('.faq-item').forEach((item) => {
  const boton = item.querySelector('button');
  boton.addEventListener('click', () => {
    const abierta = boton.getAttribute('aria-expanded') === 'true';
    document.querySelectorAll('.faq-item').forEach((otro) => {
      otro.querySelector('button').setAttribute('aria-expanded', 'false');
      otro.querySelector('.faq-icon').textContent = '+';
      otro.querySelector('.ans').hidden = true;
    });
    if (!abierta) {
      boton.setAttribute('aria-expanded', 'true');
      item.querySelector('.faq-icon').textContent = '−';
      item.querySelector('.ans').hidden = false;
    }
  });
});
