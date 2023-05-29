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
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const DoughRow: FC<DoughRowProps> = ({
  doughName,
  doughPrice,
  doughDesciption,
  setDoughSelected,
  setOpenModal,
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
          onClick={() => {
            setDoughSelected({
              doughName: doughName,
              doughPrice: doughPrice,
            });
            setOpenModal(true);
          }}
          title="Add ingredients"
          text="+ADD"
        />
      </div>
    </div>
  );
};

export default DoughRow;
