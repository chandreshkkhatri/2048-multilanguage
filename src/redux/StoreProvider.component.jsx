import React from 'react';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';

import rootReducer from './root-reducer';

const store = configureStore({
    reducer: rootReducer,
    devTools: __DEV__,
});

const StoreProvider = ({ children }) => {
    return <Provider store={store}>{children}</Provider>;
};

export default StoreProvider;
