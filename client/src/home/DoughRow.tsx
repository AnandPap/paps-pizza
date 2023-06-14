import { FC } from "react";
import Button from "../reusable/Button";

interface DoughRowProps {
  doughName: string;
  doughPrice: number;
  doughDesciption: string;
  selectDough: (name: string, price: number) => void;
}

const DoughRow: FC<DoughRowProps> = ({
  doughName,
  doughPrice,
  doughDesciption,
  selectDough,
}) => {
  return (
    <div className="dough-row">
      <div>
        <h3>{doughName}</h3>
        <p>{doughDesciption}</p>
      </div>
      <div>
        <div className="dough-price">{doughPrice}$</div>
        <Button
          onClick={() => selectDough(doughName, doughPrice)}
          title="Add ingredients"
          text="+ADD"
        />
      </div>
    </div>
  );
};

export default DoughRow;
