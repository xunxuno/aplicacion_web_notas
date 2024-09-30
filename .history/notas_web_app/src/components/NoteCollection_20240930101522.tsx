import React from 'react';
import Note from './Note';

interface Note {
  id: string;
  title: string;
  content: string;
}

interface NoteCollectionProps {
  collection: { id: string; notes: Note[] };
  onNoteClick: (noteId: string) => void; // Agregar propiedad para manejar clic en nota
  onCollectionClick: () => void; // Agregar propiedad para manejar clic en colección
}

const NoteCollection: React.FC<NoteCollectionProps> = ({ collection, onNoteClick, onCollectionClick }) => {
  return (
    <div onClick={onCollectionClick} style={{ cursor: 'pointer' }}>
      <h3>{collection.id}</h3>
      {collection.notes.map(note => (
        <Note key={note.id} note={note} onClick={() => onNoteClick(note.id)} /> 
      ))}
    </div>
  );
};

export default NoteCollection;

