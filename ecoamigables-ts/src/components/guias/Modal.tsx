import { useEffect } from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const Modal = ({ isOpen, onClose, children }: ModalProps) => {
  useEffect(() => {
    if (isOpen) {
      // Ocultar navbar cuando se abre el modal
      const navbar = document.querySelector('.navbar-new');
      if (navbar) {
        (navbar as HTMLElement).style.display = 'none';
      }
      // Prevenir scroll del body
      document.body.style.overflow = 'hidden';
    } else {
      // Mostrar navbar cuando se cierra el modal
      const navbar = document.querySelector('.navbar-new');
      if (navbar) {
        (navbar as HTMLElement).style.display = 'block';
      }
      // Restaurar scroll del body
      document.body.style.overflow = 'auto';
    }

    // Cleanup al desmontar el componente
    return () => {
      const navbar = document.querySelector('.navbar-new');
      if (navbar) {
        (navbar as HTMLElement).style.display = 'block';
      }
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className={`modal ${isOpen ? 'show' : ''}`} onClick={onClose}>
      <span className="close" onClick={onClose}>×</span>
      <div className="modal-content-info" onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </div>
  );
};

export default Modal;