export default function decorate(block) {
  const items = [...block.children].map((row) => {
    const [imgCell, captionCell] = row.children;
    const picture = imgCell.querySelector('picture');
    const img = imgCell.querySelector('img');
    const caption = captionCell ? captionCell.textContent.trim() : '';
    return { picture, img, caption };
  });

  const list = document.createElement('ul');
  list.className = 'gallery-list';

  const lightbox = document.createElement('div');
  lightbox.className = 'gallery-lightbox';
  lightbox.innerHTML = `
    <button type="button" class="gallery-lightbox-close" aria-label="Close">&times;</button>
    <button type="button" class="gallery-lightbox-prev" aria-label="Previous image">&lsaquo;</button>
    <figure>
      <img class="gallery-lightbox-img" src="" alt="">
      <figcaption class="gallery-lightbox-caption"></figcaption>
    </figure>
    <button type="button" class="gallery-lightbox-next" aria-label="Next image">&rsaquo;</button>
  `;

  const lightboxImg = lightbox.querySelector('.gallery-lightbox-img');
  const lightboxCaption = lightbox.querySelector('.gallery-lightbox-caption');
  let currentIndex = 0;

  function openLightbox(index) {
    currentIndex = index;
    const { img, caption } = items[currentIndex];
    lightboxImg.src = img.src;
    lightboxImg.alt = img.alt;
    lightboxCaption.textContent = caption;
    lightbox.classList.add('is-open');
  }

  function closeLightbox() {
    lightbox.classList.remove('is-open');
  }

  function showRelative(delta) {
    openLightbox((currentIndex + delta + items.length) % items.length);
  }

  lightbox.querySelector('.gallery-lightbox-close').addEventListener('click', closeLightbox);
  lightbox.querySelector('.gallery-lightbox-prev').addEventListener('click', () => showRelative(-1));
  lightbox.querySelector('.gallery-lightbox-next').addEventListener('click', () => showRelative(1));
  lightbox.addEventListener('click', (event) => {
    if (event.target === lightbox) closeLightbox();
  });
  document.addEventListener('keydown', (event) => {
    if (!lightbox.classList.contains('is-open')) return;
    if (event.key === 'Escape') closeLightbox();
    if (event.key === 'ArrowLeft') showRelative(-1);
    if (event.key === 'ArrowRight') showRelative(1);
  });

  items.forEach(({ picture, img, caption }, index) => {
    const li = document.createElement('li');
    const trigger = document.createElement('button');
    trigger.type = 'button';
    trigger.setAttribute('aria-label', caption || `Open image ${index + 1}`);
    trigger.append(picture || img);
    trigger.addEventListener('click', () => openLightbox(index));
    li.append(trigger);
    list.append(li);
  });

  block.replaceChildren(list, lightbox);
}
