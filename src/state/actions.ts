export const updateCatalogModeInStateAction = catalogMode => {
  return {
    type: 'CATALOG_MODE_UPDATE',
    catalogMode
  }
}

export const updateExpertSearchTextInStateAction = expertSearchText => {
  return {
    type: 'EXPERT_SEARCH_TEXT_UPDATE',
    expertSearchText
  }
}

export const updatePageIndexInStateAction = pageIndex => {
  return {
    type: 'PAGE_INDEX_UPDATE',
    pageIndex
  };
}

export const updateSearchResultCountInStateAction = searchResultCount => {
  return {
    type: 'SEARCH_RESULT_COUNT_UPDATE',
    searchResultCount
  }
}