document.addEventListener('DOMContentLoaded', () => {
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  const navLinks = document.querySelectorAll('.nav-link');
  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPath || (currentPath === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });

  const toggle = document.querySelector('[data-nav-toggle]');
  const nav = document.querySelector('.nav-links');
  if (toggle && nav) {
    toggle.addEventListener('click', () => {
      nav.classList.toggle('mobile-open');
    });
  }

  document.querySelectorAll('[data-modal-close]').forEach(button => {
    button.addEventListener('click', () => {
      const modal = button.closest('.modal');
      if (modal) modal.classList.add('hidden');
    });
  });
});

window.showToast = function(message, variant = 'ok') {
  const root = document.getElementById('toast');
  if (!root) return;
  root.className = `status-badge ${variant === 'warning' ? 'warning' : 'ok'}`;
  root.textContent = message;
  root.classList.remove('hidden');
  clearTimeout(window.toastTimer);
  window.toastTimer = setTimeout(() => root.classList.add('hidden'), 2200);
};
