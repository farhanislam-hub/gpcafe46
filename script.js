const loader = document.getElementById("loader");
window.addEventListener("load", () => setTimeout(() => loader.classList.add("hide"), 650));

const navbar = document.getElementById("navbar");
const topBtn = document.querySelector(".top-btn");
window.addEventListener("scroll", () => {
  navbar.classList.toggle("scrolled", window.scrollY > 60);
  topBtn.classList.toggle("show", window.scrollY > 600);
});

topBtn.addEventListener("click", () => window.scrollTo({top:0, behavior:"smooth"}));

const toggle = document.querySelector(".menu-toggle");
const nav = document.querySelector("nav");
toggle.addEventListener("click", () => nav.classList.toggle("open"));
document.querySelectorAll("nav a").forEach(a => a.addEventListener("click", () => nav.classList.remove("open")));

const sections = [...document.querySelectorAll("main section[id]")];
const navLinks = [...document.querySelectorAll("nav a")];
const setActive = () => {
  let current = "home";
  sections.forEach(section => {
    if (window.scrollY >= section.offsetTop - 180) current = section.id;
  });
  navLinks.forEach(link => link.classList.toggle("active", link.getAttribute("href") === "#" + current));
};
window.addEventListener("scroll", setActive);

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if(entry.isIntersecting){
      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    }
  });
}, {threshold:.12});
document.querySelectorAll(".reveal").forEach(el => observer.observe(el));

if (window.matchMedia("(pointer:fine)").matches) {
  const dot = document.querySelector(".cursor-dot");
  const ring = document.querySelector(".cursor-ring");
  window.addEventListener("mousemove", e => {
    dot.style.left = e.clientX - 3 + "px";
    dot.style.top = e.clientY - 3 + "px";
    ring.style.left = e.clientX - 15 + "px";
    ring.style.top = e.clientY - 15 + "px";
  });
}

document.querySelectorAll("[data-tilt]").forEach(card => {
  card.addEventListener("mousemove", e => {
    if(window.innerWidth < 900) return;
    const r = card.getBoundingClientRect();
    const x = (e.clientX-r.left)/r.width-.5;
    const y = (e.clientY-r.top)/r.height-.5;
    card.style.transform = `perspective(800px) rotateX(${y*-5}deg) rotateY(${x*5}deg) translateY(-8px)`;
  });
  card.addEventListener("mouseleave", () => card.style.transform = "");
});

// Smooth "page" transitions for internal anchors.
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener("click", e => {
    const target = document.querySelector(link.getAttribute("href"));
    if(!target) return;
    e.preventDefault();
    target.scrollIntoView({behavior:"smooth", block:"start"});
  });
});
