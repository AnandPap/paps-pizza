import { useEffect, useState } from "react";
import Payment from "./Payment";
import DeliveryAddress, { Address } from "./DeliveryAddress";
import { useAppSelector } from "../redux/hooks";
import { Navigate, useNavigate } from "react-router-dom";

const Order = () => {
  const { pizzasPicked, isLoggedIn } = useAppSelector((s) => s.pizza);
  const [addressSelected, setAddressSelected] = useState<Address>({
    address: "",
    floor: "",
  });
  const navigate = useNavigate();

  useEffect(() => {
    if (pizzasPicked.length === 0) navigate("/", { replace: true });
  }, [pizzasPicked]);

  return isLoggedIn !== null ? (
    isLoggedIn && pizzasPicked.length > 0 ? (
      <div className="order">
        <DeliveryAddress setAddressSelected={setAddressSelected} />
        <Payment addressSelected={addressSelected} />
      </div>
    ) : (
      <Navigate to="/" replace={true} />
    )
  ) : null;
};

export default Order;
