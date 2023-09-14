
import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer, createTransform  } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; 
import authReducer from "./slices/authSlice";
import { combineReducers } from 'redux';

const rootReducer = combineReducers({
  auth: authReducer
});

//transformation personnalisée : si on veut seulement persister certaines parties (error)
const authTransform = createTransform( 
  // état entrant (state enregistré)
  (inboundState, key) => {
    if (key === 'auth') {
      const { error, ...otherState } = inboundState; // error exclu lors de la sauvegarde de l'état
      return otherState;
    }
    return inboundState;
  },
  // état sortant (state récupéré)
  (outboundState, key) => outboundState
);

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['auth'] ,
  transforms: [authTransform]
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => 
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST', 'persist/PURGE'],
      }
    })
});

export const persistor = persistStore(store);
