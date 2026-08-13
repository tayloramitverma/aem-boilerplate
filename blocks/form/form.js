export default function decorate(block) {
  const fields = [...block.children].map((row) => {
    const [labelCell, typeCell] = row.children;
    return {
      label: labelCell.textContent.trim(),
      type: (typeCell?.textContent.trim().toLowerCase()) || 'text',
    };
  });

  const form = document.createElement('form');
  form.noValidate = true;
  const validators = [];

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

    const error = document.createElement('span');
    error.className = 'form-error';
    error.id = `${id}-error`;
    input.setAttribute('aria-describedby', error.id);

    const validate = () => {
      let message = '';
      if (input.validity.valueMissing) message = `${label} is required.`;
      else if (input.validity.typeMismatch && type === 'email') message = 'Enter a valid email address.';
      error.textContent = message;
      input.classList.toggle('is-invalid', !!message);
      return !message;
    };
    validators.push({ input, validate });

    input.addEventListener('blur', validate);
    input.addEventListener('input', () => {
      if (input.classList.contains('is-invalid')) validate();
    });

    fieldWrapper.append(fieldLabel, input, error);
    form.append(fieldWrapper);
  });

  const submit = document.createElement('button');
  submit.type = 'submit';
  submit.textContent = 'Submit';
  form.append(submit);

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const results = validators.map(({ validate }) => validate());
    if (!results.every(Boolean)) {
      const firstInvalid = validators.find((_, index) => !results[index]);
      firstInvalid?.input.focus();
      return;
    }
    block.innerHTML = '<p class="form-success">Thank you! Your submission has been received.</p>';
  });

  block.textContent = '';
  block.append(form);
}
