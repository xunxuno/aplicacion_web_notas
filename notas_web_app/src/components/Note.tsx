import React from 'react';

interface NoteProps {
  note: { id: string; title: string; content: string };
}

const Note: React.FC<NoteProps> = ({ note }) => {
  return (
    <div style={{ padding: '20px', backgroundColor: '#FFFAE3', borderRadius: '8px', margin: '10px' }}>
      <h3>{note.title}</h3>
      <p>{note.content}</p>
    </div>
  );
};

export default Note;
