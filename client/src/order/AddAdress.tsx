import { useState, useEffect, FC } from "react";
import Button from "../reusable/Button";
import { Address } from "./DeliveryAddress";

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
  const [addressFillError, setAddressFillError] = useState(false);
  const localStorageItem = localStorage.getItem("addressCards");

  useEffect(() => {
    setToggleAddNewAddress(false);
    setShowPlusSign(false);
  }, [addressCards]);

  function handleChange(key: string, value: string) {
    setNewAddress({ ...newAddress, [key]: value });
    setAddressFillError(false);
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
    } else setAddressFillError(true);
  }

  return toggleAddNewAddress ? (
    <div className="add-new-address-wrapper">
      <div className="add-new-address">
        <form
          onSubmit={(e) => handleSubmit(e)}
          className="add-new-address-form"
        >
          <div className="address-input">
            <p className="address-text">Address:</p>
            <input
              className="add-address-input"
              placeholder="Add address"
              value={newAddress.address}
              onChange={(e) => handleChange("address", e.target.value)}
            />
          </div>
          <div className="floor-input">
            <p className="floor-text">Floor:</p>
            <input
              className="add-address-input"
              placeholder="Add floor"
              value={newAddress.floor}
              onChange={(e) => handleChange("floor", e.target.value)}
            />
          </div>
          <div className="buttons-error-wrapper">
            {addressFillError && (
              <div className="address-fill-error">Error!</div>
            )}
            <div className="add-cancel-buttons-wrapper">
              <Button text="ADD" type="submit" className="add-address-button" />
              <Button
                text="CANCEL"
                className="cancel-address-button"
                onClick={() => {
                  setToggleAddNewAddress(false);
                  setShowPlusSign(false);
                  setAddressFillError(false);
                  setNewAddress({ address: "", floor: "" });
                }}
              />
            </div>
          </div>
        </form>
      </div>
    </div>
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
