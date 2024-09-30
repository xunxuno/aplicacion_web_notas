import React from 'react';

interface AddNoteButtonProps {
  onClick: () => void;
}

const AddNoteButton: React.FC<AddNoteButtonProps> = ({ onClick }) => {
  return (
    <button onClick={onClick} style={{ margin: '20px', borderRadius: '50%' }}>
      Add Note
    </button>
  );
};

export default AddNoteButton;
