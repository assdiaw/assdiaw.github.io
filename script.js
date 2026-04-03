const revealElements = document.querySelectorAll(".reveal");
const menuToggle = document.getElementById("menuToggle");
const menu = document.getElementById("menu");
const year = document.getElementById("year");
const heroRevealElements = document.querySelectorAll(".hero .reveal");
const hero = document.querySelector(".hero");
const heroText = document.querySelector(".hero-text");
const diagram = document.getElementById("architectDiagram");
const diagramLines = document.querySelectorAll(".diag-line");
const measureCursor = document.getElementById("measureCursor");
const compassGroup = document.getElementById("compassGroup");

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

if (diagram && diagramLines.length && measureCursor && compassGroup) {
  diagramLines.forEach((line, index) => {
    const length = line.getTotalLength();
    line.style.strokeDasharray = `${length}`;
    line.style.strokeDashoffset = `${length}`;
    line.dataset.length = `${length}`;
    line.dataset.delay = `${index * 0.1}`;
  });

  const start = performance.now();

  const animateDiagram = (now) => {
    const t = (now - start) / 1000;

    diagramLines.forEach((line) => {
      const length = Number(line.dataset.length || 0);
      const delay = Number(line.dataset.delay || 0);
      const phase = Math.max(0, Math.min(1, (t - delay) / 1.4));
      line.style.strokeDashoffset = `${length * (1 - phase)}`;
    });

    const cursorX = 24 + ((Math.sin(t * 1.2) + 1) / 2) * 416;
    measureCursor.setAttribute("cx", cursorX.toFixed(2));

    const swing = Math.sin(t * 1.8) * 6;
    compassGroup.setAttribute("transform", `translate(740 60) rotate(${swing.toFixed(2)})`);

    requestAnimationFrame(animateDiagram);
  };

  requestAnimationFrame(animateDiagram);
}
