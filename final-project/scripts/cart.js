const CART_KEY = "dm-cart";

export function readCart() {
  try { return JSON.parse(localStorage.getItem(CART_KEY) || "[]"); } catch { return []; }
}

export function writeCart(arr) {
  localStorage.setItem(CART_KEY, JSON.stringify(arr));
  updateCartBadge();
}

export function updateCartBadge() {
  const el = document.querySelector("#cart-count");
  if (!el) return;
  const arr = readCart();
  const total = arr.reduce((s, i) => s + Number(i.qty || 0), 0);
  el.textContent = String(total);
}

export function addToCart(product) {
  const arr = readCart();
  const idx = arr.findIndex(i => i.id === product.id);
  if (idx >= 0) arr[idx].qty += 1;
  else arr.push({ id: product.id, title: product.title, price: product.price, qty: 1 });
  writeCart(arr);
}

export function currency(n) {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(n);
}

export function initCart() {
  const itemsContainer = document.querySelector("#cart-items");
  const totalEl = document.querySelector("#cart-total");
  const cart = readCart();

  if (cart.length === 0) {
    itemsContainer.innerHTML = "<p>Your cart is empty.</p>";
    totalEl.textContent = "$0.00";
    return;
  }

  const html = cart.map(item => `
    <div class="cart-item">
      <div class="details">
        <h3>${item.title}</h3>
        <p>Qty: ${item.qty}</p>
        <p class="price">${currency(item.price * item.qty)}</p>
      </div>
      <div class="actions">
        <button class="btn ghost remove" data-id="${item.id}">Remove</button>
      </div>
    </div>
  `).join("");

  itemsContainer.innerHTML = html;

  const total = cart.reduce((sum, i) => sum + i.price * i.qty, 0);
  totalEl.textContent = currency(total);

  itemsContainer.querySelectorAll(".remove").forEach(btn => {
    btn.addEventListener("click", () => {
      const id = Number(btn.dataset.id);
      const updated = cart.filter(p => p.id !== id);
      writeCart(updated);
      initCart();
    });
  });
}
