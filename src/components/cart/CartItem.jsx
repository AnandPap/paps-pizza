import React from "react";
import Button from "../../reusable/Button";
import { useDispatch } from "react-redux";
import {
  incrementTotalPrice,
  decrementTotalPrice,
  removePizza,
  increaseNumberOfOrders,
  decreaseNumberOfOrders,
} from "../../redux/pizzas";

const CartItem = ({ i, pizza }) => {
  const dispatch = useDispatch();

  return (
    <div className="cart-item">
      <div className="pizza-name-and-price-container">
        <h1 className="pizza-name">{pizza.pizzaName}</h1>
        <div className="pizza-price-container">
          <div className="pizza-price">
            {pizza.pizzaPrice * pizza.numberOfOrders}$
          </div>
          <Button
            onClick={() => {
              if (pizza.numberOfOrders === 1) {
                dispatch(removePizza(i));
              } else {
                dispatch(decreaseNumberOfOrders(i));
                dispatch(decrementTotalPrice(pizza.pizzaPrice));
              }
            }}
            text="-"
            className="add-subtract-buttons"
          />
          <div className="number-of-orders">{pizza.numberOfOrders}</div>
          <Button
            onClick={() => {
              dispatch(increaseNumberOfOrders(i));
              dispatch(incrementTotalPrice(pizza.pizzaPrice));
            }}
            text="+"
            className="add-subtract-buttons"
          />
        </div>
      </div>
      <div className="pizza-ingredients">
        {pizza.pizzaIngredients.filter((value) => value !== "").join(", ")}
      </div>
    </div>
  );
};

export default CartItem;
