export default function decorate(block) {
  block.innerHTML = `<p>👋 Hello block is alive! Original text: "${block.textContent.trim()}"</p>`;
}