import React from 'react';
import { useDrag } from 'react-dnd';
import { NoteInterface } from './NoteCollection';

interface NoteProps {
  note: NoteInterface;
  onDelete: (noteId: string) => void;
  onNoteClick: (noteId: string) => void;
}

const Note: React.FC<NoteProps> = ({ note, onDelete, onNoteClick }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'NOTE',
    item: { id: note.id },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  return (
    <div
      ref={drag}
      onClick={() => onNoteClick(note.id)}
      style={{
        opacity: isDragging ? 0.5 : 1,
        border: '1px solid #ccc',
        padding: '8px',
        margin: '4px',
        backgroundColor: 'white',
        cursor: 'move',
      }}
    >
      <h4>{note.title}</h4>
      <p>{note.content}</p>
      <button onClick={(e) => { e.stopPropagation(); onDelete(note.id); }}>Borrar</button>
    </div>
  );
};

export default Note;