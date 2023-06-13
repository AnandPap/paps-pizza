import { configureStore } from "@reduxjs/toolkit";
import pizzaReducer, { InitialState } from "./pizza";

export const store = configureStore({
  reducer: {
    pizza: pizzaReducer,
  },
  preloadedState: loadFromSessionStorage(),
});

function loadFromSessionStorage() {
  try {
    const serialisedState = sessionStorage.getItem("reduxStore");
    if (serialisedState === null) return undefined;
    return JSON.parse(serialisedState);
  } catch (err) {
    console.warn(err);
    return undefined;
  }
}

function saveToSessionStorage(state: { pizza: InitialState }) {
  try {
    const serialState = JSON.stringify(state);
    sessionStorage.setItem("reduxStore", serialState);
  } catch (e) {
    console.warn(e);
  }
}

store.subscribe(() => saveToSessionStorage(store.getState()));

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
