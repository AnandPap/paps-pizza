import { useState, useEffect, FC } from "react";
import Button from "../reusable/Button";
import { Address } from "./DeliveryAddress";

interface AddressCardProps {
  i: number;
  card: Address;
  radioSelected: number | null;
  selectAddress: (i: number, card: Address) => void;
  removeAddressCard: (i: number) => void;
}

const AddressCard: FC<AddressCardProps> = ({
  i,
  card,
  radioSelected,
  selectAddress,
  removeAddressCard,
}) => {
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    if (i === radioSelected) setChecked(true);
    else setChecked(false);
  }, [radioSelected]);

  return (
    <div className="address-card-wrapper">
      <div onClick={() => selectAddress(i, card)}>
        <input type="radio" checked={checked} />
        <div className="address-card-info">
          <p>Address: {card.address}</p>
          <p>Floor: {card.floor}</p>
        </div>
      </div>
      <Button text="REMOVE" onClick={() => removeAddressCard(i)} />
    </div>
  );
};

export default AddressCard;
