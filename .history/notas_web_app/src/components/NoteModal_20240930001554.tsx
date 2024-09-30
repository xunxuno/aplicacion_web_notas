import React from 'react';

interface NoteModalProps {
  onClose: () => void;
}

const NoteModal: React.FC<NoteModalProps> = ({ onClose }) => {
  return (
    <div style={{ padding: '20px', backgroundColor: 'white', borderRadius: '8px' }}>
      <h3>Add Note</h3>
      {/* Inputs for Title, Content, Category, Tags, etc. */}
      <button onClick={onClose}>Cancel</button>
      <button>Save</button>
    </div>
  );
};

export default NoteModal;
