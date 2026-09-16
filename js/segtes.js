// Conteúdo e comportamento exclusivos da página SEGTES.
// Os textos abaixo pertencem apenas a esta página; ajuste aqui sem afetar as demais secretarias.

const SEGTES_USUARIOS = [
  { nome: 'Ana Beatriz Santos', perfil: 'Analista', tipo: 'Administrador', status: 'Ativo' },
  { nome: 'Carlos Henrique Lima', perfil: 'Gestor', tipo: 'Coordenador', status: 'Ativo' },
  { nome: 'Mariana Oliveira', perfil: 'Operacional', tipo: 'Analista', status: 'Ativo' }
];

const SEGTES_DATASETS_BASE = [
  {
    id: "forca-trabalho-saude",
    nome: "Gestão da Força de Trabalho",
    descricao: "Perfil dos profissionais, categorias e indicadores de força de trabalho.",
    sistema: "Gestão da Força de Trabalho",
    secretaria: "SEGTES",
    periodo: "2022 - 2025",
    atualizacao: "Mensal",
    variaveis: 14,
    formatos: ["CSV", "Power BI"],
    status: "Disponível",
    responsavel: "Carlos Henrique Lima",
    classificacao: "Interno",
    acesso: "Uso institucional",
    governance: "Acesso controlado por perfil de gestão",
    regras: "Necessário justificar uso para ações de recursos humanos.",
    historico: "Registro consolidado pela área responsável",
    solicitacoes: 5
  }
];

const SEGTES_DICIONARIO = [
  { termo: "Categoria Profissional", sistema: "Gestão da Força de Trabalho", tipo: "Texto", descricao: "Categoria profissional do quadro de saúde em atuação.", atualizacao: "Mensal" }
];

const SEGTES_CONSULTAS = [
  { nome: "Consulta de força de trabalho", dataset: "Gestão da Força de Trabalho", periodo: "2024", registros: "85k", status: "Disponível" }
];

const SEGTES_STORAGE_KEY = "portal-datasets-SEGTES";

function segtesStatusBadge(status) {
  const map = {
    'Disponível': 'pill--green',
    'Restrito': 'pill--orange',
    'Em análise': 'pill--red'
  };
  return `<span class="pill ${map[status] || 'pill--blue'}">${status}</span>`;
}

function segtesGetDatasets() {
  const drafts = JSON.parse(localStorage.getItem(SEGTES_STORAGE_KEY) || '[]');
  return [...drafts, ...SEGTES_DATASETS_BASE];
}

function segtesRenderStats() {
  const stats = document.querySelector('[data-summary]');
  if (!stats) return;
  const datasets = segtesGetDatasets();
  stats.innerHTML = `
    <div class="stat-card"><div class="stat-label">Sistemas</div><div class="stat-value">3</div><div class="stat-meta">Unidades vinculadas</div></div>
    <div class="stat-card"><div class="stat-label">Conjuntos</div><div class="stat-value">${datasets.length}</div><div class="stat-meta">Disponíveis e em revisão</div></div>
    <div class="stat-card"><div class="stat-label">Usuários</div><div class="stat-value">${SEGTES_USUARIOS.length}</div><div class="stat-meta">Perfis ativos</div></div>
    <div class="stat-card"><div class="stat-label">Acesso</div><div class="stat-value">${datasets.filter(item => item.status === 'Disponível').length}</div><div class="stat-meta">Conjuntos liberados</div></div>
  `;
}

function segtesDatasetCard(item) {
  return `
    <article class="dataset-card">
      <div class="dataset-header">
        <div>
          <h4>${item.nome}</h4>
        </div>
        ${segtesStatusBadge(item.status)}
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

function segtesBindDatasetButtons() {
  document.querySelectorAll('[data-open-dataset]').forEach(button => {
    button.addEventListener('click', () => {
      const id = button.getAttribute('data-open-dataset');
      const dataset = segtesGetDatasets().find(item => item.id === id);
      if (dataset) segtesOpenDatasetModal(dataset);
    });
  });
}

function segtesOpenDatasetModal(dataset) {
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

function segtesRenderCatalog(datasets) {
  const list = document.querySelector('[data-catalog-list]');
  if (!list) return;
  list.innerHTML = datasets.map(segtesDatasetCard).join('') || '<div class="info-block"><strong>Nenhum conjunto encontrado</strong><p>Refine os filtros para visualizar outros registros.</p></div>';
  segtesBindDatasetButtons();
}

function segtesRenderDictionary() {
  const target = document.querySelector('[data-dictionary-list]');
  if (!target) return;
  target.innerHTML = SEGTES_DICIONARIO.map(item => `
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

function segtesRenderConsultas() {
  const consultas = document.querySelector('[data-consultas]');
  if (!consultas) return;
  consultas.innerHTML = SEGTES_CONSULTAS.map(item => `
    <div class="table-row">
      <div><strong>${item.nome}</strong></div>
      <div>${item.dataset}</div>
      <div>${item.periodo}</div>
      <div>${item.registros}</div>
      <div>${segtesStatusBadge(item.status)}</div>
    </div>
  `).join('');
}

function segtesInitFilters() {
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
    const datasets = segtesGetDatasets().filter(item => {
      const matchesText = !term || `${item.nome} ${item.descricao} ${item.sistema} ${item.responsavel}`.toLowerCase().includes(term);
      const matchesSystem = !systemValue || item.sistema === systemValue;
      const matchesFormat = !formatValue || item.formatos.includes(formatValue);
      const matchesStatus = !statusValue || item.status === statusValue;
      return matchesText && matchesSystem && matchesFormat && matchesStatus;
    });
    segtesRenderCatalog(datasets);
  };

  [search, system, format, status].forEach(el => el && el.addEventListener('input', applyFilters));
  [system, format, status].forEach(el => el && el.addEventListener('change', applyFilters));
}

function segtesInitUpload() {
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
    window.createManualDataset(form, SEGTES_STORAGE_KEY, columns);
    segtesRenderStats();
    segtesRenderCatalog(segtesGetDatasets());
    status.textContent = 'Carga simulada disponível para uso institucional.';
    status.className = 'status-badge ok';
  });
}

function segtesInitDatasetBuilder() {
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
        <div class="kv"><div class="kv-label">Sistema</div><div class="kv-value">${data.get('datasetSistema') || "Gestão da Força de Trabalho"}</div></div>
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
      sistema: data.get('datasetSistema') || "Gestão da Força de Trabalho",
      secretaria: "SEGTES",
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

    const existing = JSON.parse(localStorage.getItem(SEGTES_STORAGE_KEY) || '[]');
    existing.unshift(dataset);
    localStorage.setItem(SEGTES_STORAGE_KEY, JSON.stringify(existing));
    segtesRenderStats();
    segtesRenderCatalog(segtesGetDatasets());
    if (window.showToast) window.showToast('Conjunto publicado na sessão atual.', 'ok');
    form.reset();
    currentStep = 0;
    render();
  });

  render();
}

function segtesInitSidebarNavigation() {
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
  segtesRenderStats();
  segtesRenderCatalog(segtesGetDatasets());
  segtesRenderDictionary();
  segtesRenderConsultas();
  segtesInitFilters();
  segtesInitUpload();
  segtesInitDatasetBuilder();
  segtesInitSidebarNavigation();
});
