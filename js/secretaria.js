function statusBadge(status) {
  const map = {
    'Disponível': 'pill--green',
    'Restrito': 'pill--orange',
    'Em análise': 'pill--red'
  };
  return `<span class="pill ${map[status] || 'pill--blue'}">${status}</span>`;
}

function getSecretariaData() {
  const key = document.body.dataset.secretaria || 'SEVS';
  return {
    key,
    data: window.SECRETARIAS[key],
    datasets: [...(JSON.parse(localStorage.getItem('portal-datasets') || '[]')).filter(item => item.secretaria === key), ...((window.DATASETS && window.DATASETS[key]) || [])]
  };
}

function renderSecretariaDashboard() {
  const { data, datasets } = getSecretariaData();
  if (!data) return;

  const stats = document.querySelector('[data-summary]');
  if (stats) {
    stats.innerHTML = `
      <div class="stat-card"><div class="stat-label">Sistemas</div><div class="stat-value">${data.sistemas.length}</div><div class="stat-meta">Unidades vinculadas</div></div>
      <div class="stat-card"><div class="stat-label">Conjuntos</div><div class="stat-value">${datasets.length}</div><div class="stat-meta">Disponíveis e em revisão</div></div>
      <div class="stat-card"><div class="stat-label">Usuários</div><div class="stat-value">${window.USUARIOS.length}</div><div class="stat-meta">Perfis ativos</div></div>
      <div class="stat-card"><div class="stat-label">Acesso</div><div class="stat-value">${datasets.filter(item => item.status === 'Disponível').length}</div><div class="stat-meta">Conjuntos liberados</div></div>
    `;
  }

  const sistemas = document.querySelector('[data-sistemas]');
  if (sistemas) {
    sistemas.innerHTML = data.sistemas.map(system => `
      <div class="system-card">
        <div class="sigla">${system.slice(0, 3).toUpperCase()}</div>
        <h3>${system}</h3>
        <p>Dados institucionalizados com governança e rastreabilidade de acesso.</p>
        <span class="pill pill--blue">Sistema</span>
      </div>
    `).join('');
  }

  const catalogList = document.querySelector('[data-catalog-list]');
  if (catalogList) {
    catalogList.innerHTML = datasets.map(item => `
      <article class="dataset-card">
        <div class="dataset-header">
          <div>
            <h4>${item.nome}</h4>
          </div>
          ${statusBadge(item.status)}
        </div>
        <div class="dataset-meta">
          <span class="pill pill--blue">${item.sistema}</span>
          <span class="pill pill--orange">${item.secretaria}</span>
          <span class="pill pill--green">${item.atualizacao}</span>
        </div>
        <p>${item.descricao}</p>
        <div class="dataset-meta">
          <span class="text-muted">Período: ${item.periodo}</span>
          <span class="text-muted">Variáveis: ${item.variaveis}</span>
          <span class="text-muted">Formatos: ${item.formatos.join(' • ')}</span>
        </div>
        <div class="dataset-actions">
          <button class="btn btn-secondary btn-sm" data-open-dataset="${item.id}">Ver conjunto</button>
        </div>
      </article>
    `).join('');
    bindDatasetButtons();
  }

  const dictionaryList = document.querySelector('[data-dictionary-list]');
  if (dictionaryList) {
    const dict = window.DICIONARIO?.[data.sigla] || [];
    dictionaryList.innerHTML = dict.map(item => `
      <div class="info-block">
        <strong>${item.termo}</strong>
        <p>${item.descricao}</p>
        <div class="dataset-meta">
          <span class="pill pill--blue">${item.sistema}</span>
          <span class="pill pill--orange">${item.tipo}</span>
          <span class="pill pill--green">${item.atualizacao}</span>
        </div>
      </div>
    `).join('');
  }

  const consultas = document.querySelector('[data-consultas]');
  if (consultas) {
    consultas.innerHTML = [
      { nome: 'Consulta de indicadores', dataset: 'Doenças e Agravos', periodo: '2024', registros: '3.4M', status: 'Disponível' },
      { nome: 'Acompanhamento de casos', dataset: 'Mortalidade por Causas', periodo: '2024', registros: '780k', status: 'Restrito' },
      { nome: 'Monitoramento de nascimentos', dataset: 'Nascidos Vivos', periodo: '2024', registros: '1.1M', status: 'Disponível' }
    ].map(item => `
      <div class="table-row">
        <div><strong>${item.nome}</strong></div>
        <div>${item.dataset}</div>
        <div>${item.periodo}</div>
        <div>${item.registros}</div>
        <div>${statusBadge(item.status)}</div>
      </div>
    `).join('');
  }

  initFilters();
}

function bindDatasetButtons() {
  document.querySelectorAll('[data-open-dataset]').forEach(button => {
    button.addEventListener('click', () => {
      const id = button.getAttribute('data-open-dataset');
      const dataset = getSecretariaData().datasets.find(item => item.id === id);
      if (dataset) openDatasetModal(dataset);
    });
  });
}

function openDatasetModal(dataset) {
  const modal = document.getElementById('dataset-modal');
  if (!modal) return;
  modal.innerHTML = `
    <div class="modal-panel">
      <div class="modal-head">
        <div>
          <div class="eyebrow">Conjunto de dados</div>
          <h2>${dataset.nome}</h2>
        </div>
        <button class="btn btn-secondary btn-sm" data-modal-close>Fechar</button>
      </div>
      <div class="modal-body">
        <p>${dataset.descricao}</p>
        <div class="detail-grid">
          <div class="kv"><div class="kv-label">Sistema</div><div class="kv-value">${dataset.sistema}</div></div>
          <div class="kv"><div class="kv-label">Secretaria</div><div class="kv-value">${dataset.secretaria}</div></div>
          <div class="kv"><div class="kv-label">Período</div><div class="kv-value">${dataset.periodo}</div></div>
          <div class="kv"><div class="kv-label">Atualização</div><div class="kv-value">${dataset.atualizacao}</div></div>
          <div class="kv"><div class="kv-label">Responsável</div><div class="kv-value">${dataset.responsavel}</div></div>
          <div class="kv"><div class="kv-label">Classificação</div><div class="kv-value">${dataset.classificacao}</div></div>
          <div class="kv"><div class="kv-label">Acesso</div><div class="kv-value">${dataset.acesso}</div></div>
          <div class="kv"><div class="kv-label">Status</div><div class="kv-value">${dataset.status}</div></div>
          <div class="kv"><div class="kv-label">Formatos</div><div class="kv-value">${dataset.formatos.join(', ')}</div></div>
          <div class="kv"><div class="kv-label">Variáveis</div><div class="kv-value">${dataset.variaveis}</div></div>
          <div class="kv field--full"><div class="kv-label">Governança</div><div class="kv-value">${dataset.governance}</div></div>
          <div class="kv field--full"><div class="kv-label">Regras de acesso</div><div class="kv-value">${dataset.regras}</div></div>
        </div>
      </div>
    </div>
  `;
  modal.classList.remove('hidden');
  modal.querySelector('[data-modal-close]').addEventListener('click', () => modal.classList.add('hidden'));
}

function initFilters() {
  const filterForm = document.querySelector('[data-catalog-filters]');
  if (!filterForm) return;
  const search = filterForm.querySelector('[data-filter-search]');
  const system = filterForm.querySelector('[data-filter-system]');
  const format = filterForm.querySelector('[data-filter-format]');
  const status = filterForm.querySelector('[data-filter-status]');
  const list = document.querySelector('[data-catalog-list]');
  if (!list) return;

  const applyFilters = () => {
    const term = (search?.value || '').trim().toLowerCase();
    const systemValue = system?.value || '';
    const formatValue = format?.value || '';
    const statusValue = status?.value || '';
    const datasets = getSecretariaData().datasets.filter(item => {
      const matchesText = !term || `${item.nome} ${item.descricao} ${item.sistema} ${item.responsavel}`.toLowerCase().includes(term);
      const matchesSystem = !systemValue || item.sistema === systemValue;
      const matchesFormat = !formatValue || item.formatos.includes(formatValue);
      const matchesStatus = !statusValue || item.status === statusValue;
      return matchesText && matchesSystem && matchesFormat && matchesStatus;
    });

    list.innerHTML = datasets.map(item => `
      <article class="dataset-card">
        <div class="dataset-header">
          <div>
            <h4>${item.nome}</h4>
          </div>
          ${statusBadge(item.status)}
        </div>
        <div class="dataset-meta">
          <span class="pill pill--blue">${item.sistema}</span>
          <span class="pill pill--orange">${item.secretaria}</span>
          <span class="pill pill--green">${item.atualizacao}</span>
        </div>
        <p>${item.descricao}</p>
        <div class="dataset-meta">
          <span class="text-muted">Período: ${item.periodo}</span>
          <span class="text-muted">Variáveis: ${item.variaveis}</span>
        </div>
        <div class="dataset-actions">
          <button class="btn btn-secondary btn-sm" data-open-dataset="${item.id}">Ver conjunto</button>
        </div>
      </article>
    `).join('') || '<div class="info-block"><strong>Nenhum conjunto encontrado</strong><p>Refine os filtros para visualizar outros registros.</p></div>';
    bindDatasetButtons();
  };

  [search, system, format, status].forEach(el => el && el.addEventListener('input', applyFilters));
  [system, format, status].forEach(el => el && el.addEventListener('change', applyFilters));
}

function reloadCatalog() {
  renderSecretariaDashboard();
}

document.addEventListener('DOMContentLoaded', () => {
  renderSecretariaDashboard();
});
