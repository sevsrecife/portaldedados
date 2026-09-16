window.PortalDatasetBuilder = {
  currentStep: 0,
  steps: ['Identificação', 'Variáveis', 'Período', 'Disponibilização', 'Governança', 'Revisão'],
  init() {
    const form = document.getElementById('dataset-builder');
    if (!form) return;
    const steps = Array.from(form.querySelectorAll('.wizard-step'));
    const indicators = Array.from(form.querySelectorAll('.step-indicator'));
    const nextBtn = form.querySelector('[data-next-step]');
    const prevBtn = form.querySelector('[data-prev-step]');
    const saveBtn = form.querySelector('[data-publish]');
    const summary = document.getElementById('dataset-summary');

    const render = () => {
      steps.forEach((step, index) => step.classList.toggle('active', index === this.currentStep));
      indicators.forEach((indicator, index) => {
        indicator.classList.toggle('active', index === this.currentStep);
        indicator.classList.toggle('done', index < this.currentStep);
      });
      prevBtn.disabled = this.currentStep === 0;
      prevBtn.style.opacity = this.currentStep === 0 ? '0.6' : '1';
      nextBtn.classList.toggle('hidden', this.currentStep === steps.length - 1);
      saveBtn.classList.toggle('hidden', this.currentStep !== steps.length - 1);
      summary.innerHTML = this.buildSummary(form);
    };

    this.buildSummary = (currentForm) => {
      const data = new FormData(currentForm);
      return `
        <div class="detail-grid">
          <div class="kv"><div class="kv-label">Nome</div><div class="kv-value">${data.get('datasetNome') || 'Não informado'}</div></div>
          <div class="kv"><div class="kv-label">Secretaria</div><div class="kv-value">${data.get('datasetSecretaria') || 'SEVS'}</div></div>
          <div class="kv"><div class="kv-label">Sistema</div><div class="kv-value">${data.get('datasetSistema') || 'SINAN'}</div></div>
          <div class="kv"><div class="kv-label">Responsável</div><div class="kv-value">${data.get('datasetResponsavel') || 'Não informado'}</div></div>
          <div class="kv field--full"><div class="kv-label">Descrição</div><div class="kv-value">${data.get('datasetDescricao') || 'Sem descrição'}</div></div>
        </div>
      `;
    };

    nextBtn.addEventListener('click', () => {
      if (this.currentStep < steps.length - 1) {
        this.currentStep += 1;
        render();
      }
    });

    prevBtn.addEventListener('click', () => {
      if (this.currentStep > 0) {
        this.currentStep -= 1;
        render();
      }
    });

    saveBtn.addEventListener('click', () => {
      const secretariaKey = document.body.dataset.secretaria || 'SEVS';
      const data = new FormData(form);
      const dataset = {
        id: `draft-${Date.now()}`,
        nome: data.get('datasetNome') || 'Novo conjunto',
        descricao: data.get('datasetDescricao') || 'Conjunto criado no protótipo.',
        sistema: data.get('datasetSistema') || 'SINAN',
        secretaria: secretariaKey,
        periodo: `${data.get('periodoInicio') || '2025'} - ${data.get('periodoFim') || '2025'}`,
        atualizacao: data.get('frequencia') || 'Mensal',
        variaveis: Number(data.get('variaveis') || 5),
        formatos: [data.get('formato') || 'CSV'],
        status: 'Disponível',
        responsavel: data.get('datasetResponsavel') || 'Usuário demo',
        classificacao: data.get('classificacao') || 'Interno',
        acesso: data.get('nivelAcesso') || 'Uso institucional',
        governance: data.get('finalidade') || 'Governança local',
        regras: 'Uso de acordo com política institucional.',
        historico: 'Publicação simulada em sessão atual',
        solicitacoes: 0
      };

      const existing = JSON.parse(localStorage.getItem('portal-datasets') || '[]');
      existing.unshift(dataset);
      localStorage.setItem('portal-datasets', JSON.stringify(existing));
      if (window.reloadCatalog) window.reloadCatalog();
      showToast('Conjunto publicado na sessão atual.', 'ok');
      form.reset();
      this.currentStep = 0;
      render();
    });

    render();
  }
};

document.addEventListener('DOMContentLoaded', () => {
  window.PortalDatasetBuilder.init();
});
