import { useEffect, useState } from "react";
import Payment from "./Payment";
import DeliveryAddress, { Address } from "./DeliveryAddress";
import { useAppSelector, useAppDispatch } from "../redux/hooks";
import { useNavigate } from "react-router-dom";
import { PizzaPicked, setPizza } from "../redux/pizza";

const Order = () => {
  const pizzasPicked = useAppSelector((s) => s.pizza.pizzasPicked);
  const [addressSelected, setAddressSelected] = useState<Address>({
    address: "",
    floor: "",
  });
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    let item = sessionStorage.getItem("pizzasPicked");
    if (item) {
      const pizzasPickedArray: PizzaPicked[] = JSON.parse(item);
      dispatch(setPizza({ type: "set", value: pizzasPickedArray }));
    } else navigate("/", { replace: true });
  }, []);

  return pizzasPicked.length > 0 ? (
    <div className="order-page">
      <DeliveryAddress setAddressSelected={setAddressSelected} />
      <Payment addressSelected={addressSelected} />
    </div>
  ) : null;
};

export default Order;
