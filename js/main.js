// Typing effect
const phrases = ["Big Data", "Strategic Management", "Innovation", "Financial Econometrics", "AI & Coaching"];
let pi = 0, ci = 0, deleting = false;
const typedEl = document.getElementById("typed");
function tick() {
  if (!typedEl) return;
  const word = phrases[pi];
  typedEl.textContent = word.slice(0, ci);
  if (!deleting) { ci++; if (ci > word.length) { deleting = true; return setTimeout(tick, 1400); } }
  else { ci--; if (ci === 0) { deleting = false; pi = (pi + 1) % phrases.length; } }
  setTimeout(tick, deleting ? 40 : 80);
}
tick();

// Scroll reveal
const io = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add("visible");
      // animate skill bars
      e.target.querySelectorAll(".bar i").forEach(b => { b.style.width = b.style.getPropertyValue("--w") || "70%"; });
      if (e.target.classList.contains("skill")) {
        const b = e.target.querySelector(".bar i");
        if (b) b.style.width = b.style.getPropertyValue("--w");
      }
      io.unobserve(e.target);
    }
  });
}, { threshold: 0.12 });
document.querySelectorAll(".reveal, .skill").forEach(el => io.observe(el));
// set initial widths for already-visible bars
document.querySelectorAll(".bar i").forEach(b => {
  if (b.closest(".visible")) b.style.width = b.style.getPropertyValue("--w");
});

// Progress + navbar shadow + toTop
const prog = document.getElementById("scrollProgress");
const toTop = document.getElementById("toTop");
window.addEventListener("scroll", () => {
  const h = document.documentElement;
  const pct = h.scrollTop / (h.scrollHeight - h.clientHeight) * 100;
  if (prog) prog.style.width = pct + "%";
}, { passive: true });
if (toTop) toTop.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));

// Mobile menu
const menuBtn = document.getElementById("menuBtn");
const navLinks = document.getElementById("navLinks");
if (menuBtn && navLinks) {
  menuBtn.addEventListener("click", () => navLinks.classList.toggle("open"));
  navLinks.querySelectorAll("a").forEach(a => a.addEventListener("click", () => navLinks.classList.remove("open")));
}

// Theme toggle (persist)
const toggle = document.getElementById("themeToggle");
const root = document.documentElement;
const saved = localStorage.getItem("aka-theme");
if (saved) root.setAttribute("data-theme", saved);
if (toggle) toggle.addEventListener("click", () => {
  const next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
  root.setAttribute("data-theme", next);
  localStorage.setItem("aka-theme", next);
});

// Publication filters
document.querySelectorAll(".filter-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    document.querySelectorAll(".filter-btn").forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    const f = btn.dataset.filter;
    document.querySelectorAll("#pubGrid .pub").forEach(card => {
      const show = f === "all" || (card.dataset.cat || "").includes(f);
      card.classList.toggle("hide", !show);
    });
  });
});

// Counters
document.querySelectorAll("[data-count]").forEach(el => {
  const target = parseInt(el.dataset.count, 10);
  let cur = 0;
  const step = () => {
    cur += 1;
    if (cur >= target) { el.firstChild.textContent = target + "+"; return; }
    el.firstChild.textContent = cur;
    setTimeout(step, 120);
  };
  // only animate if numeric start
  if (!isNaN(target) && /^\d/.test(el.textContent.trim())) step();
});

// Year
document.getElementById("year").textContent = new Date().getFullYear();
