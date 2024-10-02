import React from 'react';
// Note.tsx
interface Note {
  id: string;
  title: string;
  content: string;
  collectionId: string; // Asegúrate de que esto esté aquí
}

interface NoteProps {
  note: Note;
  onClick: () => void;
  onDelete: () => void;
}

const Note: React.FC<NoteProps> = ({ note, onClick, onDelete }) => {
  return (
    <div className="note" onClick={onClick} style={{ cursor: 'pointer' }}>
      <h3>{note.title}</h3>
      <p>{note.content}</p>
      <button onClick={onDelete}>Eliminar</button>
    </div>
  );
};

export default Note;
