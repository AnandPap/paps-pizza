import { useState } from "react";
import Payment from "./Payment";
import DeliveryAddress, { Address } from "./DeliveryAddress";
import { useAppSelector } from "../redux/hooks";
import { Navigate } from "react-router-dom";

const Order = () => {
  const { isLoggedIn } = useAppSelector((s) => s.pizza);
  const [addressSelected, setAddressSelected] = useState<Address>({
    address: "",
    floor: "",
  });

  return isLoggedIn !== null ? (
    isLoggedIn ? (
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
