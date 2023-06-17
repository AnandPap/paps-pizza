import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { useAppSelector } from "../redux/hooks";
import { OrderDetails, fetchOrderHistory } from "../helpers/fetch-functions";
import { getErrorMessage } from "../helpers/error-functions";
import ErrorMessage from "../reusable/ErrorMessage";
import Loading from "../reusable/Loading";

const OrderHistory = () => {
  const { isLoggedIn } = useAppSelector((s) => s.pizza);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [orderHistory, setOrderHistory] = useState<OrderDetails[]>([]);

  useEffect(() => {
    fetchOrderHistory()
      .then((res) => {
        if (res && !("code" in res)) {
          if (res.length === 0) setError("No results");
          else setOrderHistory(res);
        } else setError(getErrorMessage(res));
        setTimeout(() => {
          setLoading(false);
        }, 500);
      })
      .catch((err) => console.log(err));
  }, []);

  function addZero(number: string) {
    if (+number < 10) number = "0" + number;
    return number;
  }

  function getOrderDate(date: Date) {
    const newDate = new Date(date);
    const year = newDate.toLocaleDateString("es-sp");
    const hours = addZero(newDate.getHours().toString());
    const minutes = addZero(newDate.getMinutes().toString());
    return `${year} ${hours}:${minutes}`;
  }

  return isLoggedIn !== null ? (
    isLoggedIn ? (
      loading ? (
        <Loading className="dot-flashing" />
      ) : error ? (
        <ErrorMessage className="not-found" text={error} />
      ) : (
        <div className="order-history-wrapper">
          {orderHistory.map((item, i) => (
            <div key={i} className="order-history">
              <table>
                <caption>
                  <h2>{i + 1}. Order</h2>
                  <p className="order-date">{getOrderDate(item.date)}</p>
                </caption>
                <thead>
                  <tr>
                    <th>Pizzas ordered:</th>
                    <th>Orders</th>
                    <th>Price</th>
                  </tr>
                </thead>
                <tbody>
                  {item.order.map((order, i) => (
                    <tr key={i}>
                      <td>
                        <h4>{order.pizzaName}</h4>
                        <p>
                          {order.pizzaIngredients
                            .filter((value) => value !== "")
                            .join(", ")}
                        </p>
                      </td>
                      <td>{order.numberOfOrders}</td>
                      <td>{order.pizzaPrice}$</td>
                    </tr>
                  ))}
                  <tr>
                    <td colSpan={2}>
                      <h4>
                        Total price: <span>(with 5$ delivery)</span>
                      </h4>
                    </td>
                    <td>{item.price}$</td>
                  </tr>
                </tbody>
              </table>
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
