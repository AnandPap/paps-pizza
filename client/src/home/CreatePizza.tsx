import { useState } from "react";
import doughData from "../assets/data/types_of_dough.json";
import DoughRow from "./DoughRow";
import AddIngredients from "./AddIngredients";

const CreatePizza = () => {
  const [doughSelected, setDoughSelected] = useState({
    doughName: "",
    doughPrice: 0,
  });
  const [openModal, setOpenModal] = useState(false);

  function selectDough(name: string, price: number) {
    setDoughSelected({
      doughName: name,
      doughPrice: price,
    });
    setOpenModal(true);
  }

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
            selectDough={selectDough}
          />
        ))}
      </div>
      <AddIngredients
        doughSelected={doughSelected}
        openModal={openModal}
        setOpenModal={setOpenModal}
      />
    </div>
  );
};

export default CreatePizza;
