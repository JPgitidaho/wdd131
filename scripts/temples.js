document.addEventListener("DOMContentLoaded", () => {
  const navLinks = document.querySelectorAll(".nav a");
  const figures = document.querySelectorAll(".gallery .figure");
  const viewTitle = document.getElementById("viewTitle");

  navLinks.forEach(link => {
    link.addEventListener("click", e => {
      e.preventDefault();
      const filter = link.dataset.filter;

      navLinks.forEach(l => l.classList.remove("active"));
      link.classList.add("active");

    
      viewTitle.textContent =
        filter === "all"
          ? "All Temples"
          : `${filter.charAt(0).toUpperCase() + filter.slice(1)} Temples`;


      figures.forEach(fig => {
        const text = fig.textContent.toLowerCase();

        
        const yearMatch = text.match(/dedicated:\s*(\d{4})/i);
        const areaMatch = text.match(/area:\s*([\d,]+)/i);
        const year = yearMatch ? parseInt(yearMatch[1]) : 0;
        const area = areaMatch ? parseInt(areaMatch[1].replace(/,/g, "")) : 0;

        let show = false;

        switch (filter) {
          case "old":
            show = year && year < 1950;
            break;
          case "new":
            show = year && year >= 2000;
            break;
          case "large":
            show = area > 90000;
            break;
          case "small":
            show = area < 20000;
            break;
          default:
            show = true;
        }

        fig.style.display = show ? "block" : "none";
      });
    });
  });

 
  document.querySelector('.nav a[data-filter="all"]').click();


  document.getElementById("year").textContent = new Date().getFullYear();
  document.getElementById("lastModified").textContent = document.lastModified;
});
