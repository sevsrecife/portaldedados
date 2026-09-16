window.PortalDictionary = {
  init() {
    const target = document.querySelector('[data-dictionary-list]');
    if (!target) return;
    const key = document.body.dataset.secretaria || 'SEVS';
    const items = window.DICIONARIO?.[key] || [];
    target.innerHTML = items.map(item => `
      <div class="info-block">
        <strong>${item.termo}</strong>
        <p>${item.descricao}</p>
        <div class="dataset-meta">
          <span class="pill pill--blue">${item.sistema}</span>
          <span class="pill pill--orange">${item.tipo}</span>
          <span class="pill pill--green">${item.atualizacao}</span>
        </div>
      </div>
    `).join('') || '<div class="info-block"><strong>Sem registros</strong><p>Não há itens disponíveis.</p></div>';
  }
};

document.addEventListener('DOMContentLoaded', () => {
  window.PortalDictionary.init();
});
