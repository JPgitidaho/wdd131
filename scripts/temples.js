const gallery = document.getElementById("gallery");
const links = [...document.querySelectorAll(".nav a")];
const yearSpan = document.getElementById("year");
const modSpan = document.getElementById("lastModified");
const viewTitle = document.getElementById("viewTitle");

let data = [];
let currentFilter = "all";

function toYear(d) {
  if (!d) return null;
  const parts = String(d).split(",").map((p) => p.trim());
  if (parts.length > 0) {
    const y = parseInt(parts[0], 10);
    return isNaN(y) ? null : y;
  }
  return null;
}

function filterList() {
  return data.filter((t) => {
    const year = toYear(t.dedicated);
    const area = typeof t.area === "number" ? t.area : 0;
    if (currentFilter === "old") return year && year < 1950;
    if (currentFilter === "new") return year && year >= 1950;
    if (currentFilter === "large") return area >= 90000;
    if (currentFilter === "small") return area < 90000;
    return true;
  });
}

function render() {
  const list = filterList();
  gallery.innerHTML = "";
  list.forEach((t) => {
    const fig = document.createElement("figure");
    fig.className = "figure";

    const media = document.createElement("div");
    media.className = "figure-media";
    const img = document.createElement("img");
    img.src = t.imageUrl;
    img.alt = t.templeName;
    img.loading = "lazy";
    img.decoding = "async";
    media.appendChild(img);

    const cap = document.createElement("figcaption");
    cap.className = "figure-cap";
    const h2 = document.createElement("h2");
    h2.textContent = t.templeName;
    const loc = document.createElement("p");
    loc.textContent = t.location;
    const ded = document.createElement("p");
    ded.textContent = `Dedicated: ${t.dedicated}`;
    const ar = document.createElement("p");
    ar.textContent = `Area: ${t.area} sq ft`;

    cap.append(h2, loc, ded, ar);
    fig.append(media, cap);
    gallery.appendChild(fig);
  });

  viewTitle.textContent =
    currentFilter === "all"
      ? "Home"
      : currentFilter.charAt(0).toUpperCase() + currentFilter.slice(1);
}

links.forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    currentFilter = link.dataset.filter;
    links.forEach((l) => l.classList.remove("active"));
    link.classList.add("active");
    render();
  });
});

async function load() {
  try {
    const res = await fetch("data/templeList.json");
    if (!res.ok) throw new Error("no json");
    data = await res.json();
  } catch (e) {
    console.error("Error loading templeList.json", e);
    data = [];
  }
  render();
}
load();
yearSpan.textContent = new Date().getFullYear();
modSpan.textContent = document.lastModified;