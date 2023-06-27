import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface InitialState {
  pizzasPicked: PizzaPicked[];
  isLoggedIn: boolean | null;
  username: string | null;
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

const initialState: InitialState = {
  pizzasPicked: [],
  isLoggedIn: null,
  username: null,
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
    setIsLoggedIn: (state, action: PayloadAction<boolean>) => {
      state.isLoggedIn = action.payload;
    },
    setUsername: (state, action: PayloadAction<string>) => {
      state.username = action.payload;
    },
  },
});

export const { setPizza, setOrderNumber, setIsLoggedIn, setUsername } =
  pizzaSlice.actions;

export default pizzaSlice.reducer;
