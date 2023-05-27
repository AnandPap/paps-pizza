import { useNavigate } from "react-router";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { closeModal } from "../redux/pizza";
import { FC, ReactNode } from "react";

interface ModalProps {
  headerTitle: string;
  children: ReactNode;
}

const Modal: FC<ModalProps> = ({ headerTitle, children }) => {
  const modal = useAppSelector((s) => s.pizza.modal);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  return modal.display ? (
    <div
      className="modal-cover"
      onClick={() => {
        if (location.pathname !== "/") navigate("/");
        dispatch(closeModal());
      }}
    >
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>{headerTitle}</h2>
          <span
            onClick={() => {
              navigate("/");
              dispatch(closeModal());
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
