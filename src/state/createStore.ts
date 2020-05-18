import { createStore } from 'redux';

const initialState = {catalogMode: "services", pageIndex: 0};

function reducer(state = initialState, action) {
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