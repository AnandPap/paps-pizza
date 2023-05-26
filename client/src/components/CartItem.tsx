import { FC } from "react";
import { useAppDispatch } from "../redux/hooks";
import Button from "../reusable/Button";
import {
  incrementTotalPrice,
  decrementTotalPrice,
  removePizza,
  increaseNumberOfOrders,
  decreaseNumberOfOrders,
  PizzaPicked,
} from "../redux/pizza";

interface CartItemProps {
  i: number;
  pizza: PizzaPicked;
}

const CartItem: FC<CartItemProps> = ({ i, pizza }) => {
  const dispatch = useAppDispatch();

  return (
    <div className="cart-item">
      <div>
        <h3>{pizza.pizzaName}</h3>
        <p>
          {pizza.pizzaIngredients.filter((value) => value !== "").join(", ")}
        </p>
      </div>
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
          className="increment-btn"
        />
        <div className="number-of-orders">{pizza.numberOfOrders}</div>
        <Button
          onClick={() => {
            dispatch(increaseNumberOfOrders(i));
            dispatch(incrementTotalPrice(pizza.pizzaPrice));
          }}
          text="+"
          className="increment-btn"
        />
      </div>
    </div>
  );
};

export default CartItem;
