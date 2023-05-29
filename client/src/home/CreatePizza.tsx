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
  const [openModal, setOpenModal] = useState(false);

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
            setOpenModal={setOpenModal}
          />
        ))}
      </div>
      {location.pathname === "/" && (
        <Modal
          headerTitle="Ingredients"
          openModal={openModal}
          setOpenModal={setOpenModal}
        >
          <AddIngredients
            doughSelected={doughSelected}
            setOpenModal={setOpenModal}
          />
        </Modal>
      )}
    </div>
  );
};

export default CreatePizza;
