import { useEffect, useState } from "react";
import Payment from "./Payment";
import DeliveryAddress, { Address } from "./DeliveryAddress";
import { useAppSelector, useAppDispatch } from "../redux/hooks";
import { Navigate, useNavigate } from "react-router-dom";
import { PizzaPicked, setPizza } from "../redux/pizza";

const Order = () => {
  const { pizzasPicked, isLoggedIn } = useAppSelector((s) => s.pizza);
  const [addressSelected, setAddressSelected] = useState<Address>({
    address: "",
    floor: "",
  });
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    let item = sessionStorage.getItem("pizzasPicked");
    if (!item) navigate("/", { replace: true });
    else dispatch(setPizza({ type: "set", value: JSON.parse(item) }));
  }, []);

  return pizzasPicked.length > 0 && isLoggedIn !== null ? (
    !isLoggedIn ? (
      <div className="order-page">
        <DeliveryAddress setAddressSelected={setAddressSelected} />
        <Payment addressSelected={addressSelected} />
      </div>
    ) : (
      <Navigate to="/" replace={true} />
    )
  ) : null;
};

export default Order;
