import { FC } from "react";

interface NotificationBoxProps {
  text: string;
  show: boolean;
  type: string | null;
}

const NotificationBox: FC<NotificationBoxProps> = ({ text, show, type }) => {
  return <div className={`notification-box ${show ? "show" : ""}`}>{text}</div>;
};

export default NotificationBox;
