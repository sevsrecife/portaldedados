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
  const legacySimFields = Array.from(form.querySelectorAll('[data-sim-fields]'));
  const standardVariables = Array.from(form.querySelectorAll('[data-standard-variables]'));
  const configuredFields = form.querySelector('[data-configured-system-fields]');
  const validationMessage = form.querySelector('[data-step-validation]');
  const datasetRules = {
    SIM: {
      groups: [
        { title: 'Selecione o tipo de data', name: 'simTipoData', mode: 'single', options: ['Data de Cadastro', 'Data do Óbito'] },
        { title: 'Escolha as opções para gerar o conjunto de dados', name: 'simTipoConjunto', mode: 'single', options: ['DO', 'DO + Óbito Materno', 'DO + Óbito Infantil'] },
        { title: 'Selecione as dimensões do conjunto de dados', name: 'simDimensoes', mode: 'multiple', options: ['Bairro', 'Logradouro', 'Município', 'Cartório', 'Regional', 'Estabelecimento de Saúde', 'Distrito'] }
      ],
      dependentGroups: [
        { parentValue: 'DO + Óbito Materno', title: 'Tipo de informação sobre óbito materno', name: 'simObitoMaterno', options: ['Óbitos maternos declarados', 'Óbitos de mulher em idade fértil totais'] },
        { parentValue: 'DO + Óbito Infantil', title: 'Tipo de óbito infantil', name: 'simObitoInfantil', options: ['Óbitos fetais', 'Óbitos neonatais precoces — 0 a 6 dias', 'Óbitos neonatais tardios — 7 a 27 dias', 'Óbitos pós-neonatais — 28 a 364 dias', 'Óbitos infantis com idade ignorada — código 400', 'Todos os óbitos infantis — soma dos filtros 2 + 3 + 4 + 5', 'Óbitos de crianças de 1 a 4 anos de idade', 'Todos os óbitos — soma dos filtros 1 + 2 + 3 + 4 + 5 + 7'] }
      ]
    },
    SINASC: {
      groups: [
        { title: 'Selecione o tipo de data', name: 'sinascTipoData', mode: 'single', options: ['Data de Cadastro', 'Data do Nascimento'] },
        { title: 'Escolha as opções para gerar o conjunto de dados', name: 'sinascVariaveis', mode: 'multiple', options: ['DN', 'Bairro', 'Cartório', 'Logradouro', 'Município', 'Estabelecimento de Saúde', 'Distrito', 'Regional'] }
      ],
      dependentGroups: []
    }
  };
  let currentStep = 0;

  const renderControlGroup = ({ title, name, mode, options }) => {
    const controlType = mode === 'single' ? 'radio' : 'checkbox';
    const controls = options.map((option, index) => {
      const id = `${name}-${index}`;
      return `<label class="check-card" for="${id}"><input id="${id}" type="${controlType}" name="${name}" value="${option}" /><span>${option}</span></label>`;
    }).join('');
    return `
      <div class="field field--full selection-group" role="group" aria-labelledby="${name}-title">
        <div class="form-section-title" id="${name}-title">${title}</div>
        <div class="checkbox-grid">${controls}</div>
      </div>
    `;
  };

  const renderConfiguredFields = system => {
    const rules = datasetRules[system];
    if (!rules) return '';
    const groups = rules.groups.map(renderControlGroup).join('');
    const dependentGroups = rules.dependentGroups.map(group => `
      <div class="field--full hidden" data-dependent-field="${group.parentValue}">
        ${renderControlGroup({ ...group, mode: 'single' })}
      </div>
    `).join('');
    return groups + dependentGroups;
  };

  const clearValidation = () => {
    validationMessage.textContent = '';
    validationMessage.classList.add('hidden');
  };

  const updateDependentFields = () => {
    const selectedType = form.querySelector('[name="simTipoConjunto"]:checked')?.value;
    configuredFields.querySelectorAll('[data-dependent-field]').forEach(field => {
      const isActive = field.dataset.dependentField === selectedType;
      field.classList.toggle('hidden', !isActive);
      field.querySelectorAll('input').forEach(input => {
        if (!isActive) input.checked = false;
        input.disabled = !isActive;
      });
    });
  };

  const updateSpecialSystemFields = () => {
    const isSinan = systemSelect?.value === 'SINAN';
    const isConfiguredSystem = Boolean(datasetRules[systemSelect?.value]);
    sinanFields.forEach(field => {
      field.classList.toggle('hidden', !isSinan);
      field.querySelectorAll('select, input').forEach(input => {
        input.disabled = !isSinan;
      });
    });
    legacySimFields.forEach(field => {
      field.classList.add('hidden');
      field.querySelectorAll('select, input').forEach(input => {
        input.disabled = true;
      });
    });
    standardVariables.forEach(field => {
      field.classList.toggle('hidden', isSinan || isConfiguredSystem);
      field.querySelectorAll('select, input').forEach(input => {
        input.disabled = isSinan || isConfiguredSystem;
      });
    });
    configuredFields.innerHTML = renderConfiguredFields(systemSelect?.value);
    configuredFields.classList.toggle('hidden', !isConfiguredSystem);
    updateDependentFields();
    clearValidation();
  };

  const buildSummary = () => {
    const data = new FormData(form);
    const system = data.get('datasetSistema');
    const selectedVariables = data.getAll('variaveisSinan');
    const selectedAgravos = data.getAll('agravos');
    const selectedStandardField = [data.get('listaVariaveis')].filter(Boolean);
    const fieldMarkup = (label, value) => `<div class="kv"><div class="kv-label">${label}</div><div class="kv-value">${value || 'Não informado'}</div></div>`;
    let selectionMarkup;

    if (system === 'SIM') {
      const datasetType = data.get('simTipoConjunto');
      const maternalFilter = datasetType === 'DO + Óbito Materno' ? data.get('simObitoMaterno') : '';
      const infantFilter = datasetType === 'DO + Óbito Infantil' ? data.get('simObitoInfantil') : '';
      selectionMarkup = `
        ${fieldMarkup('Tipo de data', data.get('simTipoData'))}
        ${fieldMarkup('Tipo de conjunto', datasetType)}
        ${maternalFilter ? fieldMarkup('Filtro de óbito materno', maternalFilter) : ''}
        ${infantFilter ? fieldMarkup('Filtro de óbito infantil', infantFilter) : ''}
        <div class="kv field--full"><div class="kv-label">Dimensões</div><div class="kv-value">${data.getAll('simDimensoes').join(', ') || 'Nenhuma dimensão selecionada'}</div></div>
      `;
    } else if (system === 'SINASC') {
      selectionMarkup = `
        ${fieldMarkup('Tipo de data', data.get('sinascTipoData'))}
        <div class="kv field--full"><div class="kv-label">Variáveis</div><div class="kv-value">${data.getAll('sinascVariaveis').join(', ') || 'Nenhuma variável selecionada'}</div></div>
      `;
    } else {
      const fields = selectedVariables.length ? selectedVariables : selectedStandardField;
      selectionMarkup = `<div class="kv field--full"><div class="kv-label">Campos selecionados</div><div class="kv-value">${fields.join(', ') || 'Não informado'}</div></div>`;
    }

    return `
      <div class="detail-grid">
        <div class="kv"><div class="kv-label">Nome</div><div class="kv-value">${data.get('datasetNome') || 'Não informado'}</div></div>
        <div class="kv"><div class="kv-label">Sistema</div><div class="kv-value">${system || 'SINAN'}</div></div>
        ${selectionMarkup}
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

  const validateCurrentStep = () => {
    if (currentStep !== 1) return true;
    const data = new FormData(form);
    const system = data.get('datasetSistema');
    let message = '';

    if (system === 'SIM' || system === 'SINASC') {
      if (!data.get(system === 'SIM' ? 'simTipoData' : 'sinascTipoData')) {
        message = 'Selecione o tipo de data para continuar.';
      } else if (system === 'SIM' && !data.get('simTipoConjunto')) {
        message = 'Selecione o tipo de conjunto de dados para continuar.';
      } else if (system === 'SIM' && data.get('simTipoConjunto') === 'DO + Óbito Materno' && !data.get('simObitoMaterno')) {
        message = 'Selecione uma opção de óbito materno para continuar.';
      } else if (system === 'SIM' && data.get('simTipoConjunto') === 'DO + Óbito Infantil' && !data.get('simObitoInfantil')) {
        message = 'Selecione uma opção de óbito infantil para continuar.';
      }
    }

    validationMessage.textContent = message;
    validationMessage.classList.toggle('hidden', !message);
    return !message;
  };

  systemSelect?.addEventListener('change', () => {
    updateSpecialSystemFields();
    summary.innerHTML = buildSummary();
  });
  form.addEventListener('change', event => {
    if (event.target.name === 'simTipoConjunto') updateDependentFields();
    clearValidation();
    summary.innerHTML = buildSummary();
  });
  nextBtn.addEventListener('click', () => {
    if (currentStep < steps.length - 1) {
      if (!validateCurrentStep()) return;
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
    const system = data.get('datasetSistema') || 'SINAN';
    const isConfiguredSystem = Boolean(datasetRules[system]);
    const selectedFields = system === 'SIM'
      ? data.getAll('simDimensoes')
      : system === 'SINASC'
        ? data.getAll('sinascVariaveis')
        : window.getDatasetSelection(form);
    const systemConfiguration = system === 'SIM'
      ? {
          tipoData: data.get('simTipoData') || '',
          tipoConjunto: data.get('simTipoConjunto') || '',
          filtroObitoMaterno: data.get('simObitoMaterno') || '',
          filtroObitoInfantil: data.get('simObitoInfantil') || '',
          dimensoes: data.getAll('simDimensoes')
        }
      : system === 'SINASC'
        ? { tipoData: data.get('sinascTipoData') || '', variaveis: data.getAll('sinascVariaveis') }
        : null;
    const dataset = {
      id: `draft-${Date.now()}`,
      nome: data.get('datasetNome') || 'Novo conjunto',
      descricao: data.get('datasetDescricao') || 'Conjunto criado no protótipo.',
      sistema: system,
      secretaria: 'SEVS',
      periodo: window.getPeriodLabel(form),
      atualizacao: data.get('frequencia') || 'Mensal',
      variaveis: isConfiguredSystem ? selectedFields.length : data.getAll('variaveisSinan').length || Number(data.get('variaveis') || 5),
      agravos: data.getAll('agravos'),
      variaveisSelecionadas: system === 'SINASC' ? data.getAll('sinascVariaveis') : data.getAll('variaveisSinan'),
      camposSelecionados: selectedFields,
      configuracao: systemConfiguration,
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
