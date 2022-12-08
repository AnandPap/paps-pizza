import React from "react";
import DoughRow from "./DoughRow";
import doughData from "../../data/types_of_dough.json";

const PickDough = ({ setShowAddIngredientsModal, setDoughSelected }) => {
  return (
    <div className="pick-a-dough">
      <div className="pick-a-dough-title-container">
        <div className="pick-a-dough-title">Pick a Dough</div>
      </div>
      <div className="dough-row-container">
        {doughData.data.map((item, i) => (
          <DoughRow
            key={i}
            doughName={item.name}
            doughPrice={item.price}
            doughDesciption={item.desc}
            setShowAddIngredientsModal={setShowAddIngredientsModal}
            setDoughSelected={setDoughSelected}
          />
        ))}
      </div>
    </div>
  );
};

export default PickDough;
