import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { authApi } from "./features/auth/auth";
import { profileApi } from "./features/auth/profile";
import storage from "redux-persist/lib/storage";
import persistReducer from "redux-persist/lib/persistReducer";
import authReducer from "./reducers/auth";
import profileReducer from "./reducers/profile"
import { ideasApi } from "./features/auth/ideas";

const persistConfig = {
  key: "root",
  storage,
};
const combinedReducers = combineReducers({
  auth: authReducer,
  profile: profileReducer

})
const persistedReducer = persistReducer(persistConfig, combinedReducers);
export const store = configureStore({
  reducer: {
    persistedState: persistedReducer,
    [authApi.reducerPath]: authApi.reducer,
    [profileApi.reducerPath]: profileApi.reducer,
    [ideasApi.reducerPath]: ideasApi.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat([authApi.middleware, profileApi.middleware, ideasApi.middleware]),
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
