import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { authApi } from "./features/auth/auth";
import { profileApi } from "./features/profile";
import storage from "redux-persist/lib/storage";
import persistReducer from "redux-persist/lib/persistReducer";
import authReducer from "./reducers/auth";
import profileReducer from "./reducers/profile";
import fcmReducer from "./reducers/fcm";
import { ideasApi } from "./features/ideas";
import { brainstormsApi } from "./features/brainstorms";
import { commentsApi } from "./features/comments";
import { notificationApi } from "./features/notifications";
import { subscribeApi } from "./features/subscribe";
import routeReducer from "./reducers/route";
import notisReducer from "./reducers/notis";

const persistConfig = {
  key: "root",
  storage,
};
const combinedReducers = combineReducers({
  auth: authReducer,
  profile: profileReducer,
  notis: notisReducer,
});
const persistedReducer = persistReducer(persistConfig, combinedReducers);
export const store = configureStore({
  reducer: {
    persistedState: persistedReducer,
    fcm: fcmReducer,
    route: routeReducer,
    [authApi.reducerPath]: authApi.reducer,
    [profileApi.reducerPath]: profileApi.reducer,
    [ideasApi.reducerPath]: ideasApi.reducer,
    [brainstormsApi.reducerPath]: brainstormsApi.reducer,
    [commentsApi.reducerPath]: commentsApi.reducer,
    [notificationApi.reducerPath]: notificationApi.reducer,
    [subscribeApi.reducerPath]: subscribeApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat([
      authApi.middleware,
      profileApi.middleware,
      ideasApi.middleware,
      brainstormsApi.middleware,
      commentsApi.middleware,
      notificationApi.middleware,
      subscribeApi.middleware,
    ]),
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
