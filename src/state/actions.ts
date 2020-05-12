export const updateCatalogModeInStateAction = catalogMode => {
  return {
    type: 'CATALOG_MODE_UPDATE',
    catalogMode
  }
}

export const updatePageIndexInStateAction = pageIndex => {
  return {
    type: 'PAGE_INDEX_UPDATE',
    pageIndex
  };
}