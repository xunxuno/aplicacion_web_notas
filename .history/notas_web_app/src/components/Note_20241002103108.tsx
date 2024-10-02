import React from 'react';

interface Note {
  id: string;
  title: string;
  content: string;
  collectionId: string; // Propiedad obligatoria
}

interface NoteProps {
  note: Note; // Asegúrate de que `Note` tenga `collectionId`
  onClick: () => void;
  onDelete: () => void;
}

const Note: React.FC<NoteProps> = ({ note, onClick, onDelete }) => {
  return (
    <div className="note" onClick={onClick} style={{ cursor: 'pointer' }}>
      <h3>{note.title}</h3>
      <p>{note.content}</p>
      <button onClick={onDelete}>Eliminar</button> {/* Botón para eliminar la nota */}
    </div>
  );
};

export default Note;
