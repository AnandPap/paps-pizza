import { configureStore } from "@reduxjs/toolkit";
import pizzasReducer from "./pizzas";

export const store = configureStore({
  reducer: {
    pizzas: pizzasReducer,
  },
});
