// Set current year in footer
document.getElementById('year').textContent = new Date().getFullYear();

// Initialize each carousel independently
document.querySelectorAll('.carousel').forEach(carousel => {
  const images = carousel.querySelectorAll('.carousel-images img');
  const prevBtn = carousel.querySelector('.prev');
  const nextBtn = carousel.querySelector('.next');
  const dotsContainer = carousel.querySelector('.carousel-dots');
  let current = 0;

  // Create dots
  images.forEach((_, index) => {
    const dot = document.createElement('span');
    if (index === 0) dot.classList.add('active');
    dot.addEventListener('click', () => {
      current = index;
      showImage(current);
      updateDots();
    });
    dotsContainer.appendChild(dot);
  });

  function showImage(index) {
    images.forEach(img => img.classList.remove('active'));
    images[index].classList.add('active');
  }

  function updateDots() {
    const dots = dotsContainer.querySelectorAll('span');
    dots.forEach(dot => dot.classList.remove('active'));
    dots[current].classList.add('active');
  }

  nextBtn.addEventListener('click', () => {
    current = (current + 1) % images.length;
    showImage(current);
    updateDots();
  });

  prevBtn.addEventListener('click', () => {
    current = (current - 1 + images.length) % images.length;
    showImage(current);
    updateDots();
  });

  showImage(current);
});

// Mouse tilt effect
carousel.addEventListener('mousemove', (e) => {
  const activeImg = carousel.querySelector('.carousel-images img.active');
  if (!activeImg) return;

  const rect = carousel.getBoundingClientRect();

  const x = (e.clientX - rect.left) / rect.width - 0.5;
  const y = (e.clientY - rect.top) / rect.height - 0.5;

  const rotateY = x * 10;   // adjust strength here
  const rotateX = -y * 10;

  activeImg.style.transform = `
    rotateX(${rotateX}deg)
    rotateY(${rotateY}deg)
    scale(1.03)
  `;
});

// Mouse Rotations
carousel.addEventListener('mouseleave', () => {
  const activeImg = carousel.querySelector('.carousel-images img.active');
  if (!activeImg) return;

  activeImg.style.transform = 'rotateX(0deg) rotateY(0deg) scale(1)';
});

