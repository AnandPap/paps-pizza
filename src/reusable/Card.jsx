import React, { useState, useEffect } from "react";
import Button from "./Button";
import "./Card.css";

const Card = ({
  card,
  i,
  radioSelected,
  setRadioSelected,
  setAddressSelected,
  removeAddress,
}) => {
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    if (i === radioSelected) setChecked(true);
    else setChecked(false);
    // eslint-disable-next-line
  }, [radioSelected]);

  return (
    <div className="card-wrapper">
      <div className="card-radio-and-info-wrapper">
        <div className="card-radio-wrapper">
          <input
            type="radio"
            checked={checked}
            onChange={() => {
              setRadioSelected(i);
              setAddressSelected(card);
            }}
          />
        </div>
        <div className="card-info-wrapper">
          <p>{card.address}</p>
          <p>{card.floor}</p>
        </div>
      </div>
      <div className="remove-card-wrapper">
        <Button text="REMOVE" onClick={() => removeAddress(i)} />
      </div>
    </div>
  );
};

export default Card;
