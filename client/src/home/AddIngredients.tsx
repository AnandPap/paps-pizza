import { FC, useEffect, useState } from "react";
import { useAppDispatch } from "../redux/hooks";
import { setPizza } from "../redux/pizza";
import ingredients from "../assets/data/ingredients.json";
import ListItem from "./ListItem";
import Button from "../reusable/Button";
import Modal from "../reusable/Modal";
import ErrorMessage from "../reusable/ErrorMessage";

interface AddIngredientsProps {
  doughSelected: { doughName: string; doughPrice: number };
  openModal: boolean;
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const AddIngredients: FC<AddIngredientsProps> = ({
  doughSelected,
  openModal,
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
  const [error, setError] = useState("");
  const dispatch = useAppDispatch();

  useEffect(() => {
    setError("");
  }, [ingredientsPicked]);

  function addToCart() {
    if (ingredientsPicked.price === 0)
      setError("Please select at least one ingredient.");
    else {
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
      setIngredientsPicked({
        cheese: "",
        olives: "",
        other: [""],
        price: 0,
      });
      setError("");
    }
  }

  return (
    <Modal
      headerTitle="Ingredients"
      openModal={openModal}
      setOpenModal={setOpenModal}
      closeModalFunction={() => {
        setIngredientsPicked({
          cheese: "",
          olives: "",
          other: [""],
          price: 0,
        });
        setError("");
      }}
    >
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
        <div className="add-ingredients-footer">
          <ErrorMessage className="" text={error} />
          <div>
            <Button text="ADD TO CART" onClick={addToCart} />
          </div>
        </div>
      </>
    </Modal>
  );
};

export default AddIngredients;
