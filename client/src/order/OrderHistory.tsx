import { useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import pizza from "../assets/images/kawaii-pizza.png";
import Button from "../reusable/Button";
import { useAppSelector } from "../redux/hooks";
import { fetchOrderHistory } from "../helpers/fetch-functions";

const OrderHistory = () => {
  const { isLoggedIn } = useAppSelector((s) => s.pizza);

  useEffect(() => {
    async function getOrderHistory() {
      const res = await fetchOrderHistory();
      console.log(res);
    }
    getOrderHistory();
  }, []);

  const navigate = useNavigate();
  return isLoggedIn !== null ? (
    isLoggedIn ? (
      <div className="goodbye-message">
        <div>
          Thank you for your order! It will arrive on provided address shortly.
          Until then, please enjoy this rotating pizza. 😊
        </div>
        <img className="rotating-pizza" src={pizza} alt="" />
        <div>
          <Button
            onClick={() => navigate("/")}
            text="Order some more!"
            className="order-more-btn"
          ></Button>
        </div>
      </div>
    ) : (
      <Navigate to="/" replace={true} />
    )
  ) : null;
};

export default OrderHistory;
