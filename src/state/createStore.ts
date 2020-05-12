import { createStore } from 'redux';

function reducer(state = {catalogMode: 'experts', pageIndex: 0}, action) {
    switch (action.type) {
      case 'CATALOG_MODE_UPDATE':
        return Object.assign({}, state, {
          catalogMode: action.catalogMode,
        });
      case 'PAGE_INDEX_UPDATE':
        return Object.assign({}, state, {
          pageIndex: action.pageIndex,
        });
      default:
        return state;
    }
}

export default preloadedState => {
  return createStore(reducer, preloadedState);
};