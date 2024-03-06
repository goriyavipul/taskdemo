import React from "react";
import { Modal as BsModal } from "react-responsive-modal";

const modalStyle = {
    modal: {
        background: '#001D31',
        borderRadius: '8px',
        padding: '0',
    },
};


const Modal = ({open, onClose, children}) => {
    return (
        <BsModal open={open} onClose={onClose} center={true} showCloseIcon={false} styles={modalStyle}>
            {children}
        </BsModal>
    );
};

export default Modal;
