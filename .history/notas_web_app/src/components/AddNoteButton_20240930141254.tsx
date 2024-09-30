import React from 'react';

interface AddNoteButtonProps {
  onClick: () => void;
}

const AddNoteButton: React.FC<AddNoteButtonProps> = ({ onClick }) => {
  return (
    <button onClick={onClick}>
      Add Note
    </button>
  );
};

export default AddNoteButton;
