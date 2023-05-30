import { useNavigate } from "react-router";
import { FC, ReactNode } from "react";

interface ModalProps {
  headerTitle: string;
  className?: string;
  openModal?: boolean;
  setOpenModal?: React.Dispatch<React.SetStateAction<boolean>>;
  children: ReactNode;
}

const Modal: FC<ModalProps> = ({
  headerTitle,
  className,
  openModal = true,
  setOpenModal,
  children,
}) => {
  const navigate = useNavigate();

  return openModal ? (
    <div
      className="modal-cover"
      onClick={() => {
        if (location.pathname !== "/") navigate("/");
        if (setOpenModal) setOpenModal(false);
      }}
    >
      <div
        className={`modal ${className}`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal-header">
          <h2>{headerTitle}</h2>
          <span
            onClick={() => {
              navigate("/");
              if (setOpenModal) setOpenModal(false);
            }}
          >
            &times;
          </span>
        </div>
        {children}
      </div>
    </div>
  ) : null;
};

export default Modal;
