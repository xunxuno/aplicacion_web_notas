import React from 'react';
import Note from './Note';


interface NoteInterface { // Renombrar la interfaz local
  id: string;
  title: string;
  content: string;
}

interface NoteCollectionProps {
  collection: { id: string; notes: NoteInterface[] };
  onNoteClick: (noteId: string) => void;
  onCollectionClick: () => void;
}

const NoteCollection: React.FC<NoteCollectionProps> = ({ collection, onNoteClick, onCollectionClick }) => {
  return (
    <div className="note-collection" onClick={onCollectionClick} style={{ cursor: 'pointer' }}>
      <h3>{collection.id}</h3>
      {collection.notes.map(note => (
        <Note key={note.id} note={note} onClick={() => onNoteClick(note.id)} />
      ))}
    </div>
  );
};

export default NoteCollection;
