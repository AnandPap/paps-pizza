import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface InitialState {
  totalPrice: number;
  pizzasPicked: PizzaPicked[];
  modal: Modal;
  isLoggedIn: boolean;
}
export interface PizzaPicked {
  pizzaName: string;
  pizzaIngredients: string[];
  pizzaPrice: number;
  numberOfOrders: number;
}
interface Modal {
  type: ModalType;
  display: boolean;
}
type ModalType = "login" | "signup" | "ingredients" | "";

const initialState: InitialState = {
  totalPrice: 0,
  pizzasPicked: [],
  modal: { type: "", display: false },
  isLoggedIn: false,
};

export const pizzaSlice = createSlice({
  name: "pizza",
  initialState,
  reducers: {
    setIsLoggedIn: (state, action: PayloadAction<boolean>) => {
      state.isLoggedIn = action.payload;
    },
    openModal: (state, action: PayloadAction<ModalType>) => {
      state.modal = { type: action.payload, display: true };
    },
    closeModal: (state) => {
      state.modal = { type: "", display: false };
    },
    setAmount: (state, action: PayloadAction<number>) => {
      state.totalPrice = action.payload;
    },
    incrementTotalPrice: (state, action: PayloadAction<number>) => {
      state.totalPrice += action.payload;
    },
    decrementTotalPrice: (state, action: PayloadAction<number>) => {
      state.totalPrice -= action.payload;
    },
    addPizza: (state, action: PayloadAction<PizzaPicked>) => {
      state.pizzasPicked = [...state.pizzasPicked, action.payload];
    },
    removePizza: (state, action: PayloadAction<number>) => {
      state.pizzasPicked = [
        ...state.pizzasPicked.slice(0, action.payload),
        ...state.pizzasPicked.slice(
          action.payload + 1,
          state.pizzasPicked.length
        ),
      ];
    },
    resetPizzas: (state) => {
      state.pizzasPicked = [];
    },
    increaseNumberOfOrders: (state, action: PayloadAction<number>) => {
      state.pizzasPicked[action.payload].numberOfOrders += 1;
    },
    decreaseNumberOfOrders: (state, action: PayloadAction<number>) => {
      state.pizzasPicked[action.payload].numberOfOrders -= 1;
    },
  },
});

export const {
  incrementTotalPrice,
  decrementTotalPrice,
  setAmount,
  addPizza,
  removePizza,
  resetPizzas,
  increaseNumberOfOrders,
  decreaseNumberOfOrders,
  openModal,
  closeModal,
  setIsLoggedIn,
} = pizzaSlice.actions;

export default pizzaSlice.reducer;