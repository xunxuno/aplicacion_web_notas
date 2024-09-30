import React from 'react';
import Note from './Note';

interface NoteCollectionProps {
  collection: { id: string; notes: any[] };
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
