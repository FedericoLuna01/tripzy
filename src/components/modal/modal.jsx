import {
  Description,
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import "./modal.css";

const Modal = ({ entity, onSubmit, onClose, isOpen, handleClose }) => {
  return (
    <Dialog open={isOpen} onClose={onClose} className="modal" transition>
      <DialogBackdrop className="modal-backdrop" />
      {/* Full-screen container to center the panel */}
      <div className="modal-container">
        {/* The actual dialog panel  */}
        <DialogPanel transition className="modal-panel">
          <DialogTitle className="modal-title">Eliminar {entity}</DialogTitle>
          <Description>
            Esto lo va a eliminar permanentemente y no se puede deshacer.
          </Description>
          <p>Estas seguro de que deseas eliminar {entity}?</p>
          <div className="button-container">
            <button className="button button-secondary" onClick={handleClose}>
              Cancel
            </button>
            <button className="button button-destructive" onClick={onSubmit}>
              Eliminar
            </button>
          </div>
        </DialogPanel>
      </div>
    </Dialog>
  );
};

export default Modal;
