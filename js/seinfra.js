// Conteúdo e comportamento exclusivos da página SEINFRA.
// Os textos abaixo pertencem apenas a esta página; ajuste aqui sem afetar as demais secretarias.

const SEINFRA_USUARIOS = [
  { nome: 'Ana Beatriz Santos', perfil: 'Analista', tipo: 'Administrador', status: 'Ativo' },
  { nome: 'Carlos Henrique Lima', perfil: 'Gestor', tipo: 'Coordenador', status: 'Ativo' },
  { nome: 'Mariana Oliveira', perfil: 'Operacional', tipo: 'Analista', status: 'Ativo' }
];

const SEINFRA_DATASETS_BASE = [
  {
    id: "rede-fisica-saude",
    nome: "Rede Física de Saúde",
    descricao: "Dados de unidades, infraestrutura, geolocalização e patrimônio técnico.",
    sistema: "Cadastro da Rede Física",
    secretaria: "SEINFRA",
    periodo: "2021 - 2025",
    atualizacao: "Mensal",
    variaveis: 12,
    formatos: ["CSV", "API", "Qlik"],
    status: "Disponível",
    responsavel: "Mariana Oliveira",
    classificacao: "Interno",
    acesso: "Uso institucional",
    governance: "Rastreabilidade e controle de acesso a infraestrutura",
    regras: "Uso apenas em contexto de gestão e operação de serviços.",
    historico: "Registro consolidado pela área responsável",
    solicitacoes: 4
  }
];

const SEINFRA_DICIONARIO = [
  { termo: "Tipo de Unidade", sistema: "Cadastro da Rede Física", tipo: "Texto", descricao: "Classificação da unidade de saúde conforme a rede física.", atualizacao: "Mensal" }
];

const SEINFRA_CONSULTAS = [
  { nome: "Consulta de unidades", dataset: "Rede Física de Saúde", periodo: "2024", registros: "430", status: "Disponível" }
];

const SEINFRA_STORAGE_KEY = "portal-datasets-SEINFRA";

function seinfraStatusBadge(status) {
  const map = {
    'Disponível': 'pill--green',
    'Restrito': 'pill--orange',
    'Em análise': 'pill--red'
  };
  return `<span class="pill ${map[status] || 'pill--blue'}">${status}</span>`;
}

function seinfraGetDatasets() {
  const drafts = JSON.parse(localStorage.getItem(SEINFRA_STORAGE_KEY) || '[]');
  return [...drafts, ...SEINFRA_DATASETS_BASE];
}

function seinfraRenderStats() {
  const stats = document.querySelector('[data-summary]');
  if (!stats) return;
  const datasets = seinfraGetDatasets();
  stats.innerHTML = `
    <div class="stat-card"><div class="stat-label">Sistemas</div><div class="stat-value">4</div><div class="stat-meta">Unidades vinculadas</div></div>
    <div class="stat-card"><div class="stat-label">Conjuntos</div><div class="stat-value">${datasets.length}</div><div class="stat-meta">Disponíveis e em revisão</div></div>
    <div class="stat-card"><div class="stat-label">Usuários</div><div class="stat-value">${SEINFRA_USUARIOS.length}</div><div class="stat-meta">Perfis ativos</div></div>
    <div class="stat-card"><div class="stat-label">Acesso</div><div class="stat-value">${datasets.filter(item => item.status === 'Disponível').length}</div><div class="stat-meta">Conjuntos liberados</div></div>
  `;
}

function seinfraDatasetCard(item) {
  return `
    <article class="dataset-card">
      <div class="dataset-header">
        <div>
          <h4>${item.nome}</h4>
        </div>
        ${seinfraStatusBadge(item.status)}
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
      ${window.datasetSelectionMarkup(item)}
      <div class="dataset-actions">
        <button class="btn btn-secondary btn-sm" data-open-dataset="${item.id}">Ver conjunto</button>
      </div>
    </article>
  `;
}

function seinfraBindDatasetButtons() {
  document.querySelectorAll('[data-open-dataset]').forEach(button => {
    button.addEventListener('click', () => {
      const id = button.getAttribute('data-open-dataset');
      const dataset = seinfraGetDatasets().find(item => item.id === id);
      if (dataset) seinfraOpenDatasetModal(dataset);
    });
  });
}

function seinfraOpenDatasetModal(dataset) {
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

function seinfraRenderCatalog(datasets) {
  const list = document.querySelector('[data-catalog-list]');
  if (!list) return;
  list.innerHTML = datasets.map(seinfraDatasetCard).join('') || '<div class="info-block"><strong>Nenhum conjunto encontrado</strong><p>Refine os filtros para visualizar outros registros.</p></div>';
  seinfraBindDatasetButtons();
}

function seinfraRenderDictionary() {
  const target = document.querySelector('[data-dictionary-list]');
  if (!target) return;
  target.innerHTML = SEINFRA_DICIONARIO.map(item => `
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

function seinfraRenderConsultas() {
  const consultas = document.querySelector('[data-consultas]');
  if (!consultas) return;
  consultas.innerHTML = SEINFRA_CONSULTAS.map(item => `
    <div class="table-row">
      <div><strong>${item.nome}</strong></div>
      <div>${item.dataset}</div>
      <div>${item.periodo}</div>
      <div>${item.registros}</div>
      <div>${seinfraStatusBadge(item.status)}</div>
    </div>
  `).join('');
}

function seinfraInitFilters() {
  const filterForm = document.querySelector('[data-catalog-filters]');
  if (!filterForm) return;
  const search = filterForm.querySelector('[data-filter-search]');
  const system = filterForm.querySelector('[data-filter-system]');
  const format = filterForm.querySelector('[data-filter-format]');
  const status = filterForm.querySelector('[data-filter-status]');

  const applyFilters = () => {
    const term = (search?.value || '').trim().toLowerCase();
    const systemValue = system?.value || '';
    const formatValue = format?.value || '';
    const statusValue = status?.value || '';
    const datasets = seinfraGetDatasets().filter(item => {
      const matchesText = !term || `${item.nome} ${item.descricao} ${item.sistema} ${item.responsavel}`.toLowerCase().includes(term);
      const matchesSystem = !systemValue || item.sistema === systemValue;
      const matchesFormat = !formatValue || item.formatos.includes(formatValue);
      const matchesStatus = !statusValue || item.status === statusValue;
      return matchesText && matchesSystem && matchesFormat && matchesStatus;
    });
    seinfraRenderCatalog(datasets);
  };

  [search, system, format, status].forEach(el => el && el.addEventListener('input', applyFilters));
  [system, format, status].forEach(el => el && el.addEventListener('change', applyFilters));
}

function seinfraInitUpload() {
  const form = document.getElementById('manual-upload-form');
  if (!form) return;
  const fileInput = form.querySelector('input[type="file"]');
  const fileName = form.querySelector('[data-file-name]');
  const validateBtn = form.querySelector('[data-validate-upload]');
  const processBtn = form.querySelector('[data-process-upload]');
  const status = form.querySelector('[data-upload-status]');
  const columnsInput = form.querySelector('[data-manual-columns]');

  fileInput.addEventListener('change', () => {
    const name = fileInput.files?.[0]?.name || 'arquivo selecionado';
    fileName.textContent = name;
    status.textContent = 'Arquivo identificado e pronto para validação.';
    status.className = 'status-badge warning';
  });

  validateBtn.addEventListener('click', () => {
    status.textContent = 'Arquivo validado com sucesso. Estrutura compatível.';
    status.className = 'status-badge ok';
  });

  processBtn.addEventListener('click', () => {
    const columns = (columnsInput?.value || '').split(',').map(column => column.trim()).filter(Boolean);
    if (!columns.length) {
      status.textContent = 'Informe os títulos das colunas antes de processar.';
      status.className = 'status-badge warning';
      return;
    }
    window.createManualDataset(form, SEINFRA_STORAGE_KEY, columns);
    seinfraRenderStats();
    seinfraRenderCatalog(seinfraGetDatasets());
    status.textContent = 'Carga simulada disponível para uso institucional.';
    status.className = 'status-badge ok';
  });
}

function seinfraInitDatasetBuilder() {
  const form = document.getElementById('dataset-builder');
  if (!form) return;
  const steps = Array.from(form.querySelectorAll('.wizard-step'));
  const indicators = Array.from(form.querySelectorAll('.step-indicator'));
  const nextBtn = form.querySelector('[data-next-step]');
  const prevBtn = form.querySelector('[data-prev-step]');
  const saveBtn = form.querySelector('[data-publish]');
  const summary = document.getElementById('dataset-summary');
  let currentStep = 0;

  const buildSummary = () => {
    const data = new FormData(form);
    return `
      <div class="detail-grid">
        <div class="kv"><div class="kv-label">Nome</div><div class="kv-value">${data.get('datasetNome') || 'Não informado'}</div></div>
        <div class="kv"><div class="kv-label">Sistema</div><div class="kv-value">${data.get('datasetSistema') || "Cadastro da Rede Física"}</div></div>
        <div class="kv field--full"><div class="kv-label">Campos selecionados</div><div class="kv-value">${data.get('listaVariaveis') || 'Não informado'}</div></div>
        <div class="kv"><div class="kv-label">Responsável</div><div class="kv-value">${data.get('datasetResponsavel') || 'Não informado'}</div></div>
        <div class="kv field--full"><div class="kv-label">Descrição</div><div class="kv-value">${data.get('datasetDescricao') || 'Sem descrição'}</div></div>
      </div>
    `;
  };

  const render = () => {
    steps.forEach((step, index) => step.classList.toggle('active', index === currentStep));
    indicators.forEach((indicator, index) => {
      indicator.classList.toggle('active', index === currentStep);
      indicator.classList.toggle('done', index < currentStep);
    });
    prevBtn.disabled = currentStep === 0;
    prevBtn.style.opacity = currentStep === 0 ? '0.6' : '1';
    nextBtn.classList.toggle('hidden', currentStep === steps.length - 1);
    saveBtn.classList.toggle('hidden', currentStep !== steps.length - 1);
    summary.innerHTML = buildSummary();
  };

  nextBtn.addEventListener('click', () => {
    if (currentStep < steps.length - 1) {
      currentStep += 1;
      render();
    }
  });

  prevBtn.addEventListener('click', () => {
    if (currentStep > 0) {
      currentStep -= 1;
      render();
    }
  });

  saveBtn.addEventListener('click', () => {
    const data = new FormData(form);
    const dataset = {
      id: `draft-${Date.now()}`,
      nome: data.get('datasetNome') || 'Novo conjunto',
      descricao: data.get('datasetDescricao') || 'Conjunto criado no protótipo.',
      sistema: data.get('datasetSistema') || "Cadastro da Rede Física",
      secretaria: "SEINFRA",
      periodo: window.getPeriodLabel(form),
      atualizacao: data.get('frequencia') || 'Mensal',
      variaveis: Number(data.get('variaveis') || 5),
      camposSelecionados: window.getDatasetSelection(form),
      formatos: [data.get('formato') || 'CSV'],
      status: 'Disponível',
      responsavel: data.get('datasetResponsavel') || 'Usuário demo',
      classificacao: data.get('classificacao') || 'Interno',
      acesso: data.get('nivelAcesso') || 'Uso institucional',
      governance: data.get('finalidade') || 'Governança local',
      regras: 'Uso de acordo com política institucional.',
      historico: 'Criação simulada em sessão atual',
      solicitacoes: 0
    };

    const existing = JSON.parse(localStorage.getItem(SEINFRA_STORAGE_KEY) || '[]');
    existing.unshift(dataset);
    localStorage.setItem(SEINFRA_STORAGE_KEY, JSON.stringify(existing));
    seinfraRenderStats();
    seinfraRenderCatalog(seinfraGetDatasets());
    if (window.showToast) window.showToast('Conjunto publicado na sessão atual.', 'ok');
    form.reset();
    currentStep = 0;
    render();
  });

  render();
}

function seinfraInitSidebarNavigation() {
  const links = Array.from(document.querySelectorAll('.sidebar .nav-item[href^="#"]'));
  if (!links.length) return;
  const updateActiveLink = () => {
    const currentId = window.location.hash || links[0].getAttribute('href');
    links.forEach(link => link.classList.toggle('active', link.getAttribute('href') === currentId));
  };
  links.forEach(link => link.addEventListener('click', updateActiveLink));
  window.addEventListener('hashchange', updateActiveLink);
  updateActiveLink();
}

document.addEventListener('DOMContentLoaded', () => {
  seinfraRenderStats();
  seinfraRenderCatalog(seinfraGetDatasets());
  seinfraRenderDictionary();
  seinfraRenderConsultas();
  seinfraInitFilters();
  seinfraInitUpload();
  seinfraInitDatasetBuilder();
  seinfraInitSidebarNavigation();
});
