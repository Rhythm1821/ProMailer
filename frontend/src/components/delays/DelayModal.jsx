import React, { useState } from "react";
import { handleInsert, modalStyles } from "../../handlerFunctions/ModalHandler.js";

export default function DelayModal({ isOpen, onClose, addNewNode, closeModal }) {
  const [delay, setDelay] = useState(1);
  const [delayType, setDelayType] = useState('Minutes');

  if (!isOpen) return null;

  return (
    <div style={modalStyles.container}>
      <h3 style={{ fontWeight: 'bold', color: '#333', marginBottom: '16px' }}>Add Delay</h3>
      <input
        type="number"
        name="delay"
        placeholder="Delay in days"
        value={delay}
        onChange={(e) => setDelay(e.target.value)}
        style={modalStyles.input}
      />

      <select
        value={delayType}
        onChange={(e) => setDelayType(e.target.value)}
        style={modalStyles.input}
      >
        <option value="Minutes">Minutes</option>
        <option value="Hours">Hours</option>
        <option value="Days">Days</option>
      </select>
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
        onClick={() => handleInsert(delay,'delay', addNewNode, onClose, closeModal, delayType)}
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
  );
}