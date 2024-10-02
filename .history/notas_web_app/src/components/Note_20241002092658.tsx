import React from 'react';


interface Note {
  id: string;
  title: string;
  content: string;
}

interface NoteProps {
  note: Note;
  onClick: () => void; // Agregar prop para manejar clic en nota
}

const Note: React.FC<NoteProps> = ({ note, onClick }) => {
  const handleDelete = () => {
    if (window.confirm('¿Estás seguro de que deseas eliminar esta nota?')) {
      // Lógica para eliminar la nota
    }
  };

  return (
    <div className="notes" onClick={onClick}>
      <h3>{note.title}</h3>
      <p>{note.content}</p>
      <button onClick={handleDelete}>Eliminar</button>
    </div>
  );
};

export default Note;
