// Datos de ejemplo - imágenes SVG
const products = [
  { id: 'p1', title: 'Audífonos Inalámbricos X1', price: 49.99, image: 'images/headphones.svg', desc: 'Sonido inmersivo y cancelación de ruido' },
  { id: 'p2', title: 'Mouse Gamer Viper', price: 29.5, image: 'images/mouse.svg', desc: 'Sensor óptico 16000 DPI' },
  { id: 'p3', title: 'Teclado Mecánico K7', price: 79.0, image: 'images/keyboard.svg', desc: 'Switches táctiles y retroiluminación' },
  { id: 'p4', title: 'Cargador Rápido 30W', price: 19.99, image: 'images/charger.svg', desc: 'Carga segura y compacta' }
];

const state = { cart: {} };

function formatPrice(n){ return n.toFixed(2) }

const productsEl = document.getElementById('products');
const searchInput = document.getElementById('search');

function renderProducts(filter = ''){
  productsEl.innerHTML = '';
  const q = filter.trim().toLowerCase();
  const list = products.filter(p => !q || p.title.toLowerCase().includes(q) || (p.desc && p.desc.toLowerCase().includes(q)));
  list.forEach(p => {
    const card = document.createElement('article');
    card.className = 'product';
    card.innerHTML = `
      <div class="product-image"><img src="${p.image}" alt="${p.title}"/></div>
      <h3 class="product-title">${p.title}</h3>
      <div class="product-desc">${p.desc}</div>
      <div style="display:flex;justify-content:space-between;align-items:center;gap:8px">
        <div class="product-price">$${formatPrice(p.price)}</div>
        <button class="add-to-cart">Agregar</button>
      </div>
    `;
    const btn = card.querySelector('.add-to-cart');
    btn.addEventListener('click', ()=>{
      addToCart(p.id);
      // animación visual breve
      btn.animate([{ transform: 'scale(1)' }, { transform: 'scale(0.96)' }, { transform: 'scale(1)' }], { duration: 220 });
      openCheckoutPanel();
    });
    productsEl.appendChild(card);
  });
}

function addToCart(productId){
  const item = products.find(p => p.id === productId);
  if(!item) return;
  if(!state.cart[productId]) state.cart[productId] = { ...item, qty: 0 };
  state.cart[productId].qty += 1;
  renderCartSummary();
  renderCheckout();
}

function renderCartSummary(){
  const count = Object.values(state.cart).reduce((s,i)=>s+i.qty,0);
  document.getElementById('cart-count').textContent = count;
}

const checkoutPanel = document.getElementById('checkout-panel');
const openCartBtn = document.getElementById('open-cart');
const closeCheckoutBtn = document.getElementById('close-checkout');

openCartBtn.addEventListener('click', ()=> openCheckoutPanel());
closeCheckoutBtn.addEventListener('click', ()=> closeCheckoutPanel());

function openCheckoutPanel(){
  checkoutPanel.setAttribute('aria-hidden', 'false');
}
function closeCheckoutPanel(){
  checkoutPanel.setAttribute('aria-hidden', 'true');
}

function renderCheckout(){
  const container = document.getElementById('checkout-items');
  container.innerHTML = '';
  let total = 0;
  Object.values(state.cart).forEach(item => {
    const row = document.createElement('div');
    row.className = 'checkout-item';
    row.innerHTML = `
      <img src="${item.image}" alt="${item.title}" />
      <div style="flex:1">
        <div style="font-weight:700">${item.title}</div>
        <div style="color:var(--muted);font-size:0.9rem">$${formatPrice(item.price)} x ${item.qty}</div>
      </div>
      <div class="qty-controls" data-id="${item.id}">
        <button class="qty-plus">+</button>
        <div class="qty-value">${item.qty}</div>
        <button class="qty-minus">-</button>
      </div>
    `;
    container.appendChild(row);
    total += item.price * item.qty;
  });
  document.getElementById('checkout-total').textContent = formatPrice(total);

  // attach qty handlers
  Array.from(document.querySelectorAll('.qty-controls')).forEach(ctrl => {
    const id = ctrl.dataset.id;
    const plus = ctrl.querySelector('.qty-plus');
    const minus = ctrl.querySelector('.qty-minus');
    plus.onclick = () => { changeQty(id, 1); };
    minus.onclick = () => { changeQty(id, -1); };
  });
}

function changeQty(id, delta){
  if(!state.cart[id]) return;
  state.cart[id].qty += delta;
  if(state.cart[id].qty <= 0) delete state.cart[id];
  renderCartSummary();
  renderCheckout();
}

// Número de WhatsApp fijo de la tienda (cámbialo aquí si es necesario)
const STORE_WHATSAPP = '+573001112223';

// WhatsApp handler (usa número fijo)
document.getElementById('open-whatsapp').addEventListener('click', ()=>{
  const items = Object.values(state.cart);
  if(items.length === 0){
    alert('El carrito está vacío. Agrega productos antes de enviar.');
    return;
  }

  let message = `Hola! Quiero hacer un pedido desde Tienda Electrónica.%0A`;
  let total = 0;
  items.forEach(it => {
    message += `${it.title} - $${formatPrice(it.price)} x ${it.qty}%0A`;
    total += it.price * it.qty;
  });
  message += `%0ATotal: $${formatPrice(total)}`;

  const phone = STORE_WHATSAPP.replace(/[+\s]/g, '');
  const encoded = encodeURIComponent(message);
  const url = `https://wa.me/${phone}?text=${encoded}`;
  window.open(url, '_blank');
});

// busqueda
searchInput.addEventListener('input', (e) => renderProducts(e.target.value));

// Inicial
renderProducts();
renderCartSummary();
renderCheckout();
