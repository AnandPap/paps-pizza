import DoughRow from "./DoughRow";
import doughData from "../assets/data/types_of_dough.json";
import { FC } from "react";

interface PickDoughProps {
  setDoughSelected: React.Dispatch<
    React.SetStateAction<{
      doughName: string;
      doughPrice: number;
    }>
  >;
}

const PickDough: FC<PickDoughProps> = ({ setDoughSelected }) => {
  return (
    <div className="pick-a-dough">
      <div className="pick-a-dough-title-container">
        <div className="pick-a-dough-title">Pick a Dough</div>
      </div>
      <div className="dough-row-container">
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
    </div>
  );
};

export default PickDough;
