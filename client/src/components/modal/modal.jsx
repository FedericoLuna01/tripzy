import {
  Description,
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import "./modal.css";

export const Modal = ({
  onSubmit,
  isOpen,
  handleClose,
  buttonTitle = "Eliminar",
  children,
}) => {
  return (
    <Dialog open={isOpen} onClose={handleClose} className="modal" transition>
      <DialogBackdrop className="modal-backdrop" />
      <div className="modal-container">
        <DialogPanel transition className="modal-panel">
          {children}
          <div className="button-container">
            <button className="button button-secondary" onClick={handleClose}>
              Cancel
            </button>
            <button className="button button-destructive" onClick={onSubmit}>
              {buttonTitle}
            </button>
          </div>
        </DialogPanel>
      </div>
    </Dialog>
  );
};

export const ModalTitle = ({ children }) => {
  return <DialogTitle className="modal-title">{children}</DialogTitle>;
};

export const ModalDescription = ({ children }) => {
  return <Description className="modal-description">{children}</Description>;
};
