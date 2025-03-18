import React, { useState } from "react";
import { handleInsert } from "../../handlerFunctions/ModalHandler.js";

export default function DelayModal({ isOpen, onClose, addNewNode, closeModal }) {
  const [delay, setDelay] = useState(1);
  const [delayType, setDelayType] = useState('Minutes');

  if (!isOpen) return null;

  return (
    <div className="bg-white p-5 rounded-lg w-full max-w-lg max-h-full overflow-y-auto relative">
      <h3 className="font-bold text-gray-800 mb-4">Add Delay</h3>
      <input
        type="number"
        name="delay"
        placeholder="Delay in days"
        value={delay}
        onChange={(e) => setDelay(e.target.value)}
        className="w-full p-2 mb-4 border border-gray-300 text-black rounded"
      />

      <select
        value={delayType}
        onChange={(e) => setDelayType(e.target.value)}
        className="w-full p-2 mb-4 border text-black rounded"
      >
        <option value="Minutes">Minutes</option>
        <option value="Hours">Hours</option>
        <option value="Days">Days</option>
      </select>
      <button
        onClick={onClose}
        className="bg-gray-200 text-gray-800 py-2 px-4 rounded cursor-pointer border-none mt-4 mr-2"
      >
        Cancel
      </button>
      <button
        onClick={() => handleInsert(delay, 'delay', addNewNode, onClose, closeModal, delayType)}
        className="bg-blue-500 text-white py-2 px-4 rounded cursor-pointer border-none mt-4"
      >
        Add Delay
      </button>
    </div>
  );
}