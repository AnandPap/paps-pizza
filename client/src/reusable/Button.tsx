import { FC } from "react";

interface ButtonProps {
  className?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  title?: string;
  type?: "button" | "submit" | "reset" | undefined;
  text: string;
}

const Button: FC<ButtonProps> = ({
  className,
  onClick,
  title,
  type = "submit",
  text,
}) => {
  return (
    <button
      className={`button ${className}`}
      onClick={onClick}
      title={title}
      type={type}
    >
      {text}
    </button>
  );
};

export default Button;
