export default function decorate(block) {
  const variant = block.classList[1] !== 'block' ? block.classList[1] : null;
  block.id = `modal-${variant || 'default'}`;

  const content = document.createElement('div');
  content.className = 'modal-content';
  while (block.firstElementChild) content.append(block.firstElementChild);

  const closeButton = document.createElement('button');
  closeButton.type = 'button';
  closeButton.className = 'modal-close';
  closeButton.setAttribute('aria-label', 'Close');
  closeButton.textContent = '×';
  content.prepend(closeButton);

  block.append(content);

  function open() {
    block.classList.add('is-open');
    document.body.classList.add('modal-open');
  }

  function close() {
    block.classList.remove('is-open');
    document.body.classList.remove('modal-open');
  }

  closeButton.addEventListener('click', close);
  block.addEventListener('click', (event) => {
    if (event.target === block) close();
  });
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && block.classList.contains('is-open')) close();
  });
  document.addEventListener('click', (event) => {
    const trigger = event.target.closest('a[href]');
    if (!trigger) return;
    let hash = '';
    try {
      hash = new URL(trigger.href, window.location.href).hash;
    } catch {
      // ignore malformed href
    }
    if (hash === `#${block.id}`) {
      event.preventDefault();
      open();
    }
  });
}
