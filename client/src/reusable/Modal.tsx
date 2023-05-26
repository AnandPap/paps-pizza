import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { closeModal } from "../redux/pizza";
import { FC, ReactNode } from "react";

interface ModalProps {
  children: ReactNode;
}

const Modal: FC<ModalProps> = ({ children }) => {
  const modal = useAppSelector((s) => s.pizza.modal);
  const dispatch = useAppDispatch();

  return modal.display ? (
    <div className="modal" onClick={() => dispatch(closeModal())}>
      {children}
    </div>
  ) : null;
};

export default Modal;
