import { useEffect } from "react";
import { useAppSelector, useAppDispatch } from "../redux/hooks";
import { setPizza, setTotalPrice } from "../redux/pizza";
import { useNavigate } from "react-router-dom";
import Button from "../reusable/Button";
import CartItem from "./CartItem";

const Cart = () => {
  const { totalPrice, pizzasPicked, isLoggedIn } = useAppSelector(
    (s) => s.pizza
  );
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const deliveryPrice = 5;

  useEffect(() => {
    let item = sessionStorage.getItem("pizzasPicked");
    if (item) {
      const parsedItem = JSON.parse(item);
      if (parsedItem.constructor === Array)
        dispatch(setPizza({ type: "set", value: parsedItem }));
    }
  }, []);

  useEffect(() => {
    let price = 0;
    for (let i = 0; i < pizzasPicked.length; i++) {
      price += pizzasPicked[i].numberOfOrders * pizzasPicked[i].pizzaPrice;
    }
    dispatch(setTotalPrice({ type: "set", amount: price }));
  }, [pizzasPicked]);

  return (
    <div className="cart">
      {pizzasPicked.length === 0 ? (
        <div className="cart-placeholder">
          <i className="bi bi-cart4"></i>
        </div>
      ) : (
        <>
          <h2>Cart</h2>
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
                <span>{totalPrice + deliveryPrice}$</span>
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
