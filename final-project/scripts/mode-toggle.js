const toggleBtn = document.getElementById("mode-toggle");
const body = document.body;


const saved = localStorage.getItem("theme") || "light";
if (saved === "dark") {
  body.classList.add("dark");
  toggleBtn.innerHTML = "🌙 ";
  toggleBtn.setAttribute("aria-pressed", "true");
} else {
  body.classList.remove("dark");
  toggleBtn.innerHTML = "☀️ ";
  toggleBtn.setAttribute("aria-pressed", "false");
}


toggleBtn.addEventListener("click", () => {
  const isDark = body.classList.toggle("dark");
  if (isDark) {
    localStorage.setItem("theme", "dark");
    toggleBtn.innerHTML = "🌙 ";
    toggleBtn.setAttribute("aria-pressed", "true");
  } else {
    localStorage.setItem("theme", "light");
    toggleBtn.innerHTML = "☀️ ";
    toggleBtn.setAttribute("aria-pressed", "false");
  }
});
