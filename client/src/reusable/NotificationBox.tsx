import { FC } from "react";
import success from "../assets/images/success.svg";
import error from "../assets/images/error.svg";

interface NotificationBoxProps {
  text: string;
  show: boolean;
  type: "success" | "error" | undefined;
}

const NotificationBox: FC<NotificationBoxProps> = ({ text, show, type }) => {
  const src =
    type === "success" ? success : type === "error" ? error : undefined;
  return (
    <div className={`notification-box ${type} ${show ? "show" : ""}`}>
      <p>{text}</p>
      <img src={src} alt={type} />
    </div>
  );
};

export default NotificationBox;
