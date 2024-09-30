import React from 'react';

const AddNoteButton = ({ onClick }) => (
  <button onClick={onClick} style={{ margin: '20px', borderRadius: '50%', backgroundColor: '#f9f9f9' }}>
    Add Note
  </button>
);

export default AddNoteButton;