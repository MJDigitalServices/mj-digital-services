# Digital Services — Web con identidad corporativa y portafolio

Esta versión tiene una identidad visual más cercana al logo oficial:
- Azul: #004AAD
- Turquesa: #03989E
- Blanco como elemento de contraste, inspirado en la banda central del logo.
- Logo oficial integrado en la navegación, hero y sección Nosotros.
- Nueva galería fotográfica de proyectos.

## Cómo poner tus fotos reales

La carpeta es:

`img/proyectos/`

La galería ya está preparada para estas seis fotografías:

`proyecto-01.jpg`
`proyecto-02.jpg`
`proyecto-03.jpg`
`proyecto-04.jpg`
`proyecto-05.jpg`
`proyecto-06.jpg`

Solo debes copiar tus fotografías dentro de `img/proyectos/` usando esos nombres.
No tienes que modificar el HTML si conservas esos nombres.

### Ejemplo

Si tienes una foto llamada `foto-camara-bodega.jpg`, puedes:
1. Copiarla a `img/proyectos/`
2. Renombrarla a `proyecto-02.jpg`
3. Abrir `index.html`
4. Buscar el texto `Proyecto de control de acceso` o la tarjeta correspondiente.
5. Cambiar título, descripción y categoría si es necesario.

## Recomendación para el portafolio

Por cada trabajo es ideal mostrar:
- 1 foto general del proyecto.
- 1 o 2 fotos del proceso.
- 1 foto de los detalles técnicos.
- 1 foto del resultado final.

Más adelante podemos convertir cada tarjeta en una página individual:
`proyecto-redes.html`, `proyecto-cctv.html`, etc., con galería completa y descripción técnica.

## Formulario de contacto

El formulario ya está conectado y envía correos de verdad a través de
[FormSubmit](https://formsubmit.co) a `Ventas@digitalservices.com.co`.

**Importante:** la primera vez que alguien envíe el formulario en producción,
FormSubmit manda un correo de activación a esa dirección — hay que abrirlo y
confirmar (un solo clic) para que empiecen a llegar los siguientes mensajes.

Si en el futuro quieres cambiar el correo de destino, edita el `action` del
`<form id="contactForm">` en `index.html`.

## Antes de publicar

Ya no quedan datos de ejemplo — el correo, WhatsApp y ubicación en `index.html`
son los reales de la empresa. Solo revisa que sigan siendo correctos antes de
publicar.

## Ajustes recientes

- Fotos de la galería de proyectos comprimidas (de ~23 MB a ~1 MB) para que la
  página cargue rápido; los archivos `.png` pesados se convirtieron a `.jpg`.
- Formulario de contacto conectado a FormSubmit — ya envía correos reales.
- La sección de "Clientes" ahora es una sección independiente en vez de estar
  anidada dentro de "Proyectos".
- Las tarjetas de servicios ahora usan una estructura flexible para que "Más información" no se superponga con el texto.
- Se mejoró el comportamiento responsive de servicios, portafolio y contacto.
- Se corrigió el número mostrado de WhatsApp para que coincida con el enlace configurado.
