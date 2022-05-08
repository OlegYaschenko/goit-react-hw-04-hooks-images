import { useEffect } from 'react';
import propTypes from 'prop-types';
import { Overlay, ModalWindow } from './Modal.styled';

function Modal({ onClose, largeImage }) {
  useEffect(() => {
    const handleKeyDown = event => {
      if (event.code === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  const handleClickBackdrop = event => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  return (
    <Overlay onClick={handleClickBackdrop}>
      <ModalWindow>
        <img src={largeImage} alt="" />
      </ModalWindow>
    </Overlay>
  );
}

Modal.propTypes = {
  onClose: propTypes.func.isRequired,
  largeImage: propTypes.string.isRequired,
};

export default Modal;
