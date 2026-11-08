# Invitación de boda · Mariana & Manuel

Sitio web de una sola página en HTML, CSS y JavaScript puros. Responsive para celular, tablet y computadora.

## Estructura

```
boda-mariana-manuel/
├── index.html        ← contenido (sobre, invitación, formulario, pie)
├── css/styles.css    ← colores, texturas, animaciones y responsive
├── js/main.js        ← sobre, letras que se escriben, cuenta regresiva, WhatsApp
├── assets/
│   ├── img/          ← texturas de papel y vista-previa.jpg
│   └── svg/          ← sello, encaje, marco, peonía, corazón, ramo, pradera, monograma
├── .nojekyll
└── README.md
```

## Antes de publicar: datos por completar

1. **`js/main.js`** (al inicio, en `CONFIG`):
   - `fecha`: fecha y hora reales de la boda (ej. `'2027-06-19T16:00:00-06:00'`). Con esto se actualizan solos el corazón, el texto de la fecha y la cuenta regresiva.
   - `whatsapp`: número que recibe las confirmaciones, con código de país (ej. `'50688887777'`).
   - `enlaceDireccion`: a dónde lleva el botón "Compártenos tu dirección aquí".
2. **`index.html`**:
   - `[Lugar], [Ciudad]` → el lugar de la boda.
   - `[correo o WhatsApp]` en el pie → el contacto de los novios.
   - Foto del marco ovalado: guarda la foto en `assets/img/foto.jpg` y reemplaza `<p class="sc">Foto de los novios</p>` por `<img src="assets/img/foto.jpg" alt="Mariana y Manuel">`.
   - `TU-USUARIO` y `TU-REPOSITORIO` en las líneas `og:image` y `og:url` (vista previa en WhatsApp).

## Publicar en GitHub Pages

1. Crea un repositorio **público** (ej. `mariana-y-manuel`).
2. *Add file → Upload files*: arrastra **el contenido** de esta carpeta (que `index.html` quede en la raíz) y presiona *Commit changes*.
3. *Settings → Pages* → *Deploy from a branch* → rama **main**, carpeta **/ (root)** → *Save*.
4. En 1–2 minutos estará en `https://TU-USUARIO.github.io/mariana-y-manuel/`.
