import { useNavigate } from "react-router-dom";
import pizza from "../assets/images/kawaii-pizza.png";
import Button from "../reusable/Button";

const OrderHistory = () => {
  const navigate = useNavigate();
  return (
    <div className="goodbye-message">
      <div>
        Thank you for your order! It will arrive on provided address shortly.
        Until then, please enjoy this rotating pizza. 😊
      </div>
      <img className="rotating-pizza" src={pizza} alt="" />
      <div>
        <Button
          onClick={() => navigate("/", { replace: true })}
          text="Order some more!"
          className="order-more-btn"
        ></Button>
      </div>
    </div>
  );
};

export default OrderHistory;
