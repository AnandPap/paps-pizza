import { useState, useEffect, FC } from "react";
import AddressCard from "./AddressCard";
import AddAdressCard from "./AddAdressCard";

export interface Address {
  address: string;
  floor: string;
}

interface DeliveryAddressProps {
  setAddressSelected: React.Dispatch<React.SetStateAction<Address>>;
}

const DeliveryAddress: FC<DeliveryAddressProps> = ({ setAddressSelected }) => {
  const [addressCards, setAddressCards] = useState<Address[]>([]);
  const [radioSelected, setRadioSelected] = useState<number | null>(null);

  useEffect(() => {
    const localItem = localStorage.getItem("addressCards");
    if (localItem) {
      const parsedLocalItem = JSON.parse(localItem);
      if (parsedLocalItem.constructor === Array) {
        setAddressCards(parsedLocalItem);
        const sessionItem = sessionStorage.getItem("radioSelected");
        if (sessionItem) {
          const parsedSessionItem = JSON.parse(sessionItem);
          if (typeof parsedSessionItem === "number") {
            setRadioSelected(parsedSessionItem);
            setAddressSelected(parsedLocalItem[parsedSessionItem]);
          }
        }
      }
    }
  }, []);

  function selectAddress(i: number, card: Address) {
    setRadioSelected(i);
    setAddressSelected(card);
    sessionStorage.setItem("radioSelected", i + "");
  }

  function removeAddressCard(i: number) {
    const newAddressCards = [
      ...addressCards.slice(0, i),
      ...addressCards.slice(i + 1, addressCards.length),
    ];
    setAddressCards(newAddressCards);
    localStorage.setItem("addressCards", JSON.stringify(newAddressCards));
    if (i === radioSelected) {
      sessionStorage.removeItem("radioSelected");
      setAddressSelected({
        address: "",
        floor: "",
      });
      setRadioSelected(null);
    }
  }

  return (
    <div className="delivery-address">
      <h2>Delivery address</h2>
      <div className="address-picker">
        {addressCards.map((card, i) => (
          <AddressCard
            key={i}
            i={i}
            card={card}
            radioSelected={radioSelected}
            selectAddress={selectAddress}
            removeAddressCard={removeAddressCard}
          />
        ))}
        <AddAdressCard
          addressCards={addressCards}
          setAddressCards={setAddressCards}
        />
      </div>
    </div>
  );
};

export default DeliveryAddress;
