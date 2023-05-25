import { useEffect } from "react";
import { useAppSelector, useAppDispatch } from "../redux/hooks";
import { setAmount, setShowLogInModal } from "../redux/pizza";
import { useNavigate } from "react-router-dom";
import Button from "../reusable/Button";
import CartItem from "./CartItem";

const Cart = () => {
  const { totalPrice, pizzasPicked, isLoggedIn } = useAppSelector(
    (s) => s.pizza
  );
  const dispatch = useAppDispatch();

  const deliveryPrice = 5;
  const history = useNavigate();

  useEffect(() => {
    let price = 0;
    for (let i = 0; i < pizzasPicked.length; i++) {
      price += pizzasPicked[i].numberOfOrders * pizzasPicked[i].pizzaPrice;
    }
    dispatch(setAmount(price));
  }, [pizzasPicked]);

  return (
    <div className="cart">
      {pizzasPicked.length === 0 ? (
        <div className="cart-placeholder-wrapper">
          <i className="bi bi-cart4 cart-placeholder"></i>
        </div>
      ) : (
        <div className="cart-list">
          <div className="order-title-container">
            <h1 className="order-title">Order</h1>
          </div>
          <div className="order-item-container">
            {pizzasPicked.map((pizza, i) => (
              <CartItem key={i} i={i} pizza={pizza} />
            ))}
          </div>
          <div className="cart-total">
            <div className="delivery">
              <p className="delivery-text">Delivery</p>
              <p className="delivery-price">{deliveryPrice}$</p>
            </div>
            <div className="total">
              <p className="total-text">TOTAL</p>
              <p className="total-price">{totalPrice + deliveryPrice}$</p>
            </div>
            <Button
              text="BUY"
              className="buy-button"
              onClick={() => {
                if (isLoggedIn) {
                  history("/order");
                  sessionStorage.setItem(
                    "pizzasPicked",
                    JSON.stringify(pizzasPicked)
                  );
                } else {
                  dispatch(setShowLogInModal(true));
                  history("/login");
                }
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
