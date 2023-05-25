import { useState, useEffect, FC } from "react";
import Card from "./Card";
import AddAdress from "./AddAdress";

export interface Address {
  address: string;
  floor: string;
}

interface DeliveryAddressProps {
  setAddressSelected: React.Dispatch<React.SetStateAction<Address>>;
}

const DeliveryAddress: FC<DeliveryAddressProps> = ({ setAddressSelected }) => {
  const [addressCards, setAddressCards] = useState<Address[]>([]);
  const [newAddress, setNewAddress] = useState<Address>({
    address: "",
    floor: "",
  });
  const [radioSelected, setRadioSelected] = useState<number | null>(null);
  const localStorageItem = localStorage.getItem("addressCards");

  useEffect(() => {
    if (localStorageItem && JSON.parse(localStorageItem) !== null)
      setAddressCards(JSON.parse(localStorageItem));
    else localStorage.setItem("addressCards", JSON.stringify([]));
  }, []);

  return (
    <div className="address-to-deliver">
      <div className="address-to-deliver-title">Address to deliver</div>
      <div className="address-picker">
        {addressCards.map((card, i) => (
          <Card
            key={i}
            i={i}
            card={card}
            radioSelected={radioSelected}
            setRadioSelected={setRadioSelected}
            setAddressSelected={setAddressSelected}
            newAddress={newAddress}
            setAddressCards={setAddressCards}
          />
        ))}
        <AddAdress
          addressCards={addressCards}
          setAddressCards={setAddressCards}
          newAddress={newAddress}
          setNewAddress={setNewAddress}
        />
      </div>
    </div>
  );
};

export default DeliveryAddress;
