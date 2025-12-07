import React from 'react'
import './ConfirmationModal.css'

export default function ConfirmationModal({ 
    isOpen, 
    title = 'Confirm Action',
    message, 
    confirmText = 'Delete',
    cancelText = 'Cancel',
    onConfirm, 
    onCancel,
    type = 'danger' // 'danger', 'warning', 'info'
}) {
    if (!isOpen) return null

    const handleConfirm = () => {
        onConfirm()
    }

    return (
        <div className="confirmation-modal-overlay" onClick={onCancel}>
            <div className="confirmation-modal" onClick={(e) => e.stopPropagation()}>
                <div className={`confirmation-modal-header ${type}`}>
                    <div className="confirmation-icon">
                        {type === 'danger' && '⚠️'}
                        {type === 'warning' && '🚨'}
                        {type === 'info' && 'ℹ️'}
                    </div>
                    <h3>{title}</h3>
                </div>

                <div className="confirmation-modal-body">
                    <p>{message}</p>
                </div>

                <div className="confirmation-modal-actions">
                    <button 
                        className="btn-cancel" 
                        onClick={onCancel}
                        autoFocus
                    >
                        {cancelText}
                    </button>
                    <button 
                        className={`btn-confirm ${type}`} 
                        onClick={handleConfirm}
                    >
                        {confirmText}
                    </button>
                </div>
            </div>
        </div>
    )
}