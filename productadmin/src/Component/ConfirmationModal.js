
import React from 'react';
import './confo.css'
const ConfirmationModal = ({ isOpen, onClose, onConfirm,message }) => {
    console.log(isOpen)
  const handleConfirm = () => {
    onConfirm();
    onClose();
  };

  const handleClose = () => {
    onClose();
  };

  return (
    <>
      {isOpen && (
      
        <div className="confirmation-modal">
          <div className="modal-content">
            <h2>Confirm Deletion</h2>
            <p>{message}</p>
          {message ==='Product deleted successfully'? <button onClick={()=>{
            console.log('hhhh')
             onClose()
          }}>Yes</button> :
             <> <button onClick={handleConfirm}>Yes</button>
              <button onClick={handleClose}>No</button>
              </>}
            </div>
          </div>
        
        
      )}
    </>
  );
};

export default ConfirmationModal;
