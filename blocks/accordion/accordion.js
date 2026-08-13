export default function decorate(block) {
  [...block.children].forEach((row) => {
    // each row = one accordion item: column 1 = label, column 2 = body
    const [summary, body] = row.children;
    row.classList.add('accordion-item');
    summary.classList.add('accordion-item-label');
    body.classList.add('accordion-item-body');

    summary.addEventListener('click', () => {
      const isOpen = row.classList.contains('is-open');
      block.querySelectorAll('.accordion-item.is-open').forEach((el) => el.classList.remove('is-open'));
      if (!isOpen) row.classList.add('is-open');
    });
  });
}