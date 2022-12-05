import React, { useState } from "react";
import ListItem from "./ListItem";
import Button from "../../reusable/Button";
import "./AddIngredients.css";
import { useDispatch } from "react-redux";
import { addPizza } from "../../redux/pizzas";
import ingredients from "../../data/ingredients.json";

const AddIngredients = ({
  showAddIngredientsModal,
  setShowAddIngredientsModal,
  doughSelected,
}) => {
  const dispatch = useDispatch();
  const [ingredientsPicked, setIngredientsPicked] = useState({
    cheese: "",
    olives: "",
    other: [],
    price: 0,
  });
  const [previousPrices, setPreviousPrices] = useState({
    cheese: 0,
    olives: 0,
  });

  let className = "modal";
  if (showAddIngredientsModal) className += " display-modal";

  return (
    <div
      className={className}
      onClick={() => setShowAddIngredientsModal(false)}
    >
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-title-and-close-button-wrapper">
          <h1 className="modal-title">Ingredients</h1>
          <span
            className="modal-close-button"
            onClick={() => setShowAddIngredientsModal(false)}
          >
            &times;
          </span>
        </div>
        <div className="ingredients-list">
          <form>
            <h3>Cheese:</h3>
            {ingredients.cheese.map((item, i) => (
              <ListItem
                glutenFree={item.gluten_free}
                name={item.name}
                price={item.price}
                type={item.type}
                previousPrices={previousPrices}
                setPreviousPrices={setPreviousPrices}
                setIngredientsPicked={setIngredientsPicked}
                i={i}
                key={i}
              />
            ))}
          </form>
          <form>
            <h3>Olives:</h3>
            {ingredients.olives.map((item, i) => (
              <ListItem
                glutenFree={item.gluten_free}
                name={item.name}
                price={item.price}
                type={item.type}
                setIngredientsPicked={setIngredientsPicked}
                previousPrices={previousPrices}
                setPreviousPrices={setPreviousPrices}
                i={i + 5}
                key={i}
              />
            ))}
          </form>
          <h3>Other:</h3>
          {ingredients.other.map((item, i) => (
            <ListItem
              glutenFree={item.gluten_free}
              name={item.name}
              price={item.price}
              type={item.type}
              setIngredientsPicked={setIngredientsPicked}
              i={i + 7}
              key={i}
            />
          ))}
        </div>
        <div className="add-to-cart-btn-wrapper">
          <Button
            className="add-to-cart-btn"
            text="+ ADD TO CART"
            onClick={() => {
              let newPizza = {
                pizzaName: doughSelected.doughName,
                pizzaIngredients: [
                  ingredientsPicked.cheese,
                  ingredientsPicked.olives,
                  ...ingredientsPicked.other,
                ],
                pizzaPrice: doughSelected.doughPrice + ingredientsPicked.price,
                numberOfOrders: 1,
              };
              setShowAddIngredientsModal(false);
              dispatch(addPizza(newPizza));
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default AddIngredients;
