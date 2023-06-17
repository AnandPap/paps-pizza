import { useState, FC, ReactNode } from "react";

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
  const [clickedInsideModal, setClickedInsideModal] = useState(false);
  const turnOffClickedInside = () => setClickedInsideModal(false);

  return openModal ? (
    <div
      className="modal-cover"
      onClick={() => {
        if (!clickedInsideModal) closeModal();
        else turnOffClickedInside();
      }}
    >
      <div
        className={`modal ${className || ""}`}
        onClick={(e) => e.stopPropagation()}
        onMouseDown={() => {
          setClickedInsideModal(true);
        }}
        onMouseUp={turnOffClickedInside}
        onDragEnd={turnOffClickedInside}
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
