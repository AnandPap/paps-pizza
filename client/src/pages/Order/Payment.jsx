import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { resetPizzas } from "../../redux/pizzas";
import { useNavigate } from "react-router-dom";
import CartItem from "../../components/cart/CartItem";
import Button from "../../reusable/Button";

const Payment = ({ addressSelected }) => {
  const [warningText, setWarningText] = useState("");

  const { pizzasPicked, totalPrice } = useSelector((s) => s.pizzas);
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const deliveryPrice = 5;

  useEffect(() => {
    setWarningText("");
  }, [addressSelected.address]);

  return (
    <div className="payment">
      <div className="payment-title">Payment</div>
      <div className="order-list-container">
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
        </div>
        <div className="notes-wrapper">
          <p>Notes:</p>
          <textarea
            className="notes-textarea"
            placeholder="Any additional notes"
          ></textarea>
        </div>
        <div className="order-button-wrapper">
          <Button
            text="ORDER"
            className="order-button"
            onClick={() => {
              if (addressSelected.address !== undefined) {
                navigate("/orderhistory", { replace: true });
                dispatch(resetPizzas());
              } else
                setWarningText(
                  "Please select appropriate address for delivery."
                );
            }}
          />
        </div>
        <div className="warning-message">{warningText}</div>
      </div>
    </div>
  );
};

export default Payment;
