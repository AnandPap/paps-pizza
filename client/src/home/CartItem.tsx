import { FC } from "react";
import { useAppDispatch } from "../redux/hooks";
import Button from "../reusable/Button";
import { PizzaPicked, setPizza, setOrderNumber } from "../redux/pizza";

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
              if (pizza.numberOfOrders === 1)
                dispatch(setPizza({ type: "remove", index: i }));
              else dispatch(setOrderNumber({ type: "decrement", index: i }));
            }}
            text="&minus;"
            className="increment-btn"
          />
          <div className="number-of-orders">{pizza.numberOfOrders}</div>
          <Button
            onClick={() =>
              dispatch(setOrderNumber({ type: "increment", index: i }))
            }
            text="+"
            className="increment-btn"
          />
        </div>
      </div>
      <button
        className="remove-cart-item"
        onClick={() => dispatch(setPizza({ type: "remove", index: i }))}
      />
    </div>
  );
};

export default CartItem;
