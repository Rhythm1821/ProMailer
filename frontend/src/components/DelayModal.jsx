import React, { useState } from "react";
import { modalStyles } from "../handlerFunctions/ModalHandler.js";

export default function DelayModal({ isOpen, onClose, onSubmit }) {
  const [delayDays, setDelayDays] = useState(0);

  if (!isOpen) return null;

  return (
    <div style={modalStyles.overlay}>
      <div style={modalStyles.container}>
        <button
          onClick={onClose}
          style={modalStyles.closeButton}
        >
          X
        </button>
        <h3 style={{ fontWeight: 'bold', color: '#333', marginBottom: '16px' }}>Add Delay</h3>
        <input
          type="number"
          name="delayDays"
          placeholder="Delay in days"
          value={delayDays}
          onChange={(e) => setDelayDays(e.target.value)}
          style={modalStyles.input}
        />
        <button
          onClick={onClose}
          style={{
            backgroundColor: '#f3f4f6',
            color: '#333',
            padding: '8px 16px',
            borderRadius: '8px',
            cursor: 'pointer',
            border: 'none',
            marginTop: '16px',
            marginRight: '8px',
          }}
        >
          Cancel
        </button>
        <button
          onClick={() => {
            onSubmit(delayDays);
            onClose();
          }}
          style={{
            backgroundColor: '#3b82f6',
            color: 'white',
            padding: '8px 16px',
            borderRadius: '8px',
            cursor: 'pointer',
            border: 'none',
            marginTop: '16px',
          }}
        >
          Add Delay
        </button>
      </div>
    </div>
  );
}