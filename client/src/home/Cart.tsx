import { useEffect } from "react";
import { useAppSelector, useAppDispatch } from "../redux/hooks";
import { openModal, setTotalPrice } from "../redux/pizza";
import { useNavigate } from "react-router-dom";
import Button from "../reusable/Button";
import CartItem from "./CartItem";
import { isAuthenticated } from "../helpers/helper-functions";

const Cart = () => {
  const deliveryPrice = 5;
  const { totalPrice, pizzasPicked } = useAppSelector((s) => s.pizza);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    let price = 0;
    for (let i = 0; i < pizzasPicked.length; i++) {
      price += pizzasPicked[i].numberOfOrders * pizzasPicked[i].pizzaPrice;
    }
    dispatch(setTotalPrice({ type: "decrement", amount: price }));
  }, [pizzasPicked]);

  return (
    <div className="cart">
      {pizzasPicked.length === 0 ? (
        <div className="cart-placeholder">
          <i className="bi bi-cart4"></i>
        </div>
      ) : (
        <div className="cart-list">
          <h2>Cart</h2>
          <div className="order-items-container">
            {pizzasPicked.map((pizza, i) => (
              <CartItem key={i} i={i} pizza={pizza} />
            ))}
          </div>
          <div className="cart-total-price">
            <div className="delivery">
              <p>Delivery</p>
              <span>{deliveryPrice}$</span>
            </div>
            <div className="cart-total">
              <p>TOTAL</p>
              <span>{totalPrice + deliveryPrice}$</span>
              <Button
                text="BUY"
                className="buy-btn"
                onClick={() => {
                  if (isAuthenticated()) {
                    navigate("/order");
                    sessionStorage.setItem(
                      "pizzasPicked",
                      JSON.stringify(pizzasPicked)
                    );
                  } else {
                    dispatch(openModal("login"));
                    navigate("/login", { state: "buy" });
                  }
                }}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
