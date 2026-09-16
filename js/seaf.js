// Conteúdo e comportamento exclusivos da página SEAF.
// Os textos abaixo pertencem apenas a esta página; ajuste aqui sem afetar as demais secretarias.

const SEAF_USUARIOS = [
  { nome: 'Ana Beatriz Santos', perfil: 'Analista', tipo: 'Administrador', status: 'Ativo' },
  { nome: 'Carlos Henrique Lima', perfil: 'Gestor', tipo: 'Coordenador', status: 'Ativo' },
  { nome: 'Mariana Oliveira', perfil: 'Operacional', tipo: 'Analista', status: 'Ativo' }
];

const SEAF_DATASETS_BASE = [
  {
    id: "siaf-medicamentos",
    nome: "Medicamentos e Estoque",
    descricao: "Dados de dispensação, remanejamento e logística de medicamentos.",
    sistema: "SIAF",
    secretaria: "SEAF",
    periodo: "2022 - 2025",
    atualizacao: "Mensal",
    variaveis: 8,
    formatos: ["CSV", "XLS"],
    status: "Disponível",
    responsavel: "Mariana Oliveira",
    classificacao: "Interno",
    acesso: "Uso institucional",
    governance: "Classificação e utilização responsável",
    regras: "Acesso dependente de perfil autorizado.",
    historico: "Registro consolidado pela área responsável",
    solicitacoes: 6
  },
  {
    id: "prodesp-contratos",
    nome: "Contratos e Compras",
    descricao: "Fluxo de aquisição, contratos e abastecimento farmacêutico.",
    sistema: "Prodesp",
    secretaria: "SEAF",
    periodo: "2021 - 2025",
    atualizacao: "Mensal",
    variaveis: 13,
    formatos: ["CSV", "API", "Qlik"],
    status: "Em análise",
    responsavel: "Carlos Henrique Lima",
    classificacao: "Restrito",
    acesso: "Autorização administrativa",
    governance: "Rastreio e validação por governança da área",
    regras: "Uso restrito a finalidades operacionais e de gestão.",
    historico: "Registro consolidado pela área responsável",
    solicitacoes: 1
  }
];

const SEAF_DICIONARIO = [
  { termo: "Dispensa de Medicamento", sistema: "SIAF", tipo: "Número", descricao: "Quantidade dispensada para o paciente ou unidade.", atualizacao: "Mensal" },
  { termo: "Contratado", sistema: "Prodesp", tipo: "Texto", descricao: "Identificação do fornecedor ou contrato vinculado ao item.", atualizacao: "Mensal" }
];

const SEAF_CONSULTAS = [
  { nome: "Consulta de estoque", dataset: "Medicamentos e Estoque", periodo: "2024", registros: "610k", status: "Disponível" },
  { nome: "Acompanhamento de contratos", dataset: "Contratos e Compras", periodo: "2024", registros: "320k", status: "Em análise" }
];

const SEAF_STORAGE_KEY = "portal-datasets-SEAF";

function seafStatusBadge(status) {
  const map = {
    'Disponível': 'pill--green',
    'Restrito': 'pill--orange',
    'Em análise': 'pill--red'
  };
  return `<span class="pill ${map[status] || 'pill--blue'}">${status}</span>`;
}

function seafGetDatasets() {
  const drafts = JSON.parse(localStorage.getItem(SEAF_STORAGE_KEY) || '[]');
  return [...drafts, ...SEAF_DATASETS_BASE];
}

function seafRenderStats() {
  const stats = document.querySelector('[data-summary]');
  if (!stats) return;
  const datasets = seafGetDatasets();
  stats.innerHTML = `
    <div class="stat-card"><div class="stat-label">Sistemas</div><div class="stat-value">4</div><div class="stat-meta">Unidades vinculadas</div></div>
    <div class="stat-card"><div class="stat-label">Conjuntos</div><div class="stat-value">${datasets.length}</div><div class="stat-meta">Disponíveis e em revisão</div></div>
    <div class="stat-card"><div class="stat-label">Usuários</div><div class="stat-value">${SEAF_USUARIOS.length}</div><div class="stat-meta">Perfis ativos</div></div>
    <div class="stat-card"><div class="stat-label">Acesso</div><div class="stat-value">${datasets.filter(item => item.status === 'Disponível').length}</div><div class="stat-meta">Conjuntos liberados</div></div>
  `;
}

function seafDatasetCard(item) {
  return `
    <article class="dataset-card">
      <div class="dataset-header">
        <div>
          <h4>${item.nome}</h4>
        </div>
        ${seafStatusBadge(item.status)}
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

function seafBindDatasetButtons() {
  document.querySelectorAll('[data-open-dataset]').forEach(button => {
    button.addEventListener('click', () => {
      const id = button.getAttribute('data-open-dataset');
      const dataset = seafGetDatasets().find(item => item.id === id);
      if (dataset) seafOpenDatasetModal(dataset);
    });
  });
}

function seafOpenDatasetModal(dataset) {
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

function seafRenderCatalog(datasets) {
  const list = document.querySelector('[data-catalog-list]');
  if (!list) return;
  list.innerHTML = datasets.map(seafDatasetCard).join('') || '<div class="info-block"><strong>Nenhum conjunto encontrado</strong><p>Refine os filtros para visualizar outros registros.</p></div>';
  seafBindDatasetButtons();
}

function seafRenderDictionary() {
  const target = document.querySelector('[data-dictionary-list]');
  if (!target) return;
  target.innerHTML = SEAF_DICIONARIO.map(item => `
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

function seafRenderConsultas() {
  const consultas = document.querySelector('[data-consultas]');
  if (!consultas) return;
  consultas.innerHTML = SEAF_CONSULTAS.map(item => `
    <div class="table-row">
      <div><strong>${item.nome}</strong></div>
      <div>${item.dataset}</div>
      <div>${item.periodo}</div>
      <div>${item.registros}</div>
      <div>${seafStatusBadge(item.status)}</div>
    </div>
  `).join('');
}

function seafInitFilters() {
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
    const datasets = seafGetDatasets().filter(item => {
      const matchesText = !term || `${item.nome} ${item.descricao} ${item.sistema} ${item.responsavel}`.toLowerCase().includes(term);
      const matchesSystem = !systemValue || item.sistema === systemValue;
      const matchesFormat = !formatValue || item.formatos.includes(formatValue);
      const matchesStatus = !statusValue || item.status === statusValue;
      return matchesText && matchesSystem && matchesFormat && matchesStatus;
    });
    seafRenderCatalog(datasets);
  };

  [search, system, format, status].forEach(el => el && el.addEventListener('input', applyFilters));
  [system, format, status].forEach(el => el && el.addEventListener('change', applyFilters));
}

function seafInitUpload() {
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
    window.createManualDataset(form, SEAF_STORAGE_KEY, columns);
    seafRenderStats();
    seafRenderCatalog(seafGetDatasets());
    status.textContent = 'Carga simulada disponível para uso institucional.';
    status.className = 'status-badge ok';
  });
}

function seafInitDatasetBuilder() {
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
        <div class="kv"><div class="kv-label">Sistema</div><div class="kv-value">${data.get('datasetSistema') || "SIAF"}</div></div>
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
      sistema: data.get('datasetSistema') || "SIAF",
      secretaria: "SEAF",
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

    const existing = JSON.parse(localStorage.getItem(SEAF_STORAGE_KEY) || '[]');
    existing.unshift(dataset);
    localStorage.setItem(SEAF_STORAGE_KEY, JSON.stringify(existing));
    seafRenderStats();
    seafRenderCatalog(seafGetDatasets());
    if (window.showToast) window.showToast('Conjunto publicado na sessão atual.', 'ok');
    form.reset();
    currentStep = 0;
    render();
  });

  render();
}

function seafInitSidebarNavigation() {
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
  seafRenderStats();
  seafRenderCatalog(seafGetDatasets());
  seafRenderDictionary();
  seafRenderConsultas();
  seafInitFilters();
  seafInitUpload();
  seafInitDatasetBuilder();
  seafInitSidebarNavigation();
});
