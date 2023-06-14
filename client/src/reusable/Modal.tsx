import { FC, ReactNode } from "react";

interface ModalProps {
  headerTitle: string;
  className?: string;
  openModal?: boolean;
  closeModal: () => void;
  children: ReactNode;
}

const Modal: FC<ModalProps> = ({
  headerTitle,
  className,
  openModal = true,
  closeModal,
  children,
}) => {
  return openModal ? (
    <div className="modal-cover" onClick={closeModal}>
      <div
        className={`modal ${className || ""}`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal-header">
          <h2>{headerTitle}</h2>
          <span onClick={closeModal}>&times;</span>
        </div>
        {children}
      </div>
    </div>
  ) : null;
};

export default Modal;
