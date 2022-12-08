import React, { useState } from "react";
import "../../assets/styles/PizzaAndCart.css";
import AddIngredients from "./AddIngredients";
import PickDough from "./PickDough";

const Pizza = () => {
  const [showAddIngredientsModal, setShowAddIngredientsModal] = useState(false);
  const [doughSelected, setDoughSelected] = useState({
    doughName: "",
    doughPrice: 0,
  });

  return (
    <>
      <PickDough
        setShowAddIngredientsModal={setShowAddIngredientsModal}
        setDoughSelected={setDoughSelected}
      />
      {showAddIngredientsModal && (
        <AddIngredients
          showAddIngredientsModal={showAddIngredientsModal}
          setShowAddIngredientsModal={setShowAddIngredientsModal}
          doughSelected={doughSelected}
        />
      )}
    </>
  );
};

export default Pizza;
