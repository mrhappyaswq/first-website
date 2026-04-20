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

// Track mouse over the whole page for the "looking at cursor" effect
  document.addEventListener('mousemove', (e) => {
    const activeImg = carousel.querySelector('.carousel-images img.active');
    if (!activeImg) return;

    // If mouse is directly over the image, do nothing (handled by mouseenter)
    if (activeImg.matches(':hover')) return;

    const rect = activeImg.getBoundingClientRect();

    // Get center of the image
    const imgCenterX = rect.left + rect.width / 2;
    const imgCenterY = rect.top + rect.height / 2;

    // Vector from image center to mouse
    const dx = e.clientX - imgCenterX;
    const dy = e.clientY - imgCenterY;

    // Normalize by screen size so strength is consistent
    const rotateY =  (dx / window.innerWidth)  * 30;
    const rotateX = -(dy / window.innerHeight) * 30;

    activeImg.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1)`;
  });

  // When hovering directly on the image: flat + pop out
  carousel.addEventListener('mouseenter', () => {
    const activeImg = carousel.querySelector('.carousel-images img.active');
    if (!activeImg) return;
    activeImg.style.transform = 'rotateX(0deg) rotateY(0deg) scale(1.05) translateZ(30px)';
  });

  // When leaving the image area: keep tracking mouse (mousemove handles it)
  carousel.addEventListener('mouseleave', () => {
    const activeImg = carousel.querySelector('.carousel-images img.active');
    if (!activeImg) return;
    activeImg.style.transform = 'rotateX(0deg) rotateY(0deg) scale(1)';
  });

});


