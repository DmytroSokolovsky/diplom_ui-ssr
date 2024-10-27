import { createPortal } from 'react-dom';
import { useCallback, useEffect, useRef } from 'react';
import s from './Modal.module.scss';

const Modal = ({ onConfirm, onCancel, record }) => {
  const modalRef = useRef(null);
  const firstButtonRef = useRef(null);
  const lastButtonRef = useRef(null);

  const handleKeyDown = useCallback((event) => {
    if (event.key === 'Escape') {
      onCancel();
    }

    if (event.key === 'Tab') {
      const focusableElements = modalRef.current.querySelectorAll('button');
      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];

      if (event.shiftKey) { 
        if (document.activeElement === firstElement) {
          event.preventDefault();
          lastElement.focus();
        }
      } else { 
        if (document.activeElement === lastElement) {
          event.preventDefault();
          firstElement.focus(); 
        }
      }
    }
  }, [onCancel]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    firstButtonRef.current.focus(); 
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return createPortal(
    <div className={s.modal} role="dialog" aria-modal="true" aria-labelledby="modal-title" aria-describedby="modal-description">
      <div className={s.modal__container} ref={modalRef}>
        <div className={s.modal__body}>
          <div id="modal-title" className={s.modal__title}>Ви дійсно бажаєте видалити запис до лікаря {record?.doctor} на {record?.date} о {record.time}?</div>
          <div id="modal-description" className={s.modal__buttons}>
            <button
              className={s.modal__button}
              onClick={onConfirm}
              aria-label="Підтвердити видалення запису"
              ref={firstButtonRef}
            >
              Так
            </button>
            <button
              className={s.modal__button}
              onClick={onCancel}
              aria-label="Скасувати видалення запису"
              ref={lastButtonRef} 
            >
              Ні
            </button>
          </div>
        </div>
      </div>
    </div>,
    document.body,
  );
};

export default Modal;
