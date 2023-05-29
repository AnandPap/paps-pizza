import { FC, useState } from "react";
import { useAppDispatch } from "../redux/hooks";
import { setPizza } from "../redux/pizza";
import ingredients from "../assets/data/ingredients.json";
import ListItem from "./ListItem";
import Button from "../reusable/Button";

interface AddIngredientsProps {
  doughSelected: { doughName: string; doughPrice: number };
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const AddIngredients: FC<AddIngredientsProps> = ({
  doughSelected,
  setOpenModal,
}) => {
  const [ingredientsPicked, setIngredientsPicked] = useState({
    cheese: "",
    olives: "",
    other: [""],
    price: 0,
  });
  const [previousPrices, setPreviousPrices] = useState({
    cheese: 0,
    olives: 0,
  });
  const dispatch = useAppDispatch();

  return (
    <>
      <div className="ingredients-list">
        <form>
          <h3>Cheese:</h3>
          {ingredients.cheese.map((item, i) => (
            <ListItem
              key={i}
              i={i}
              glutenFree={item.gluten_free}
              name={item.name}
              price={item.price}
              type={item.type}
              setIngredientsPicked={setIngredientsPicked}
              previousPrices={previousPrices}
              setPreviousPrices={setPreviousPrices}
            />
          ))}
        </form>
        <form>
          <h3>Olives:</h3>
          {ingredients.olives.map((item, i) => (
            <ListItem
              key={i}
              i={i + 5}
              glutenFree={item.gluten_free}
              name={item.name}
              price={item.price}
              type={item.type}
              setIngredientsPicked={setIngredientsPicked}
              previousPrices={previousPrices}
              setPreviousPrices={setPreviousPrices}
            />
          ))}
        </form>
        <h3>Other:</h3>
        {ingredients.other.map((item, i) => (
          <ListItem
            key={i}
            i={i + 7}
            glutenFree={item.gluten_free}
            name={item.name}
            price={item.price}
            type={item.type}
            setIngredientsPicked={setIngredientsPicked}
            previousPrices={previousPrices}
            setPreviousPrices={setPreviousPrices}
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
            dispatch(setPizza({ type: "add", value: newPizza }));
            setOpenModal(false);
          }}
        />
      </div>
    </>
  );
};

export default AddIngredients;
