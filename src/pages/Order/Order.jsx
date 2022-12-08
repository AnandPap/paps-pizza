import React, { useState } from "react";
import Payment from "./Payment";
import AddressToDeliver from "./AddressToDeliver";
import "./Order.css";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const Order = () => {
  const { pizzasPicked } = useSelector((s) => s.pizzas);
  const [addressSelected, setAddressSelected] = useState({});

  return pizzasPicked.length > 0 ? (
    <div className="order-page">
      <AddressToDeliver setAddressSelected={setAddressSelected} />
      <Payment addressSelected={addressSelected} />
    </div>
  ) : (
    <Navigate to="/" replace={true} />
  );
};

export default Order;
