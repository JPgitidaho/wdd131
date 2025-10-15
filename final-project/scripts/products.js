import { addToCart, currency } from "./cart.js";

export function createCard(p) {
  return `
    <article class="card">
      <img loading="lazy" decoding="async" width="480" height="360" src="${p.image}" alt="${p.title.replace(/"/g, "&quot;")}">
      <div class="card-body">
        <h3 class="card-title">${p.title}</h3>
        <p class="card-meta">${currency(p.price)}</p>
        <button class="btn add" data-id="${p.id}">Add to Cart</button>
      </div>
    </article>
  `;
}

export function renderGrid(containerSelector, products) {
  const el = document.querySelector(containerSelector);
  if (!el) return;
  el.innerHTML = products.map(createCard).join("");
  el.querySelectorAll(".btn.add").forEach(btn => {
    btn.addEventListener("click", () => {
      const id = Number(btn.dataset.id);
      const p = products.find(x => x.id === id);
      if (p) addToCart(p);
    });
  });
}

export function initHome(products) {
  const top = products.slice(0, 6);
  renderGrid("#home-grid", top);
}

export function initProducts(products) {
  const categoryEl = document.querySelector("#category");
  const qEl = document.querySelector("#q");
  const sortEl = document.querySelector("#sort");
  const grid = "#products-grid";
  const state = { q: "", category: "", sort: "" };

  function uniqueCategories(products) {
    return [...new Set(products.map(p => p.category))].sort();
  }

  if (categoryEl) {
    uniqueCategories(products).forEach(c => {
      const opt = document.createElement("option");
      opt.value = c;
      opt.textContent = c;
      categoryEl.appendChild(opt);
    });
  }

  function applyFilters(products, q, category, sort) {
    let list = [...products];
    if (q) list = list.filter(p => p.title.toLowerCase().includes(q.toLowerCase()));
    if (category) list = list.filter(p => p.category === category);
    if (sort === "price-asc") list.sort((a, b) => a.price - b.price);
    if (sort === "price-desc") list.sort((a, b) => b.price - a.price);
    return list;
  }

  function sync() {
    const list = applyFilters(products, state.q, state.category, state.sort);
    renderGrid(grid, list);
  }

  qEl?.addEventListener("input", e => { state.q = e.target.value; sync(); });
  categoryEl?.addEventListener("change", e => { state.category = e.target.value; sync(); });
  sortEl?.addEventListener("change", e => { state.sort = e.target.value; sync(); });
  sync();
}
