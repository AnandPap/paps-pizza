import React, { useState, useEffect } from "react";
import Button from "../../reusable/Button";

const AddNewAdress = ({
  handleSubmit,
  addressCards,
  newAddress,
  setNewAddress,
  addressFillError,
  setAddressFillError,
}) => {
  const [toggleAddNewAddress, setToggleAddNewAddress] = useState(false);
  const [showPlusSign, setShowPlusSign] = useState(false);

  useEffect(() => {
    setToggleAddNewAddress(false);
    setShowPlusSign(false);
  }, [addressCards]);

  function handleChange(e, key) {
    setNewAddress({ ...newAddress, [key]: e.target.value });
    setAddressFillError(false);
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
              onChange={(e) => handleChange(e, "address")}
            />
          </div>
          <div className="floor-input">
            <p className="floor-text">Floor:</p>
            <input
              className="add-address-input"
              placeholder="Add floor"
              value={newAddress.floor}
              onChange={(e) => handleChange(e, "floor")}
            />
          </div>
          <div className="buttons-error-wrapper">
            {addressFillError && <div className="fill-error">Error!</div>}
            <div className="add-cancel-buttons-wrapper">
              <Button
                text="ADD"
                type="submit"
                className="add-address-button"
                onClick={(e) => handleSubmit(e)}
              />
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

export default AddNewAdress;
