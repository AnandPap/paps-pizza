import { FC } from "react";
import { useAppDispatch } from "../redux/hooks";
import { openModal } from "../redux/pizza";
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
  const dispatch = useAppDispatch();

  return (
    <div className="dough-row">
      <div>
        <h3>{doughName}</h3>
        <p>{doughDesciption}</p>
      </div>
      <div>
        <div className="dough-price">{doughPrice}$</div>
        <Button
          className="add-ingredients-button"
          onClick={() => {
            setDoughSelected({
              doughName: doughName,
              doughPrice: doughPrice,
            });
            dispatch(openModal("ingredients"));
          }}
          title="Add ingredients"
          text="+ADD"
        />
      </div>
    </div>
  );
};

export default DoughRow;
