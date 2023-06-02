import { useState, useEffect, FC } from "react";
import { useAppSelector, useAppDispatch } from "../redux/hooks";
import { setPizza } from "../redux/pizza";
import { useNavigate } from "react-router-dom";
import CartItem from "../home/CartItem";
import Button from "../reusable/Button";
import { Address } from "./DeliveryAddress";
import ErrorMessage from "../reusable/ErrorMessage";

interface PaymentProps {
  addressSelected: Address;
}

const Payment: FC<PaymentProps> = ({ addressSelected }) => {
  const [error, setError] = useState("");
  const { pizzasPicked, totalPrice } = useAppSelector((s) => s.pizza);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const deliveryPrice = 5;

  useEffect(() => {
    setError("");
  }, [addressSelected.address]);

  return (
    <div className="payment">
      <h2>Payment</h2>
      <div className="payment-items-container">
        {pizzasPicked.map((pizza, i) => (
          <CartItem key={i} i={i} pizza={pizza} />
        ))}
        <div className="cart-total-price">
          <div className="delivery">
            <p>Delivery</p>
            <span>{deliveryPrice}$</span>
          </div>
          <div className="cart-total order-page">
            <p>TOTAL</p>
            <span>{totalPrice + deliveryPrice}$</span>
          </div>
        </div>
        <p>Any additional notes?</p>
        <textarea className="order-textarea" placeholder="Additional notes" />
        <Button
          text="PLACE ORDER"
          className="order-button"
          onClick={() => {
            if (addressSelected.address) {
              navigate("/order-history");
              dispatch(setPizza({ type: "reset" }));
            } else setError("Please select appropriate address for delivery.");
          }}
        />
        {error && <ErrorMessage text={error} className="error-message" />}
      </div>
    </div>
  );
};

export default Payment;
