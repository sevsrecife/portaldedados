const protectedPage = document.body?.dataset.secretaria;
if (protectedPage && sessionStorage.getItem('portal-authenticated') !== 'true') {
  const destination = `${window.location.pathname.split('/').pop() || 'index.html'}${window.location.search}`;
  window.location.replace(`login.html?next=${encodeURIComponent(destination)}`);
}

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

function initPeriodFilter(form) {
  const mode = form.querySelector('[name="periodoModo"]');
  const currentDateField = form.querySelector('[data-periodo-atual]');
  if (!mode || !currentDateField) return;

  const update = () => {
    const isFromYear = mode.value === 'a-partir';
    const field = currentDateField.closest('.field');
    if (field) field.classList.toggle('hidden', !isFromYear);
    currentDateField.disabled = !isFromYear;
    if (isFromYear) {
      currentDateField.value = new Date().toISOString().slice(0, 10);
    }
  };

  mode.addEventListener('change', update);
  update();
}

window.getPeriodLabel = function(form) {
  const data = new FormData(form);
  const start = data.get('periodoInicio') || 'Não informado';
  if (data.get('periodoModo') === 'a-partir') {
    return `${start} - ${data.get('periodoFim') || new Date().toISOString().slice(0, 10)}`;
  }
  return String(start);
};

window.getDatasetSelection = function(form) {
  const data = new FormData(form);
  const sinanFields = data.getAll('variaveisSinan');
  if (sinanFields.length) return sinanFields;

  const simFields = Array.from(form.querySelectorAll('[data-sim-fields] input, [data-sim-fields] select'))
    .map(input => {
      const value = data.get(input.name);
      if (!value) return '';
      const label = form.querySelector(`label[for="${input.id}"]`)?.textContent || input.name;
      return `${label}: ${value}`;
    })
    .filter(Boolean);
  if (simFields.length) return simFields;

  return [data.get('listaVariaveis')].filter(Boolean);
};

window.datasetSelectionMarkup = function(item) {
  const columns = item.colunas || [];
  const fields = item.camposSelecionados || item.variaveisSelecionadas || [];
  const agravos = item.agravos || [];
  const values = columns.length
    ? [`Colunas: ${columns.join(', ')}`]
    : [...(fields.length ? [`Campos: ${fields.join(', ')}`] : []), ...(agravos.length ? [`Agravos: ${agravos.join(', ')}`] : [])];
  if (!values.length) return '';
  return `<div class="dataset-selection"><strong>${item.tipo === 'manual' ? 'Títulos das colunas' : 'Dados selecionados'}</strong><span>${values.join(' • ')}</span></div>`;
};

window.createManualDataset = function(form, storageKey, columns) {
  const fileName = form.querySelector('[data-file-name]')?.textContent.replace(/^Arquivo selecionado:\s*/, '').trim();
  const dataset = {
    id: `manual-${Date.now()}`,
    nome: fileName && fileName !== 'nenhum' ? fileName : 'Carga manual',
    descricao: 'Conjunto criado a partir de uma carga manual.',
    sistema: 'Carga manual',
    secretaria: document.body.dataset.secretaria || 'SEVS',
    periodo: 'Não informado',
    atualizacao: 'Manual',
    variaveis: columns.length,
    camposSelecionados: columns,
    colunas: columns,
    tipo: 'manual',
    formatos: ['Arquivo'],
    status: 'Disponível',
    responsavel: 'Usuário demo',
    classificacao: 'Interno',
    acesso: 'Uso institucional',
    governance: 'Carga manual registrada no protótipo.',
    regras: 'Uso de acordo com política institucional.',
    historico: 'Carga manual simulada em sessão atual',
    solicitacoes: 0
  };
  const existing = JSON.parse(localStorage.getItem(storageKey) || '[]');
  existing.unshift(dataset);
  localStorage.setItem(storageKey, JSON.stringify(existing));
  return dataset;
};

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('[data-period-filter]').forEach(initPeriodFilter);
});
