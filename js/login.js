(function() {
  const form = document.getElementById('login-form');
  const emailInput = document.getElementById('login-email');
  const error = document.getElementById('login-error');
  if (!form || !emailInput || !error) return;

  const params = new URLSearchParams(window.location.search);
  const requestedEmail = params.get('email');
  const requestedNext = params.get('next') || 'index.html';
  const next = /^[a-z0-9-]+\.html$/i.test(requestedNext) ? requestedNext : 'index.html';
  if (requestedEmail) emailInput.value = requestedEmail;

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const formData = new FormData(form);
    const email = String(formData.get('email') || '').trim();
    const senha = String(formData.get('senha') || '');

    if (!email || senha.length < 4) {
      error.textContent = 'Informe um e-mail válido e uma senha com pelo menos 4 caracteres.';
      error.classList.remove('hidden');
      return;
    }

    sessionStorage.setItem('portal-authenticated', 'true');
    sessionStorage.setItem('portal-user-email', email);
    window.location.href = next;
  });
})();
