window.PortalCatalog = {
  init() {
    const datasetList = document.querySelector('[data-catalog-list]');
    if (!datasetList) return;
    datasetList.addEventListener('click', (event) => {
      const target = event.target.closest('[data-open-dataset]');
      if (!target) return;
      const datasetId = target.getAttribute('data-open-dataset');
      const dataset = (window.DATASETS || {})[document.body.dataset.secretaria || 'SEVS']?.find(item => item.id === datasetId);
      if (dataset && window.openDatasetModal) {
        window.openDatasetModal(dataset);
      }
    });
  }
};

document.addEventListener('DOMContentLoaded', () => {
  window.PortalCatalog.init();
});
