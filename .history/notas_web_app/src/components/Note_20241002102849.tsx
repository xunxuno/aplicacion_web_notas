import React from 'react';

interface Note {
  id: string;
  title: string;
  content: string;
  collectionId: string; // Agregar esta propiedad
}


interface NoteProps {
  note: Note;
  onClick: () => void; // Agregar prop para manejar clic en nota
  onDelete: (noteId: string) => void; // Agregar prop para manejar eliminación de nota
}

const Note: React.FC<NoteProps> = ({ note, onClick, onDelete }) => {
  return (
    <div className="note" onClick={onClick} style={{ cursor: 'pointer' }}>
      <h3>{note.title}</h3>
      <p>{note.content}</p>
      <button onClick={(e) => {
        e.stopPropagation(); // Evitar que se active el onClick del contenedor
        onDelete(note.id); // Llamar a onDelete al hacer clic
      }}>Eliminar</button>
    </div>
  );
};

export default Note;
