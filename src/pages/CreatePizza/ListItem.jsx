import React, { useState } from "react";
import noGluten from "../../assets/images/noGluten.png";

const ListItem = ({
  glutenFree,
  name,
  price,
  type,
  previousPrices,
  setPreviousPrices,
  setIngredientsPicked,
  i,
}) => {
  const [checked, setChecked] = useState(false);

  function addIngredient() {
    if (type === "other") {
      setChecked(!checked);
      if (!checked) {
        setIngredientsPicked((s) => {
          return { ...s, other: [...s.other, name], price: s.price + price };
        });
      } else {
        setIngredientsPicked((s) => {
          const newArray = s.other.filter((value) => value !== name);
          return { ...s, other: [...newArray], price: s.price - price };
        });
      }
    } else if (type === "cheese") {
      setPreviousPrices((s) => ({ ...s, cheese: price }));
      setIngredientsPicked((s) => {
        return {
          ...s,
          cheese: name,
          price: s.price + price - previousPrices.cheese,
        };
      });
    } else if (type === "olives") {
      setPreviousPrices((s) => ({ ...s, olives: price }));
      setIngredientsPicked((s) => {
        return {
          ...s,
          olives: name,
          price: s.price + price - previousPrices.olives,
        };
      });
    }
  }

  return (
    <div className="list-item">
      <div className="list-item-left-side-container">
        {glutenFree ? (
          <img
            className="no-gluten-icon"
            src={noGluten}
            alt=""
            title="No Gluten"
          />
        ) : (
          <div className="no-gluten-icon"></div>
        )}
        {type === "other" ? (
          <input
            type="checkbox"
            id={i}
            className="checkbox-input"
            checked={checked}
            name={type}
            onChange={addIngredient}
          />
        ) : (
          <input
            type="radio"
            id={i}
            className="radio-input"
            name={type}
            onClick={addIngredient}
          />
        )}
        <label htmlFor={i}>{name}</label>
      </div>
      <div>{price}$</div>
    </div>
  );
};

export default ListItem;
