import { FC } from "react";
import { useAppDispatch } from "../redux/hooks";
import Button from "../reusable/Button";
import {
  PizzaPicked,
  setPizza,
  setOrderNumber,
  setTotalPrice,
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
        <h3>{pizza.pizzaName} </h3>
        <p>
          {pizza.pizzaIngredients.filter((value) => value !== "").join(", ")}
        </p>
      </div>
      <div className="cart-item-right">
        <div className="cart-item-price">
          {pizza.pizzaPrice * pizza.numberOfOrders}$
        </div>
        <div className="cart-item-buttons">
          <Button
            onClick={() => {
              if (location.pathname === "/order") {
                if (pizza.numberOfOrders > 1) {
                  dispatch(setOrderNumber({ type: "decrement", index: i }));
                  dispatch(
                    setTotalPrice({
                      type: "decrement",
                      amount: pizza.pizzaPrice,
                    })
                  );
                }
              } else {
                if (pizza.numberOfOrders === 1) {
                  dispatch(setPizza({ type: "remove", index: i }));
                } else {
                  dispatch(setOrderNumber({ type: "decrement", index: i }));
                  dispatch(
                    setTotalPrice({
                      type: "decrement",
                      amount: pizza.pizzaPrice,
                    })
                  );
                }
              }
            }}
            text="&minus;"
            className="increment-btn"
          />
          <div className="number-of-orders">{pizza.numberOfOrders}</div>
          <Button
            onClick={() => {
              dispatch(setOrderNumber({ type: "increment", index: i }));
              dispatch(
                setTotalPrice({ type: "increment", amount: pizza.pizzaPrice })
              );
            }}
            text="+"
            className="increment-btn"
          />
        </div>
      </div>
      <div
        className="remove-cart-item"
        onClick={() => dispatch(setPizza({ type: "remove", index: i }))}
      ></div>
    </div>
  );
};

export default CartItem;
