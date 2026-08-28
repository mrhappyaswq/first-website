const projects = {
  drone: { index: "01", icon: "✣", type: "ROBOTICS · 2026", title: "Autonomous<br>Drone", description: "A placeholder for the short, compelling story behind this project: the problem, the breakthrough, and what you learned along the way.", role: "Design + Engineering", tools: "CAD, C++, Electronics" },
  synth: { index: "02", icon: "⌁", type: "MUSIC TECH · 2025", title: "Pocket<br>Synth", description: "Add the story of a tiny instrument with a big personality. This space can hold the project challenge, your design process, and the final result.", role: "Product + Interaction", tools: "PCB Design, Arduino, Audio" },
  arm: { index: "03", icon: "⌇", type: "SOFT ROBOTICS · 2025", title: "Soft Robotic<br>Arm", description: "Use this area to explain how the project moves, what inspired its unusual construction, and the iterations that made it work.", role: "Research + Prototyping", tools: "Silicone, Pneumatics, CAD" },
  light: { index: "04", icon: "✦", type: "KINETIC ART · 2024", title: "Kinetic<br>Light", description: "A placeholder for the story behind a responsive light sculpture—part mechanism, part atmosphere, and part experiment.", role: "Creative Technology", tools: "Motors, Fabrication, Code" }
};

const body = document.body;
const panel = document.querySelector("#project-panel");
const panelFields = {
  index: document.querySelector("#panel-index"), icon: document.querySelector("#panel-icon"), type: document.querySelector("#panel-type"),
  title: document.querySelector("#panel-title"), description: document.querySelector("#panel-description"), role: document.querySelector("#panel-role"), tools: document.querySelector("#panel-tools")
};

function openProject(key) {
  const project = projects[key];
  if (!project) return;
  panelFields.index.textContent = `PROJECT / ${project.index}`;
  panelFields.icon.textContent = project.icon;
  panelFields.type.textContent = project.type;
  panelFields.title.innerHTML = project.title;
  panelFields.description.textContent = project.description;
  panelFields.role.textContent = project.role;
  panelFields.tools.textContent = project.tools;
  body.classList.add("panel-open");
  panel.setAttribute("aria-hidden", "false");
  panel.classList.remove("is-exploded");
  requestAnimationFrame(() => setTimeout(() => panel.classList.add("is-exploded"), 180));
  setTimeout(() => document.querySelector(".panel-close").focus(), 500);
}

function closePanel() {
  body.classList.remove("panel-open");
  panel.setAttribute("aria-hidden", "true");
  panel.classList.remove("is-exploded");
}

document.querySelectorAll(".project-node").forEach(node => node.addEventListener("click", () => openProject(node.dataset.project)));
document.querySelectorAll("[data-close-panel]").forEach(button => button.addEventListener("click", closePanel));
document.addEventListener("keydown", event => { if (event.key === "Escape") closePanel(); });

// Slowly carry the project nodes around a true elliptical path. Interaction pauses
// the orbit so the selected node is easy to click, while reduced-motion users get
// the same layout without continuous movement.
const projectNodes = [...document.querySelectorAll(".project-node")];
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
let orbitPaused = false;
let orbitClock = 0;
let previousFrame = performance.now();

projectNodes.forEach(node => {
  node.addEventListener("mouseenter", () => { orbitPaused = true; });
  node.addEventListener("mouseleave", () => { orbitPaused = false; });
  node.addEventListener("focus", () => { orbitPaused = true; });
  node.addEventListener("blur", () => { orbitPaused = false; });
});

function animateOrbit(now) {
  const delta = Math.min(now - previousFrame, 40);
  previousFrame = now;
  if (!orbitPaused && !body.classList.contains("panel-open") && !reduceMotion.matches) orbitClock += delta;

  projectNodes.forEach((node, index) => {
    const angle = (index / projectNodes.length) * Math.PI * 2 + orbitClock * 0.000075;
    node.style.setProperty("--x", `${50 + Math.cos(angle) * 38}%`);
    node.style.setProperty("--y", `${51 + Math.sin(angle) * 29}%`);
  });
  requestAnimationFrame(animateOrbit);
}
requestAnimationFrame(animateOrbit);

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => { if (entry.isIntersecting) { entry.target.classList.add("visible"); observer.unobserve(entry.target); } });
}, { threshold: .14 });
document.querySelectorAll(".reveal").forEach(element => observer.observe(element));

const glow = document.querySelector(".cursor-glow");
window.addEventListener("pointermove", event => {
  glow.style.left = `${event.clientX}px`;
  glow.style.top = `${event.clientY}px`;
});

window.addEventListener("scroll", () => {
  const offset = window.scrollY;
  document.querySelector(".orbit-one").style.transform = `rotate(${-12 + offset * .012}deg)`;
  document.querySelector(".orbit-two").style.transform = `rotate(${35 - offset * .009}deg)`;
}, { passive: true });

document.querySelector("#year").textContent = new Date().getFullYear();
