import { FC } from "react";
import Button from "../reusable/Button";

interface DoughRowProps {
  doughName: string;
  doughPrice: number;
  doughDesciption: string;
  setDoughSelected: React.Dispatch<
    React.SetStateAction<{
      doughName: string;
      doughPrice: number;
    }>
  >;
}

const DoughRow: FC<DoughRowProps> = ({
  doughName,
  doughPrice,
  doughDesciption,
  setDoughSelected,
}) => {
  return (
    <div className="dough-row">
      <div className="dough-name-and-price-container">
        <div className="dough-name">{doughName}</div>
        <div className="dough-price-container">
          <div className="dough-price">{doughPrice}$</div>
          <Button
            className="add-ingredients-button"
            onClick={() => {
              setDoughSelected({
                doughName: doughName,
                doughPrice: doughPrice,
              });
            }}
            title="Add ingredients"
            text="+ADD"
          />
        </div>
      </div>
      <div className="dough-description">{doughDesciption}</div>
    </div>
  );
};

export default DoughRow;
