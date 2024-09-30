import React from 'react';
import '../styles.css';

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
