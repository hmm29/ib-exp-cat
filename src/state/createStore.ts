import { createStore } from 'redux';

const initialState = {catalogMode: "experts", expertSearchText: "", pageIndex: 0, searchResultCount: 0};

function reducer(state = initialState, action) {
    switch (action.type) {
      case 'CATALOG_MODE_UPDATE':
        return Object.assign({}, state, {
          catalogMode: action.catalogMode,
        });
      case 'EXPERT_SEARCH_TEXT_UPDATE':
        return Object.assign({}, state, {
          expertSearchText: action.expertSearchText,
        });
      case 'PAGE_INDEX_UPDATE':
        return Object.assign({}, state, {
          pageIndex: action.pageIndex,
        });
      case 'SEARCH_RESULT_COUNT_UPDATE':
        return Object.assign({}, state, {
          searchResultCount: action.searchResultCount,
        });
      default:
        return state;
    }
}

export default preloadedState => {
  return createStore(reducer, preloadedState);
};