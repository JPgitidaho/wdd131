
const products = [
  { id: "p1", name: "Laptop Pro 15" },
  { id: "p2", name: "Wireless Headphones" },
  { id: "p3", name: "Smartphone Max" },
  { id: "p4", name: "Gaming Mouse" },
  { id: "p5", name: "4K Monitor" }
];

document.addEventListener("DOMContentLoaded", () => {
  const productSelect = document.getElementById("productName");
  if (productSelect) {
    products.forEach(product => {
      const option = document.createElement("option");
      option.value = product.id;
      option.textContent = product.name;
      productSelect.appendChild(option);
    });
  }

  if (window.location.pathname.includes("review.html")) {
    let count = localStorage.getItem("reviewCount") || 0;
    count++;
    localStorage.setItem("reviewCount", count);
    document.getElementById("reviewCount").textContent = count;
  }
});
