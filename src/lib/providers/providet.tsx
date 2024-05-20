"use client";
import { Provider } from "react-redux";
import { store } from "../store";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";

let persistor = persistStore(store);
export function Providers({ children }: any) {
  return (
    <Provider store={store}>
      <PersistGate  persistor={persistor}>

      { children }
      </PersistGate>
      </Provider>
  );
}