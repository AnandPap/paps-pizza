import { FC, useState } from "react";
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
interface PreviousPrices {
  [key: string]: number;
  cheese: number;
  olives: number;
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
  const [previousPrices, setPreviousPrices] = useState<PreviousPrices>({
    cheese: 0,
    olives: 0,
  });
  const [error, setError] = useState("");
  const dispatch = useAppDispatch();

  function addIngredient(name: string, price: number, type: string) {
    if (type === "other") {
      const otherArray = ingredientsPicked.other;
      if (otherArray.includes(name)) {
        const newOtherArray = otherArray.filter((value) => value !== name);
        setIngredientsPicked((s) => ({
          ...s,
          other: newOtherArray,
          price: s.price - price,
        }));
      } else {
        setIngredientsPicked((s) => ({
          ...s,
          other: [...s.other, name],
          price: s.price + price,
        }));
      }
    } else {
      setPreviousPrices((s) => ({ ...s, [type]: price }));
      setIngredientsPicked((s) => ({
        ...s,
        [type]: name,
        price: s.price + price - previousPrices[type],
      }));
    }
    setError("");
  }

  function addToCart(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
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
      closeModal();
    }
  }

  function closeModal() {
    setOpenModal(false);
    setIngredientsPicked({
      cheese: "",
      olives: "",
      other: [""],
      price: 0,
    });
    setPreviousPrices({
      cheese: 0,
      olives: 0,
    });
    setError("");
  }

  return (
    <Modal
      headerTitle="Ingredients"
      openModal={openModal}
      closeModal={closeModal}
    >
      <form onSubmit={(e) => addToCart(e)}>
        <div className="ingredients-list">
          <h3>Cheese:</h3>
          {ingredients.cheese.map((item, i) => (
            <ListItem
              key={i}
              i={i}
              glutenFree={item.gluten_free}
              name={item.name}
              price={item.price}
              type={item.type}
              addIngredient={addIngredient}
            />
          ))}
          <h3>Olives:</h3>
          {ingredients.olives.map((item, i) => (
            <ListItem
              key={i}
              i={i + 5}
              glutenFree={item.gluten_free}
              name={item.name}
              price={item.price}
              type={item.type}
              addIngredient={addIngredient}
            />
          ))}
          <h3>Other:</h3>
          {ingredients.other.map((item, i) => (
            <ListItem
              key={i}
              i={i + 7}
              glutenFree={item.gluten_free}
              name={item.name}
              price={item.price}
              type={item.type}
              addIngredient={addIngredient}
            />
          ))}
        </div>
        <div className="add-ingredients-footer">
          <ErrorMessage className="" text={error} />
          <div>
            <Button text="ADD TO CART" type="submit" />
          </div>
        </div>
      </form>
    </Modal>
  );
};

export default AddIngredients;
