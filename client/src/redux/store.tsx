import { configureStore } from "@reduxjs/toolkit";
import pizzaReducer from "./pizza";

export const store = configureStore({
  reducer: {
    pizza: pizzaReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
