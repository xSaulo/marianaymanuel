# Invitación de boda · Mariana & Manuel

Sitio web en HTML, CSS y JavaScript puros. Pensado primero para celular, también funciona en tablet y computadora.

## Páginas

| Archivo | Qué es |
|---|---|
| `index.html` | Sobre de entrada (letras que se escriben). Al tocar el sello pasa a `inicio.html` |
| `inicio.html` | Página principal: sobre abierto con tira de fotos, collage cuyas piezas abren cada sección, cuenta regresiva |
| `detalles.html` | Fecha y lugar, vestimenta, itinerario, recepción, viaje, hospedaje, mesa de regalos y preguntas frecuentes |
| `confirmar.html` | Formulario (asistencia, alergias, canción, mensaje) → WhatsApp |
| `historia.html` | Nuestra historia con collage de fotos |
| `revelar.html` | Caja "Presiona para revelar" |

## Estructura

```
boda-mariana-manuel/
├── index.html, inicio.html, detalles.html, confirmar.html, historia.html, revelar.html
├── css/        ← un archivo de estilos por página (styles.css es el de index.html)
├── js/
│   ├── config.js   ← ⭐ fecha, WhatsApp y enlace de dirección (edita aquí)
│   ├── comun.js    ← fechas, cuenta regresiva y WhatsApp compartidos
│   └── sobre.js, inicio.js, detalles.js, confirmar.js, revelar.js
├── assets/img/ y assets/svg/   ← texturas, sellos, encaje, flores, cisnes, bandeja, pastel
└── .nojekyll
```

## Datos por completar

1. **`js/config.js`**: `fecha`, `whatsapp` (con código de país, ej. `50688887777`) y `enlaceDireccion`. La fecha se actualiza sola en todas las páginas.
2. **Textos entre corchetes** `[ ... ]` en los `.html`: lugares, direcciones, horas del itinerario, historia, preguntas frecuentes, hospedaje, etc.
3. **Fotos**: guárdalas en `assets/img/` y reemplaza cada bloque `<div class="photo">…<span>Foto …</span></div>` por la imagen, por ejemplo:
   `<div class="photo"><img src="assets/img/foto1.jpg" alt="Mariana y Manuel" style="width:100%;height:100%;object-fit:cover"></div>`
4. **Vista previa en WhatsApp** (`index.html`): cambia `TU-USUARIO` y `TU-REPOSITORIO` en `og:image` y `og:url`.

## Publicar en GitHub Pages

1. Crea un repositorio **público** (ej. `mariana-y-manuel`).
2. *Add file → Upload files*: arrastra **el contenido** de esta carpeta (que `index.html` quede en la raíz) → *Commit changes*.
3. *Settings → Pages* → *Deploy from a branch* → **main** / **(root)** → *Save*.
4. En 1–2 minutos: `https://TU-USUARIO.github.io/mariana-y-manuel/`
