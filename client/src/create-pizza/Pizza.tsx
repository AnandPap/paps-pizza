import { useState } from "react";
import AddIngredients from "./AddIngredients";
import PickDough from "./PickDough";

const Pizza = () => {
  const [doughSelected, setDoughSelected] = useState({
    doughName: "",
    doughPrice: 0,
  });

  return (
    <>
      <PickDough setDoughSelected={setDoughSelected} />
      <AddIngredients doughSelected={doughSelected} />
    </>
  );
};

export default Pizza;
