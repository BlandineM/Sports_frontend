import AsyncStorage from '@react-native-async-storage/async-storage';
import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist'; //Pesistant Data

import { userReducer } from './reducers';


const rootPersistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: [], // Blacklist all keys
  timeout: 10000,
};


const userConfig = {
  key: 'user',
  storage: AsyncStorage,
  blacklist: ['id'],
  timeout: 10000,
};

const persistedReducer = persistReducer(
  rootPersistConfig,
  combineReducers({
    user: persistReducer(userConfig, userReducer),
  })
);

const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV !== 'production',
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      immutableCheck: false,
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

const persistor = persistStore(store);

export { store, persistor };

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
