import React, { useState } from 'react';

interface ModalProps {
  onClose: () => void;
  onGenerate: (command: string) => void;
}

const Modal: React.FC<ModalProps> = ({ onClose, onGenerate }) => {
  const [command, setCommand] = useState('');

  const handleGenerate = () => {
    onGenerate(command);
    setCommand('');
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <input
          type="text"
          value={command}
          onChange={(e) => setCommand(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded"
          placeholder="Enter a command"
        />
        <div className="mt-4 flex justify-end">
          <button
            onClick={handleGenerate}
            className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
          >
            Generate
          </button>
          <button
            onClick={onClose}
            className="bg-gray-300 text-black px-4 py-2 rounded"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;