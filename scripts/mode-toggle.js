
const toggleBtn = document.getElementById("mode-toggle");
const body = document.body;


if (localStorage.getItem("theme") === "dark") {
  body.classList.add("dark");
  toggleBtn.textContent = "🌙 Dark Mode";
} else {
  toggleBtn.textContent = "☀️ Light Mode";
}

toggleBtn.addEventListener("click", () => {
  body.classList.toggle("dark");
  if (body.classList.contains("dark")) {
    localStorage.setItem("theme", "dark");
    toggleBtn.textContent = "🌙 Dark Mode";
  } else {
    localStorage.setItem("theme", "light");
    toggleBtn.textContent = "☀️ Light Mode";
  }
});

