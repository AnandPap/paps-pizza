import React from "react";
import Button from "../../reusable/Button";

const DoughRow = ({
  doughName,
  doughPrice,
  doughDesciption,
  setShowAddIngredientsModal,
  setDoughSelected,
}) => {
  return (
    <div className="dough-row">
      <div className="dough-name-and-price-container">
        <div className="dough-name">{doughName}</div>
        <div className="dough-price-container">
          <div className="dough-price">{doughPrice}$</div>
          <Button
            className="add-ingredients-button"
            onClick={() => {
              setShowAddIngredientsModal(true);
              setDoughSelected({
                doughName: doughName,
                doughPrice: doughPrice,
              });
            }}
            title="Add ingredients"
            text="+ADD"
          />
        </div>
      </div>
      <div className="dough-description">{doughDesciption}</div>
    </div>
  );
};

export default DoughRow;
