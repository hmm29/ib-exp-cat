import React from 'react';
import { Provider } from 'react-redux';

import createStore from './src/state/createStore';

const preloadedState = {pageIndex: 0};

const store = createStore(preloadedState);

export const wrapRootElement = ({ element }) => {
  return (
    <Provider store={store}>{element}</Provider>
  );
}