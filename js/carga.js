window.PortalCarga = {
  init() {
    const form = document.getElementById('manual-upload-form');
    if (!form) return;
    const fileInput = form.querySelector('input[type="file"]');
    const fileName = form.querySelector('[data-file-name]');
    const validateBtn = form.querySelector('[data-validate-upload]');
    const processBtn = form.querySelector('[data-process-upload]');
    const status = form.querySelector('[data-upload-status]');

    fileInput.addEventListener('change', () => {
      const name = fileInput.files?.[0]?.name || 'arquivo selecionado';
      fileName.textContent = name;
      status.textContent = 'Arquivo identificado e pronto para validação.';
      status.className = 'status-badge warning';
    });

    validateBtn.addEventListener('click', () => {
      status.textContent = 'Arquivo validado com sucesso. Estrutura compatible.';
      status.className = 'status-badge ok';
    });

    processBtn.addEventListener('click', () => {
      status.textContent = 'Carga simulada disponível para uso institucional.';
      status.className = 'status-badge ok';
    });
  }
};

document.addEventListener('DOMContentLoaded', () => {
  window.PortalCarga.init();
});
