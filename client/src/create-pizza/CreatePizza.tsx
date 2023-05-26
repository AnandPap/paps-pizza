import { useState } from "react";
import doughData from "../assets/data/types_of_dough.json";
import DoughRow from "./DoughRow";
import AddIngredients from "./AddIngredients";
import Modal from "../reusable/Modal";

const CreatePizza = () => {
  const [doughSelected, setDoughSelected] = useState({
    doughName: "",
    doughPrice: 0,
  });

  return (
    <div className="create-pizza">
      <h2>Create Pizza</h2>
      <div className="dough-rows-container">
        {doughData.data.map((item, i) => (
          <DoughRow
            key={i}
            doughName={item.name}
            doughPrice={item.price}
            doughDesciption={item.desc}
            setDoughSelected={setDoughSelected}
          />
        ))}
      </div>
      <Modal>
        <AddIngredients doughSelected={doughSelected} />
      </Modal>
    </div>
  );
};

export default CreatePizza;
