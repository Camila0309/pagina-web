# Tienda Electrónica - Demo

Proyecto estático demo de una tienda de productos electrónicos con HTML/CSS/JS.

Características:
- Listado de productos con imágenes generadas en SVG.
- Carrito en memoria (sin backend).
- Al agregar productos se desplaza la vista a la sección de Checkout.
- En el checkout puedes ingresar un número de WhatsApp (con código de país) y abrir WhatsApp Web o móvil con el pedido prellenado.

Cómo usar:
1. Abre `index.html` en tu navegador (doble clic o desde VS Code con Live Server).
2. Haz clic en "Agregar al carrito" para añadir productos. El carrito actualizará el conteo.
3. En la sección de Checkout ingresa el número de WhatsApp con código de país (ej. +573001112223) y presiona "Enviar pedido por WhatsApp".

Personalización rápida:
- Cambia los productos en `app.js` modificando el array `products`.
- Reemplaza las imágenes SVG en `images/` por las que prefieras.

Notas:
- Este proyecto no almacena datos entre recargas.
- WhatsApp debe estar instalado o usar WhatsApp Web; el enlace generado utiliza la API `wa.me`.
