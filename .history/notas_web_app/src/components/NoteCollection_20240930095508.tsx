import React from 'react';
import Note from './Note';

// Definir el tipo de nota
interface Note {
  id: string;
  title: string;
  content: string;
}

// Definir las props del componente NoteCollection
interface NoteCollectionProps {
  collection: { id: string; notes: Note[] }; // Usamos el tipo Note en lugar de any[]
}

const NoteCollection: React.FC<NoteCollectionProps> = ({ collection }) => {
  return (
    <div>
      <h3>{collection.id}</h3>
      {collection.notes.map(note => (
        <Note key={note.id} note={note} />
      ))}
    </div>
  );
};

export default NoteCollection;

