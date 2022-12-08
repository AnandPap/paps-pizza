import React, { useState, useEffect } from "react";
import Card from "../../reusable/Card";
import AddNewAdress from "./AddNewAdress";

const AddressToDeliver = ({ setAddressSelected }) => {
  const [addressCards, setAddressCards] = useState([]);
  const [newAddress, setNewAddress] = useState({ address: "", floor: "" });
  const [addressFillError, setAddressFillError] = useState(false);
  const [radioSelected, setRadioSelected] = useState();

  function handleSubmit(e) {
    e.preventDefault();
    if (newAddress.address.length > 0 && newAddress.floor.length > 0) {
      setAddressCards([...addressCards, newAddress]);
      setNewAddress({ address: "", floor: "" });
      localStorage.setItem(
        "addressCards",
        JSON.stringify([
          ...JSON.parse(localStorage.getItem("addressCards")),
          newAddress,
        ])
      );
    } else setAddressFillError(true);
  }

  function removeAddress(i) {
    localStorage.setItem(
      "addressCards",
      JSON.stringify([
        ...JSON.parse(localStorage.getItem("addressCards")),
        newAddress,
      ])
    );
    setAddressCards((s) => {
      localStorage.setItem(
        "addressCards",
        JSON.stringify([...s.slice(0, i), ...s.slice(i + 1, s.length)])
      );
      return [...s.slice(0, i), ...s.slice(i + 1, s.length)];
    });
    if (radioSelected === i) {
      setAddressSelected({});
      setRadioSelected();
    }
  }

  useEffect(() => {
    let oldAddressCards = JSON.parse(localStorage.getItem("addressCards"));
    if (oldAddressCards !== null) setAddressCards(oldAddressCards);
    else localStorage.setItem("addressCards", JSON.stringify([]));
  }, []);
  return (
    <div className="address-to-deliver">
      <div className="address-to-deliver-title">Address to deliver</div>
      <div className="address-picker">
        {addressCards.map((card, i) => (
          <Card
            key={i}
            card={card}
            i={i}
            radioSelected={radioSelected}
            setRadioSelected={setRadioSelected}
            setAddressSelected={setAddressSelected}
            removeAddress={removeAddress}
          />
        ))}
        <AddNewAdress
          handleSubmit={handleSubmit}
          addressCards={addressCards}
          newAddress={newAddress}
          setNewAddress={setNewAddress}
          addressFillError={addressFillError}
          setAddressFillError={setAddressFillError}
        />
      </div>
    </div>
  );
};

export default AddressToDeliver;
