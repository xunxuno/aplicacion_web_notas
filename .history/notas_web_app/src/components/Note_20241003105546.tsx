import React from 'react';
import { useDrag } from 'react-dnd';
import { NoteInterface } from './NoteCollection';


interface Note {
  id: string;
  title: string;
  content: string;
  collectionId: string; 
}
interface NoteProps {
  note: NoteInterface;
  onDelete: (noteId: string) => void;
  onNoteClick: (noteId: string) => void;
}

const Note: React.FC<NoteProps> = ({ note, onDelete, onNoteClick }) => {
  const handleDelete = () => onDelete(note.id);

  return (
    <div onClick={() => onNoteClick(note.id)}>
      <h4>{note.title} (Colección {note.collectionId})</h4>
      <p>{note.content}</p>
      <button onClick={handleDelete}>Eliminar Nota</button>
    </div>
  );
};

export default Note;
