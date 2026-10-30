document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('contactForm');
  const successCard = document.getElementById('successMessage');
  const resetBtn = document.getElementById('resetBtn');

  // Máscara básica para telefone
  const phoneInput = document.getElementById('phone');
  phoneInput.addEventListener('input', (e) => {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length > 11) value = value.slice(0, 11);

    if (value.length > 10) {
      value = value.replace(/^(\d{2})(\d{5})(\d{4})$/, '($1) $2-$3');
    } else if (value.length > 5) {
      value = value.replace(/^(\d{2})(\d{4})(\d{0,4})$/, '($1) $2-$3');
    } else if (value.length > 2) {
      value = value.replace(/^(\d{2})(\d{0,5})$/, '($1) $2');
    }
    e.target.value = value;
  });

  // Limpa mensagens de erro ao digitar/mudar
  const inputs = form.querySelectorAll('input, select, textarea');
  inputs.forEach((input) => {
    input.addEventListener('input', () => clearError(input));
    input.addEventListener('change', () => clearError(input));
  });

  function clearError(input) {
    input.classList.remove('invalid');
    const errorEl = document.getElementById(`${input.id}Error`);
    if (errorEl) errorEl.textContent = '';
  }

  function setError(input, message) {
    input.classList.add('invalid');
    const errorEl = document.getElementById(`${input.id}Error`);
    if (errorEl) errorEl.textContent = message;
  }

  function validateForm() {
    let isValid = true;

    // Nome
    const name = document.getElementById('name');
    if (!name.value.trim()) {
      setError(name, 'Por favor, informe seu nome completo.');
      isValid = false;
    } else if (name.value.trim().length < 3) {
      setError(name, 'O nome deve ter pelo menos 3 caracteres.');
      isValid = false;
    }

    // E-mail
    const email = document.getElementById('email');
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.value.trim()) {
      setError(email, 'Por favor, informe seu e-mail.');
      isValid = false;
    } else if (!emailRegex.test(email.value.trim())) {
      setError(email, 'Insira um e-mail válido.');
      isValid = false;
    }

    // Assunto
    const subject = document.getElementById('subject');
    if (!subject.value) {
      setError(subject, 'Selecione um assunto.');
      isValid = false;
    }

    // Mensagem
    const message = document.getElementById('message');
    if (!message.value.trim()) {
      setError(message, 'Por favor, digite sua mensagem.');
      isValid = false;
    } else if (message.value.trim().length < 10) {
      setError(message, 'A mensagem deve conter pelo menos 10 caracteres.');
      isValid = false;
    }

    // Termos
    const terms = document.getElementById('terms');
    if (!terms.checked) {
      setError(terms, 'Você deve concordar com os termos para prosseguir.');
      isValid = false;
    }

    return isValid;
  }

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    if (validateForm()) {
      // Coleta dos dados do formulário
      const formData = new FormData(form);
      const data = Object.fromEntries(formData.entries());
      console.log('Dados enviados:', data);

      // Transição visual de sucesso
      form.hidden = true;
      successCard.hidden = false;
    }
  });

  resetBtn.addEventListener('click', () => {
    form.reset();
    inputs.forEach(clearError);
    form.hidden = false;
    successCard.hidden = true;
  });
});
