import { useState, useEffect, FC } from "react";
import { useAppSelector, useAppDispatch } from "../redux/hooks";
import { setPizza } from "../redux/pizza";
import { useNavigate } from "react-router-dom";
import CartItem from "../home/CartItem";
import Button from "../reusable/Button";
import { Address } from "./DeliveryAddress";
import ErrorMessage from "../reusable/ErrorMessage";
import { saveOrder } from "../helpers/fetch-functions";

interface PaymentProps {
  addressSelected: Address;
}

const Payment: FC<PaymentProps> = ({ addressSelected }) => {
  const [error, setError] = useState("");
  const [notes, setNotes] = useState("");
  const [totalPrice, setTotalPrice] = useState(0);
  const { pizzasPicked } = useAppSelector((s) => s.pizza);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const deliveryPrice = 5;

  useEffect(() => {
    setError("");
  }, [addressSelected]);

  useEffect(() => {
    let price = deliveryPrice;
    for (let i = 0; i < pizzasPicked.length; i++) {
      price += pizzasPicked[i].numberOfOrders * pizzasPicked[i].pizzaPrice;
    }
    setTotalPrice(price);
  }, [pizzasPicked]);

  function placeOrder() {
    if (addressSelected.address && pizzasPicked.length > 0) {
      saveOrder({
        order: pizzasPicked,
        address: addressSelected,
        price: totalPrice,
        notes: notes,
        date: Date.now(),
      })
        .then(() => {
          navigate("/order-history", { replace: true });
          dispatch(setPizza({ type: "reset" }));
          sessionStorage.removeItem("radioSelected");
        })
        .catch((err) => console.log(err));
    } else if (pizzasPicked.length === 0)
      setError(
        "No pizza selected. Please go back and select at least one pizza."
      );
    else setError("Please select appropriate address for delivery.");
  }

  return (
    <div className="payment">
      <h2>Payment</h2>
      <div className="payment-items-container">
        {pizzasPicked.length > 0 ? (
          pizzasPicked.map((pizza, i) => (
            <CartItem key={i} i={i} pizza={pizza} />
          ))
        ) : (
          <div className="no-pizza">
            <ErrorMessage className="not-found" text="No pizza selected" />
            <button className="go-back-btn" onClick={() => navigate("/")}>
              Go back
            </button>
          </div>
        )}
      </div>
      <div className="payment-footer">
        <div className="delivery">
          <p>Delivery</p>
          <span>{deliveryPrice}$</span>
        </div>
        <div className="cart-total order-page">
          <p>TOTAL</p>
          <span>{totalPrice}$</span>
        </div>
        <p>Any additional notes?</p>
        <textarea
          className="order-textarea"
          placeholder="Additional notes"
          onChange={(e) => setNotes(e.target.value)}
        />
        {error && <ErrorMessage text={error} className="error-message" />}
        <Button
          text="PLACE ORDER"
          className="order-button"
          onClick={placeOrder}
        />
      </div>
    </div>
  );
};

export default Payment;
