const menuBtn = document.getElementById("menu");
const nav = document.getElementById("primary-nav");

function updateMenuIcon() {
  const open = nav.classList.contains("open");
  menuBtn.textContent = open ? "✕" : "☰";
  menuBtn.setAttribute("aria-label", open ? "Close menu" : "Open menu");
  menuBtn.setAttribute("aria-expanded", open ? "true" : "false");
}

menuBtn.addEventListener("click", () => {
  nav.classList.toggle("open");
  updateMenuIcon();
});

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && nav.classList.contains("open")) {
    nav.classList.remove("open");
    updateMenuIcon();
  }
});
