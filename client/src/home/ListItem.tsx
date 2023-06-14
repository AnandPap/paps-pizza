import { FC } from "react";
import noGluten from "../assets/images/noGluten.png";

interface ListItemProps {
  i: number;
  glutenFree: boolean;
  name: string;
  price: number;
  type: string;
  addIngredient: (name: string, price: number, type: string) => void;
}

const ListItem: FC<ListItemProps> = ({
  i,
  glutenFree,
  name,
  price,
  type,
  addIngredient,
}) => {
  const inputType = type === "other" ? "checkbox" : "radio";

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
        <input
          type={inputType}
          id={i.toString()}
          className={`${inputType}-input`}
          name={type}
          onChange={() => addIngredient(name, price, type)}
        />
        <label htmlFor={i.toString()}>{name}</label>
      </div>
      <div>{price}$</div>
    </div>
  );
};

export default ListItem;
