// Conteúdo e comportamento exclusivos da página SEVS.
// Os textos abaixo pertencem apenas a esta página; ajuste aqui sem afetar as demais secretarias.

const SEVS_USUARIOS = [
  { nome: 'Ana Beatriz Santos', perfil: 'Analista', tipo: 'Administrador', status: 'Ativo' },
  { nome: 'Carlos Henrique Lima', perfil: 'Gestor', tipo: 'Coordenador', status: 'Ativo' },
  { nome: 'Mariana Oliveira', perfil: 'Operacional', tipo: 'Analista', status: 'Ativo' }
];

const SEVS_DATASETS_BASE = [
  {
    id: 'sinan-doencas-agravos',
    nome: 'Doenças e Agravos Notificáveis',
    descricao: 'Conjunto epidemiológico com indicadores principais de notificação, evolução e desfechos.',
    sistema: 'SINAN',
    secretaria: 'SEVS',
    periodo: '2020 - 2025',
    atualizacao: 'Mensal',
    variaveis: 12,
    formatos: ['CSV', 'API', 'Power BI'],
    status: 'Disponível',
    responsavel: 'Ana Beatriz Santos',
    classificacao: 'Restrito',
    acesso: 'Perfil institucional',
    governance: 'Acesso controlado conforme finalidade e LGPD',
    regras: 'Acesso somente para atuação institucional. Uso por perfil autorizado.',
    historico: 'Publicação mensal com revisão de qualidade',
    solicitacoes: 4
  },
  {
    id: 'sim-mortalidade',
    nome: 'Mortalidade por Causas',
    descricao: 'Indicadores de óbitos por causa básica, faixa etária e município de residência.',
    sistema: 'SIM',
    secretaria: 'SEVS',
    periodo: '2018 - 2025',
    atualizacao: 'Mensal',
    variaveis: 9,
    formatos: ['CSV', 'XLS', 'API'],
    status: 'Restrito',
    responsavel: 'Carlos Henrique Lima',
    classificacao: 'Confidencial',
    acesso: 'Autorização por demanda',
    governance: 'Revisão pela coordenação de vigilância',
    regras: 'Necessário termo de uso e justificativa de finalidade.',
    historico: 'Dados consolidados após validação setorial',
    solicitacoes: 2
  },
  {
    id: 'sinasc-nascidos-vivos',
    nome: 'Nascidos Vivos',
    descricao: 'Conjunto de nascimento, indicadores de parto, mãe e recém-nascido.',
    sistema: 'SINASC',
    secretaria: 'SEVS',
    periodo: '2019 - 2025',
    atualizacao: 'Mensal',
    variaveis: 15,
    formatos: ['CSV', 'Power BI'],
    status: 'Disponível',
    responsavel: 'Mariana Oliveira',
    classificacao: 'Interno',
    acesso: 'Uso institucional',
    governance: 'Governança local e rastreabilidade de acesso',
    regras: 'Uso restrito à rotina de monitoramento e gestão de saúde.',
    historico: 'Atualizações conforme calendário de carga',
    solicitacoes: 7
  },
  {
    id: 'redcap-pesquisas',
    nome: 'Formulários REDCap',
    descricao: 'Dados de projetos de pesquisa e monitoramento institucional apoiados em formulários eletrônicos.',
    sistema: 'REDCap',
    secretaria: 'SEVS',
    periodo: '2023 - 2025',
    atualizacao: 'Semanal',
    variaveis: 18,
    formatos: ['CSV', 'API', 'Qlik'],
    status: 'Em análise',
    responsavel: 'Ana Beatriz Santos',
    classificacao: 'Interno',
    acesso: 'Autorização da área responsável',
    governance: 'Validação de adequação para publicação',
    regras: 'Publicação condicionada à revisão de finalidade.',
    historico: 'Em processo de padronização de campos e egressos',
    solicitacoes: 1
  }
];

const SEVS_CONSULTAS = [
  { nome: 'Consulta de indicadores', dataset: 'Doenças e Agravos', periodo: '2024', registros: '3.4M', status: 'Disponível' },
  { nome: 'Acompanhamento de casos', dataset: 'Mortalidade por Causas', periodo: '2024', registros: '780k', status: 'Restrito' },
  { nome: 'Monitoramento de nascimentos', dataset: 'Nascidos Vivos', periodo: '2024', registros: '1.1M', status: 'Disponível' }
];

const SEVS_STORAGE_KEY = 'portal-datasets-SEVS';

function sevsStatusBadge(status) {
  const map = {
    'Disponível': 'pill--green',
    'Restrito': 'pill--orange',
    'Em análise': 'pill--red'
  };
  return `<span class="pill ${map[status] || 'pill--blue'}">${status}</span>`;
}

function sevsGetDatasets() {
  const drafts = JSON.parse(localStorage.getItem(SEVS_STORAGE_KEY) || '[]');
  return [...drafts, ...SEVS_DATASETS_BASE];
}

function sevsRenderStats() {
  const stats = document.querySelector('[data-summary]');
  if (!stats) return;
  const datasets = sevsGetDatasets();
  stats.innerHTML = `
    <div class="stat-card"><div class="stat-label">Sistemas</div><div class="stat-value">4</div><div class="stat-meta">Unidades vinculadas</div></div>
    <div class="stat-card"><div class="stat-label">Conjuntos</div><div class="stat-value">${datasets.length}</div><div class="stat-meta">Disponíveis e em revisão</div></div>
    <div class="stat-card"><div class="stat-label">Usuários</div><div class="stat-value">${SEVS_USUARIOS.length}</div><div class="stat-meta">Perfis ativos</div></div>
    <div class="stat-card"><div class="stat-label">Acesso</div><div class="stat-value">${datasets.filter(item => item.status === 'Disponível').length}</div><div class="stat-meta">Conjuntos liberados</div></div>
  `;
}

function sevsDatasetCard(item) {
  return `
    <article class="dataset-card">
      <div class="dataset-header">
        <div>
          <h4>${item.nome}</h4>
        </div>
        ${sevsStatusBadge(item.status)}
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

function sevsBindDatasetButtons() {
  document.querySelectorAll('[data-open-dataset]').forEach(button => {
    button.addEventListener('click', () => {
      const id = button.getAttribute('data-open-dataset');
      const dataset = sevsGetDatasets().find(item => item.id === id);
      if (dataset) sevsOpenDatasetModal(dataset);
    });
  });
}

function sevsOpenDatasetModal(dataset) {
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

function sevsRenderCatalog(datasets) {
  const list = document.querySelector('[data-catalog-list]');
  if (!list) return;
  list.innerHTML = datasets.map(sevsDatasetCard).join('') || '<div class="info-block"><strong>Nenhum conjunto encontrado</strong><p>Refine os filtros para visualizar outros registros.</p></div>';
  sevsBindDatasetButtons();
}

function sevsRenderConsultas() {
  const consultas = document.querySelector('[data-consultas]');
  if (!consultas) return;
  consultas.innerHTML = SEVS_CONSULTAS.map(item => `
    <div class="table-row">
      <div><strong>${item.nome}</strong></div>
      <div>${item.dataset}</div>
      <div>${item.periodo}</div>
      <div>${item.registros}</div>
      <div>${sevsStatusBadge(item.status)}</div>
    </div>
  `).join('');
}

function sevsInitFilters() {
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
    const datasets = sevsGetDatasets().filter(item => {
      const matchesText = !term || `${item.nome} ${item.descricao} ${item.sistema} ${item.responsavel}`.toLowerCase().includes(term);
      const matchesSystem = !systemValue || item.sistema === systemValue;
      const matchesFormat = !formatValue || item.formatos.includes(formatValue);
      const matchesStatus = !statusValue || item.status === statusValue;
      return matchesText && matchesSystem && matchesFormat && matchesStatus;
    });
    sevsRenderCatalog(datasets);
  };

  [search, system, format, status].forEach(el => el && el.addEventListener('input', applyFilters));
  [system, format, status].forEach(el => el && el.addEventListener('change', applyFilters));
}

function sevsInitSidebarNavigation() {
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

function sevsInitUpload() {
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

    window.createManualDataset(form, SEVS_STORAGE_KEY, columns);
    sevsRenderStats();
    sevsRenderCatalog(sevsGetDatasets());
    status.textContent = 'Carga simulada disponível para uso institucional.';
    status.className = 'status-badge ok';
  });
}

function sevsInitDatasetBuilder() {
  const form = document.getElementById('dataset-builder');
  if (!form) return;
  const steps = Array.from(form.querySelectorAll('.wizard-step'));
  const indicators = Array.from(form.querySelectorAll('.step-indicator'));
  const nextBtn = form.querySelector('[data-next-step]');
  const prevBtn = form.querySelector('[data-prev-step]');
  const saveBtn = form.querySelector('[data-publish]');
  const summary = document.getElementById('dataset-summary');
  const systemSelect = form.querySelector('[name="datasetSistema"]');
  const sinanFields = Array.from(form.querySelectorAll('[data-sinan-fields]'));
  const simFields = Array.from(form.querySelectorAll('[data-sim-fields]'));
  const standardVariables = Array.from(form.querySelectorAll('[data-standard-variables]'));
  let currentStep = 0;

  const updateSpecialSystemFields = () => {
    const isSinan = systemSelect?.value === 'SINAN';
    const isSim = systemSelect?.value === 'SIM';
    sinanFields.forEach(field => {
      field.classList.toggle('hidden', !isSinan);
      field.querySelectorAll('select, input').forEach(input => {
        input.disabled = !isSinan;
      });
    });
    simFields.forEach(field => {
      field.classList.toggle('hidden', !isSim);
      field.querySelectorAll('select, input').forEach(input => {
        input.disabled = !isSim;
      });
    });
    standardVariables.forEach(field => {
      field.classList.toggle('hidden', isSinan || isSim);
      field.querySelectorAll('select, input').forEach(input => {
        input.disabled = isSinan || isSim;
      });
    });
  };

  const buildSummary = () => {
    const data = new FormData(form);
    const selectedVariables = data.getAll('variaveisSinan');
    const selectedAgravos = data.getAll('agravos');
    const selectedSimFields = Array.from(form.querySelectorAll('[data-sim-fields] input, [data-sim-fields] select'))
      .map(input => {
        const value = data.get(input.name);
        if (!value) return '';
        const label = form.querySelector(`label[for="${input.id}"]`)?.textContent || input.name;
        return `${label}: ${value}`;
      })
      .filter(Boolean);
    const selectedFields = selectedVariables.length
      ? selectedVariables
      : selectedSimFields.length
        ? selectedSimFields
        : [data.get('listaVariaveis')].filter(Boolean);
    return `
      <div class="detail-grid">
        <div class="kv"><div class="kv-label">Nome</div><div class="kv-value">${data.get('datasetNome') || 'Não informado'}</div></div>
        <div class="kv"><div class="kv-label">Sistema</div><div class="kv-value">${data.get('datasetSistema') || 'SINAN'}</div></div>
        <div class="kv field--full"><div class="kv-label">Campos selecionados</div><div class="kv-value">${selectedFields.join(', ') || 'Não informado'}</div></div>
        ${selectedAgravos.length ? `<div class="kv field--full"><div class="kv-label">Agravos selecionados</div><div class="kv-value">${selectedAgravos.join(', ')}</div></div>` : ''}
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

  systemSelect?.addEventListener('change', updateSpecialSystemFields);
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
      sistema: data.get('datasetSistema') || 'SINAN',
      secretaria: 'SEVS',
      periodo: window.getPeriodLabel(form),
      atualizacao: data.get('frequencia') || 'Mensal',
      variaveis: data.getAll('variaveisSinan').length || Number(data.get('variaveis') || 5),
      agravos: data.getAll('agravos'),
      variaveisSelecionadas: data.getAll('variaveisSinan'),
      camposSelecionados: window.getDatasetSelection(form),
      filtrosSim: {
        anoInicio: data.get('anoObitoInicio') || '',
        anoFim: data.get('anoObitoFim') || '',
        uf: data.get('ufObito') || '',
        municipio: data.get('municipioObito') || '',
        regional: data.get('regionalSaude') || '',
        capituloCid: data.get('capituloCid') || '',
        grupoCid: data.get('grupoCid') || '',
        causaBasica: data.get('causaBasica') || '',
        sexo: data.get('sexoObito') || '',
        faixaEtaria: data.get('faixaEtariaObito') || '',
        racaCor: data.get('racaCorObito') || '',
        localOcorrencia: data.get('localOcorrencia') || '',
        tipoObito: data.get('tipoObito') || ''
      },
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

    const existing = JSON.parse(localStorage.getItem(SEVS_STORAGE_KEY) || '[]');
    existing.unshift(dataset);
    localStorage.setItem(SEVS_STORAGE_KEY, JSON.stringify(existing));
    sevsRenderStats();
    sevsRenderCatalog(sevsGetDatasets());
    if (window.showToast) window.showToast('Conjunto publicado na sessão atual.', 'ok');
    form.reset();
    currentStep = 0;
    updateSpecialSystemFields();
    render();
  });

  updateSpecialSystemFields();
  render();
}

document.addEventListener('DOMContentLoaded', () => {
  sevsRenderStats();
  sevsRenderCatalog(sevsGetDatasets());
  sevsRenderConsultas();
  sevsInitFilters();
  sevsInitUpload();
  sevsInitDatasetBuilder();
  sevsInitSidebarNavigation();
});
