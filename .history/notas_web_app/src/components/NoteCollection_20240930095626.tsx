import React from 'react';
import Note from './Note';

// Renombrar la interfaz a `NoteType` para evitar conflictos
interface NoteType {
  id: string;
  title: string;
  content: string;
}

interface NoteCollectionProps {
  collection: { id: string; notes: NoteType[] };
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

