import { createSlice } from "@reduxjs/toolkit";

export const pizzasSlice = createSlice({
  name: "pizzas",
  initialState: {
    totalPrice: 0,
    pizzasPicked: [],
    showLogInModal: false,
    showSignUpModal: false,
    isLoggedIn: false,
  },
  reducers: {
    setIsLoggedIn: (state, action) => {
      state.isLoggedIn = action.payload;
    },
    setShowLogInModal: (state, action) => {
      state.showLogInModal = action.payload;
    },
    setShowSignUpModal: (state, action) => {
      state.showSignUpModal = action.payload;
    },
    setAmount: (state, action) => {
      state.totalPrice = action.payload;
    },
    incrementTotalPrice: (state, action) => {
      state.totalPrice += action.payload;
    },
    decrementTotalPrice: (state, action) => {
      state.totalPrice -= action.payload;
    },
    addPizza: (state, action) => {
      state.pizzasPicked = [...state.pizzasPicked, action.payload];
    },
    removePizza: (state, action) => {
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
    increaseNumberOfOrders: (state, action) => {
      state.pizzasPicked[action.payload].numberOfOrders += 1;
    },
    decreaseNumberOfOrders: (state, action) => {
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
  setShowLogInModal,
  setShowSignUpModal,
  setIsLoggedIn,
} = pizzasSlice.actions;

export default pizzasSlice.reducer;
