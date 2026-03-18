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
