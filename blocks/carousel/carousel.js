export default function decorate(block) {
  const rows = [...block.children];
  const slideCount = rows.length;

  const track = document.createElement('div');
  track.className = 'carousel-track';
  rows.forEach((row) => {
    const slide = document.createElement('div');
    slide.className = 'carousel-slide';
    while (row.firstElementChild) slide.append(row.firstElementChild);
    track.append(slide);
  });

  const prevButton = document.createElement('button');
  prevButton.type = 'button';
  prevButton.className = 'carousel-prev';
  prevButton.setAttribute('aria-label', 'Previous slide');
  prevButton.textContent = '‹';

  const nextButton = document.createElement('button');
  nextButton.type = 'button';
  nextButton.className = 'carousel-next';
  nextButton.setAttribute('aria-label', 'Next slide');
  nextButton.textContent = '›';

  const dots = document.createElement('div');
  dots.className = 'carousel-dots';
  const dotButtons = rows.map((row, index) => {
    const dot = document.createElement('button');
    dot.type = 'button';
    dot.className = 'carousel-dot';
    dot.setAttribute('aria-label', `Go to slide ${index + 1}`);
    dots.append(dot);
    return dot;
  });

  let currentIndex = 0;

  function goTo(index) {
    currentIndex = (index + slideCount) % slideCount;
    track.style.transform = `translateX(-${currentIndex * 100}%)`;
    dotButtons.forEach((dot, i) => dot.classList.toggle('is-active', i === currentIndex));
  }

  let timer;
  function stopAutoplay() {
    clearInterval(timer);
  }
  function startAutoplay() {
    timer = setInterval(() => goTo(currentIndex + 1), 5000);
  }

  prevButton.addEventListener('click', () => goTo(currentIndex - 1));
  nextButton.addEventListener('click', () => goTo(currentIndex + 1));
  dotButtons.forEach((dot, index) => dot.addEventListener('click', () => goTo(index)));
  block.addEventListener('mouseenter', stopAutoplay);
  block.addEventListener('mouseleave', startAutoplay);
  block.addEventListener('focusin', stopAutoplay);
  block.addEventListener('focusout', startAutoplay);

  block.replaceChildren(track, prevButton, nextButton, dots);
  goTo(0);
  startAutoplay();
}
