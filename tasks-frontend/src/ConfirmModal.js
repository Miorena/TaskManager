import './ConfirmModal.css';

function ConfirmModal({ isOpen, onClose, onConfirm, title, message, confirmText, cancelText, type }) {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className={`modal-icon ${type}`}>
          {type === 'danger' && '⚠️'}
          {type === 'warning' && '🗑️'}
          {type === 'success' && '✅'}
          {type === 'info' && 'ℹ️'}
        </div>
        
        <h2 className="modal-title">{title}</h2>
        <p className="modal-message">{message}</p>
        
        <div className="modal-buttons">
          <button className="modal-btn cancel-btn" onClick={onClose}>
            {cancelText || 'Cancel'}
          </button>
          <button className={`modal-btn confirm-btn ${type}`} onClick={onConfirm}>
            {confirmText || 'Confirm'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmModal;