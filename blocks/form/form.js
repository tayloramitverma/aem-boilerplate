export default function decorate(block) {
  const fields = [...block.children].map((row) => {
    const [labelCell, typeCell] = row.children;
    return {
      label: labelCell.textContent.trim(),
      type: (typeCell?.textContent.trim().toLowerCase()) || 'text',
    };
  });

  const form = document.createElement('form');

  fields.forEach(({ label, type }) => {
    const id = label.toLowerCase().replace(/[^a-z0-9]+/g, '-');

    const fieldWrapper = document.createElement('div');
    fieldWrapper.className = 'form-field';

    const fieldLabel = document.createElement('label');
    fieldLabel.setAttribute('for', id);
    fieldLabel.textContent = label;

    const input = document.createElement('input');
    input.type = type;
    input.id = id;
    input.name = id;
    input.required = true;

    fieldWrapper.append(fieldLabel, input);
    form.append(fieldWrapper);
  });

  const submit = document.createElement('button');
  submit.type = 'submit';
  submit.textContent = 'Submit';
  form.append(submit);

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    block.innerHTML = '<p>Thank you! Your submission has been received.</p>';
  });

  block.textContent = '';
  block.append(form);
}
