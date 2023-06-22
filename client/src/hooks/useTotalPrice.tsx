import { useState, useEffect } from "react";
import { useAppSelector } from "../redux/hooks";

const useTotalPrice = () => {
  const [totalPrice, setTotalPrice] = useState(0);
  const { pizzasPicked } = useAppSelector((s) => s.pizza);
  const deliveryPrice = 5;

  useEffect(() => {
    let price = deliveryPrice;
    for (let i = 0; i < pizzasPicked.length; i++) {
      price += pizzasPicked[i].numberOfOrders * pizzasPicked[i].pizzaPrice;
    }
    setTotalPrice(price);
  }, [pizzasPicked]);

  return totalPrice;
};

export default useTotalPrice;
