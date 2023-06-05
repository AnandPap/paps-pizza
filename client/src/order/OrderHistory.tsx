import { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useAppSelector } from "../redux/hooks";
import { OrderDetails, fetchOrderHistory } from "../helpers/fetch-functions";
import { errorHandler } from "../helpers/error-functions";
import ErrorMessage from "../reusable/ErrorMessage";
import Loading from "../reusable/Loading";

const OrderHistory = () => {
  const { isLoggedIn } = useAppSelector((s) => s.pizza);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [orderHistory, setOrderHistory] = useState<OrderDetails[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    async function getOrderHistory() {
      const res = await fetchOrderHistory();
      setTimeout(() => {
        setLoading(false);
      }, 750);
      console.log(res);
      if (res && !("code" in res)) setOrderHistory(res);
      else setError(errorHandler(res));
    }
    getOrderHistory();
  }, []);

  return isLoggedIn !== null ? (
    isLoggedIn ? (
      loading ? (
        <Loading className="dot-flashing" />
      ) : error ? (
        <ErrorMessage text={error} />
      ) : (
        <div className="order-history">
          {orderHistory.map((item, i) => (
            <div key={i}>
              <div>{i + 1}. Order</div>
              {item.order.map((order, i) => (
                <div className="order-info" key={i}>
                  <div>{order.pizzaName}</div>
                  <div>
                    {order.pizzaIngredients
                      .filter((value) => value !== "")
                      .join(", ")}
                  </div>
                  <div>{order.numberOfOrders}</div>
                </div>
              ))}
              <div>{item.price}</div>
              <div>{new Date(item.date).toLocaleDateString("es-sp")}</div>
            </div>
          ))}
        </div>
      )
    ) : (
      <Navigate to="/" replace={true} />
    )
  ) : null;
};

export default OrderHistory;
