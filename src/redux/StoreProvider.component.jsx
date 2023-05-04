import React from 'react';
import { legacy_createStore as createStore } from 'redux';
// import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import { composeWithDevTools } from 'redux-devtools-extension';

import rootReducer from './root-reducer';

const store = __DEV__ ? createStore(rootReducer, composeWithDevTools()) : createStore(rootReducer);
// const store = configureStore({
//     reducer: rootReducer,
//     devTools: __DEV__ ? composeWithDevTools() : false,
// });

const StoreProvider = ({ children }) => {
    return <Provider store={store}>{children}</Provider>;
};

export default StoreProvider;
