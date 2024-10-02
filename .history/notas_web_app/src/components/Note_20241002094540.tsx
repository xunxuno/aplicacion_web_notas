// Note.tsx
import React from 'react';
import { useDrag } from 'react-dnd';

interface Note {
  id: string;
  title: string;
  content: string;
}

interface NoteProps {
  note: Note;
  onClick: () => void;
  onDelete: () => void; // Nuevo prop para eliminar
}

const Note: React.FC<NoteProps> = ({ note, onClick, onDelete }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'note',
    item: { id: note.id },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    onDelete();
  };

  return (
    <div
      ref={drag}
      className="note"
      onClick={onClick}
      style={{
        cursor: 'pointer',
        opacity: isDragging ? 0.5 : 1,
      }}
    >
      <h3>{note.title}</h3>
      <p>{note.content}</p>
      <button onClick={handleDelete}>Eliminar</button>
    </div>
  );
};

export default Note;

