const revealElements = document.querySelectorAll(".reveal");
const menuToggle = document.getElementById("menuToggle");
const menu = document.getElementById("menu");
const year = document.getElementById("year");

if (year) {
  year.textContent = new Date().getFullYear();
}

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("active");
      }
    });
  },
  { threshold: 0.2 }
);

revealElements.forEach((el, index) => {
  el.style.transitionDelay = `${Math.min(index * 80, 500)}ms`;
  observer.observe(el);
});

if (menuToggle && menu) {
  menuToggle.addEventListener("click", () => {
    menu.classList.toggle("open");
  });

  menu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => menu.classList.remove("open"));
  });
}
