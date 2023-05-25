import { useState } from "react";
import Payment from "./Payment";
import DeliveryAddress, { Address } from "./DeliveryAddress";
import { useAppSelector } from "../redux/hooks";
import { Navigate } from "react-router-dom";

const Order = () => {
  const pizzasPicked = useAppSelector((s) => s.pizza.pizzasPicked);
  const [addressSelected, setAddressSelected] = useState<Address>({
    address: "",
    floor: "",
  });

  return pizzasPicked.length > 0 ? (
    <div className="order-page">
      <DeliveryAddress setAddressSelected={setAddressSelected} />
      <Payment addressSelected={addressSelected} />
    </div>
  ) : (
    <Navigate to="/" replace={true} />
  );
};

export default Order;
