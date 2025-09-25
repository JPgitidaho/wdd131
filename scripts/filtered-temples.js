import { temples } from "../data/temples.js";

function displayTemples(list) {
  const container = document.querySelector("#temple-cards");
  container.innerHTML = "";
  list.forEach((temple) => {
    const card = document.createElement("section");
    card.classList.add("temple-card");
    card.innerHTML = `
      <h2>${temple.templeName}</h2>
      <p><strong>Ubicación:</strong> ${temple.location}</p>
      <p><strong>Dedicación:</strong> ${temple.dedicated}</p>
      <p><strong>Área:</strong> ${temple.area.toLocaleString()} pies²</p>
      <img src="${temple.imageUrl}" alt="Imagen de ${temple.templeName}" loading="lazy">
    `;
    container.appendChild(card);
  });
}

function onClick(id, handler) {
  const el = document.getElementById(id);
  if (!el) return;
  el.addEventListener("click", (e) => {
    e.preventDefault();
    handler();
  });
}

document.addEventListener("DOMContentLoaded", () => {
  displayTemples(temples);

  onClick("home", () => displayTemples(temples));
  onClick("old", () =>
    displayTemples(temples.filter((t) => new Date(t.dedicated).getFullYear() < 1900))
  );
  onClick("new", () =>
    displayTemples(temples.filter((t) => new Date(t.dedicated).getFullYear() > 2000))
  );
  onClick("large", () => displayTemples(temples.filter((t) => t.area > 90000)));
  onClick("small", () => displayTemples(temples.filter((t) => t.area < 10000)));

  const y = document.getElementById("year");
  if (y) y.textContent = new Date().getFullYear();
  const lm = document.getElementById("lastModified");
  if (lm) lm.textContent = document.lastModified;
});
