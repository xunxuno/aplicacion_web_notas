// Note.tsx
import React from 'react';
import { NoteInterface } from './NoteCollection'; // Asegúrate de que esta importación sea correcta

export interface NoteProps {
  note: NoteInterface;
  onDelete: (noteId: string) => void;
  onNoteClick: (noteId: string) => void;
  onClick: () => void; // Método que maneja el clic en la nota
}

const Note: React.FC<NoteProps> = ({ note, onDelete, onNoteClick, onClick }) => {
  return (
    <div className="note" onClick={onClick}>
      <h4>{note.title}</h4>
      <p>{note.content}</p>
      <button onClick={() => onDelete(note.id)}>Eliminar</button>
    </div>
  );
};

export default Note;
