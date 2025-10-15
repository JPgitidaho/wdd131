import { API_URL, fetchJSON } from "./api.js";
import { updateCartBadge, initCart } from "./cart.js";
import { initHome, initProducts } from "./products.js";
import { initContact } from "./contact.js";

async function boot() {
  try {
    updateCartBadge();
    const page = document.body.getAttribute("data-page");
    const products = await fetchJSON(API_URL);
    if (page === "home") initHome(products);
    if (page === "products") initProducts(products);
    if (page === "contact") initContact();
    if (page === "cart") initCart();
  } catch (e) {
    console.error(e);
  }
}

boot();
