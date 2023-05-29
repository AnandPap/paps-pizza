import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface InitialState {
  pizzasPicked: PizzaPicked[];
  totalPrice: number;
  isLoggedIn: boolean | null;
}
export interface PizzaPicked {
  pizzaName: string;
  pizzaIngredients: string[];
  pizzaPrice: number;
  numberOfOrders: number;
}
type PizzasPickedAction =
  | {
      type: "add";
      value: PizzaPicked;
    }
  | {
      type: "remove" | "";
      index: number;
    }
  | {
      type: "set";
      value: PizzaPicked[];
    }
  | {
      type: "reset";
    };
interface OrderNumberAction {
  type: "increment" | "decrement";
  index: number;
}
interface TotalPriceAction {
  type: "increment" | "decrement" | "set";
  amount: number;
}

const initialState: InitialState = {
  pizzasPicked: [],
  totalPrice: 0,
  isLoggedIn: null,
};

export const pizzaSlice = createSlice({
  name: "pizza",
  initialState,
  reducers: {
    setPizza: (state, action: PayloadAction<PizzasPickedAction>) => {
      switch (action.payload.type) {
        case "add":
          state.pizzasPicked = [...state.pizzasPicked, action.payload.value];
          break;
        case "remove":
          state.pizzasPicked = [
            ...state.pizzasPicked.slice(0, action.payload.index),
            ...state.pizzasPicked.slice(
              action.payload.index + 1,
              state.pizzasPicked.length
            ),
          ];
          break;
        case "set":
          state.pizzasPicked = action.payload.value;
          break;
        case "reset":
          state.pizzasPicked = [];
      }
    },
    setOrderNumber: (state, action: PayloadAction<OrderNumberAction>) => {
      switch (action.payload.type) {
        case "increment":
          state.pizzasPicked[action.payload.index].numberOfOrders += 1;
          break;
        case "decrement":
          state.pizzasPicked[action.payload.index].numberOfOrders -= 1;
      }
    },
    setTotalPrice: (state, action: PayloadAction<TotalPriceAction>) => {
      switch (action.payload.type) {
        case "increment":
          state.totalPrice += action.payload.amount;
          break;
        case "decrement":
          state.totalPrice -= action.payload.amount;
          break;
        case "set":
          state.totalPrice = action.payload.amount;
      }
      sessionStorage.setItem(
        "pizzasPicked",
        JSON.stringify(state.pizzasPicked)
      );
    },
    setIsLoggedIn: (state, action: PayloadAction<boolean>) => {
      state.isLoggedIn = action.payload;
    },
  },
});

export const { setPizza, setOrderNumber, setTotalPrice, setIsLoggedIn } =
  pizzaSlice.actions;

export default pizzaSlice.reducer;
