export default function decorate(block) {
  const cell = block.querySelector(':scope > div > div');
  const content = document.createElement('div');
  content.className = 'cta-content';
  while (cell.firstElementChild) content.append(cell.firstElementChild);
  block.replaceChildren(content);
}
