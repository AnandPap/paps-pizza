import { useState, useEffect, FC } from "react";
import { useAppSelector, useAppDispatch } from "../redux/hooks";
import { resetPizzas } from "../redux/pizza";
import { useNavigate } from "react-router-dom";
import CartItem from "../components/CartItem";
import Button from "../reusable/Button";
import { Address } from "./DeliveryAddress";

interface PaymentProps {
  addressSelected: Address;
}

const Payment: FC<PaymentProps> = ({ addressSelected }) => {
  const [warningText, setWarningText] = useState("");

  const { pizzasPicked, totalPrice } = useAppSelector((s) => s.pizza);
  const dispatch = useAppDispatch();

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
