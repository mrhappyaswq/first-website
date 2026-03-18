// Set current year in footer
document.getElementById('year').textContent = new Date().getFullYear();

const images = document.querySelectorAll('.carousel-images img');
const prevBtn = document.querySelector('.prev');
const nextBtn = document.querySelector('.next');
let current = 0;

function showImage(index) {
  images.forEach((img, i) => img.classList.remove('active'));
  images[index].classList.add('active');
}

prevBtn.addEventListener('click', () => {
  current = (current - 1 + images.length) % images.length;
  showImage(current);
});

nextBtn.addEventListener('click', () => {
  current = (current + 1) % images.length;
  showImage(current);
});

// Initialize
showImage(current);


const dotsContainer = document.querySelector('.carousel-dots');

// Create dots
images.forEach((_, index) => {
  const dot = document.createElement('span');
  if (index === current) dot.classList.add('active');
  dot.addEventListener('click', () => {
    current = index;
    showImage(current);
    updateDots();
  });
  dotsContainer.appendChild(dot);
});

function updateDots() {
  const dots = document.querySelectorAll('.carousel-dots span');
  dots.forEach(dot => dot.classList.remove('active'));
  dots[current].classList.add('active');
}

// Update dots on prev/next
prevBtn.addEventListener('click', () => {
  current = (current - 1 + images.length) % images.length;
  showImage(current);
  updateDots();
});

nextBtn.addEventListener('click', () => {
  current = (current + 1) % images.length;
  showImage(current);
  updateDots();
});
