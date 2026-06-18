import { configureStore, ThunkAction, Action, combineReducers } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';
import facilitiesReducer from "@/redux/reducers/facilitiesSlice";
import logger from 'redux-logger';

const rootReducer = combineReducers({
    facilitiesReducer: facilitiesReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['facilitiesReducer']
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }).concat(logger),
});

export const persistor = persistStore(store);

export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;
