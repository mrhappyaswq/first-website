// Set current year in footer
document.getElementById('year').textContent = new Date().getFullYear();

// Initialize each carousel independently
document.querySelectorAll('.carousel').forEach(carousel => {
  const images = carousel.querySelectorAll('.carousel-images img');
  const prevBtn = carousel.querySelector('.prev');
  const nextBtn = carousel.querySelector('.next');
  const dotsContainer = carousel.querySelector('.carousel-dots');
  let current = 0;
  let mouseOverCarousel = false;

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

  // Track whether mouse is over the carousel
  carousel.addEventListener('mouseenter', () => {
    mouseOverCarousel = true;
  });

  carousel.addEventListener('mouseleave', () => {
    mouseOverCarousel = false;
    // Reset to neutral when mouse leaves carousel
    const activeImg = carousel.querySelector('.carousel-images img.active');
    if (activeImg) {
      activeImg.style.transform = 'rotateX(0deg) rotateY(0deg) scale(1)';
    }
  });

  // Global mouse tracking — always fires
  document.addEventListener('mousemove', (e) => {
    const activeImg = carousel.querySelector('.carousel-images img.active');
    if (!activeImg) return;

    if (mouseOverCarousel) {
      // Mouse is ON the carousel: pop out, no rotation
      activeImg.style.transform = 'rotateX(0deg) rotateY(0deg) scale(1.06) translateZ(30px)';
    } else {
      // Mouse is anywhere else on the page: rotate to face it
      const rect = activeImg.getBoundingClientRect();
      const imgCenterX = rect.left + rect.width / 2;
      const imgCenterY = rect.top + rect.height / 2;

      const dx = e.clientX - imgCenterX;
      const dy = e.clientY - imgCenterY;

      // Normalize so rotation strength doesn't depend on screen size
      const rotateY =  (dx / window.innerWidth)  * 30;
      const rotateX = -(dy / window.innerHeight) * 30;

      activeImg.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1)`;
    }
  });
});
