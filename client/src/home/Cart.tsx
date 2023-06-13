import { useEffect, useState } from "react";
import { useAppSelector, useAppDispatch } from "../redux/hooks";
import { setPizza } from "../redux/pizza";
import { useNavigate } from "react-router-dom";
import Button from "../reusable/Button";
import CartItem from "./CartItem";

const Cart = () => {
  const { pizzasPicked, isLoggedIn } = useAppSelector((s) => s.pizza);
  const [totalPrice, setTotalPrice] = useState(0);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const deliveryPrice = 5;

  useEffect(() => {
    let price = deliveryPrice;
    for (let i = 0; i < pizzasPicked.length; i++) {
      price += pizzasPicked[i].numberOfOrders * pizzasPicked[i].pizzaPrice;
    }
    setTotalPrice(price);
  }, [pizzasPicked]);

  return (
    <div className="cart">
      {pizzasPicked.length === 0 ? (
        <div className="cart-placeholder">
          <i className="bi bi-cart4"></i>
        </div>
      ) : (
        <>
          <div className="cart-header">
            <h2>Cart</h2>
            <Button
              text="Remove all"
              onClick={() => dispatch(setPizza({ type: "reset" }))}
            />
          </div>
          <div className="cart-items-container">
            {pizzasPicked.map((pizza, i) => (
              <CartItem key={i} i={i} pizza={pizza} />
            ))}
            <div className="cart-total-price">
              <div className="delivery">
                <p>Delivery</p>
                <span>{deliveryPrice}$</span>
              </div>
              <div className="cart-total">
                <p>TOTAL</p>
                <span>{totalPrice}$</span>
                <Button
                  text="BUY"
                  className="buy-btn"
                  onClick={() => {
                    if (isLoggedIn) navigate("/order");
                    else navigate("/login", { state: "buy" });
                  }}
                />
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
