import { useState, useEffect, FC } from "react";
import Button from "../reusable/Button";
import { Address } from "./DeliveryAddress";

interface CardProps {
  i: number;
  card: Address;
  radioSelected: number | null;
  setRadioSelected: React.Dispatch<React.SetStateAction<number | null>>;
  setAddressSelected: React.Dispatch<React.SetStateAction<Address>>;
  newAddress: Address;
  setAddressCards: React.Dispatch<React.SetStateAction<Address[]>>;
}

const Card: FC<CardProps> = ({
  i,
  card,
  radioSelected,
  setRadioSelected,
  setAddressSelected,
  newAddress,
  setAddressCards,
}) => {
  const [checked, setChecked] = useState(false);
  const localStorageItem = localStorage.getItem("addressCards");

  useEffect(() => {
    if (i === radioSelected) setChecked(true);
    else setChecked(false);
  }, [radioSelected]);

  function removeAddress(i: number) {
    if (localStorageItem)
      localStorage.setItem(
        "addressCards",
        JSON.stringify([...JSON.parse(localStorageItem), newAddress])
      );
    setAddressCards((s) => {
      localStorage.setItem(
        "addressCards",
        JSON.stringify([...s.slice(0, i), ...s.slice(i + 1, s.length)])
      );
      return [...s.slice(0, i), ...s.slice(i + 1, s.length)];
    });
    if (radioSelected === i) {
      setAddressSelected({ address: "", floor: "" });
      setRadioSelected(null);
    }
  }

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
        <Button className="" text="REMOVE" onClick={() => removeAddress(i)} />
      </div>
    </div>
  );
};

export default Card;
