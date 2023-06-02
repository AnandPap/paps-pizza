import { useState, useEffect, FC } from "react";
import Button from "../reusable/Button";
import { Address } from "./DeliveryAddress";
import { capitalizeFirstLetter } from "../helpers/helper-functions";

interface AddAdressProps {
  addressCards: Address[];
  setAddressCards: React.Dispatch<React.SetStateAction<Address[]>>;
  newAddress: Address;
  setNewAddress: React.Dispatch<React.SetStateAction<Address>>;
}

const AddAdress: FC<AddAdressProps> = ({
  addressCards,
  setAddressCards,
  newAddress,
  setNewAddress,
}) => {
  const [toggleAddNewAddress, setToggleAddNewAddress] = useState(false);
  const [showPlusSign, setShowPlusSign] = useState(false);
  const [error, setError] = useState("");
  const localStorageItem = localStorage.getItem("addressCards");

  useEffect(() => {
    setToggleAddNewAddress(false);
    setShowPlusSign(false);
  }, [addressCards]);

  function handleChange(key: string, value: string) {
    if (
      (key === "address" && value.length < 35) ||
      (key === "floor" && value.length < 10)
    ) {
      setNewAddress({ ...newAddress, [key]: value });
      setError("");
    } else {
      let error = capitalizeFirstLetter(key) + " too long!";
      setError(error);
    }
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (newAddress.address.length > 0 && newAddress.floor.length > 0) {
      setAddressCards([...addressCards, newAddress]);
      setNewAddress({ address: "", floor: "" });
      if (localStorageItem)
        localStorage.setItem(
          "addressCards",
          JSON.stringify([...JSON.parse(localStorageItem), newAddress])
        );
    } else setError("Please fill out the form.");
  }

  return toggleAddNewAddress ? (
    <form className="add-address" onSubmit={(e) => handleSubmit(e)}>
      <div>
        <label>Address:</label>
        <input
          autoFocus
          placeholder="Add address"
          value={newAddress.address}
          onChange={(e) => handleChange("address", e.target.value)}
        />
      </div>
      <div>
        <label>Floor:</label>
        <input
          placeholder="Add floor"
          value={newAddress.floor}
          onChange={(e) => handleChange("floor", e.target.value)}
        />
      </div>
      <div className={`address-fill-error ${error && "show-error"}`}>
        {error ? error : "placeholder"}
      </div>
      <div className="address-card-buttons-wrapper">
        <Button
          text="CANCEL"
          type="button"
          onClick={() => {
            setToggleAddNewAddress(false);
            setShowPlusSign(false);
            setError("");
            setNewAddress({ address: "", floor: "" });
          }}
        />
        <Button text="ADD" type="submit" />
      </div>
    </form>
  ) : (
    <div
      className="add-new-card"
      onClick={() => {
        setToggleAddNewAddress(true);
      }}
      onMouseEnter={() => setShowPlusSign(true)}
      onMouseLeave={() => setShowPlusSign(false)}
    >
      <p className="cards-add-new-text">Add new</p>
      {showPlusSign && <i className="bi bi-plus plus-sign"></i>}
    </div>
  );
};

export default AddAdress;
