const revealElements = document.querySelectorAll(".reveal");
const menuToggle = document.getElementById("menuToggle");
const menu = document.getElementById("menu");
const year = document.getElementById("year");
const heroRevealElements = document.querySelectorAll(".hero .reveal");
const hero = document.querySelector(".hero");
const heroText = document.querySelector(".hero-text");

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

heroRevealElements.forEach((el, index) => {
  setTimeout(() => el.classList.add("active"), 120 + index * 140);
});

if (menuToggle && menu) {
  menuToggle.addEventListener("click", () => {
    menu.classList.toggle("open");
  });

  menu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => menu.classList.remove("open"));
  });
}

if (hero && heroText) {
  hero.addEventListener("mousemove", (event) => {
    const rect = hero.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;

    heroText.style.translate = `${x * -4}px ${y * -4}px`;
  });

  hero.addEventListener("mouseleave", () => {
    heroText.style.translate = "0 0";
  });
}
