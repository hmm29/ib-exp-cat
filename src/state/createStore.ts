import { createStore } from 'redux';

function reducer(state = {pageIndex: 0}, action) {
    switch (action.type) {
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