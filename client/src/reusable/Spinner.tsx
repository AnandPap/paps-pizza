import { FC } from "react";
import spinnerGIF from "../assets/images/spinner.gif";

interface SpinnerProps {
  size: string;
}

const Spinner: FC<SpinnerProps> = ({ size }) => {
  return (
    <div className="spinner-wrapper" style={{ width: size, height: size }}>
      <img className="spinner" src={spinnerGIF} alt="Spinner" />
    </div>
  );
};

export default Spinner;
