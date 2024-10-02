import React from 'react';
import Note from './Note';

interface NoteInterface {
  id: string;
  title: string;
  content: string;
}

interface NoteCollectionProps {
  collection: { id: string; notes: NoteInterface[] };
  onNoteClick: (noteId: string) => void;
  onCollectionClick: () => void;
  onNoteMove: (noteId: string, sourceCollectionId: string, targetCollectionId: string) => void;
  onDelete: (noteId: string) => void; // Definir la prop de eliminación
}

const NoteCollection: React.FC<NoteCollectionProps> = ({
  collection,
  onNoteClick,
  onCollectionClick,
  onNoteMove,
  onDelete, // Recibir la función onDelete como prop
}) => {
  return (
    <div onClick={onCollectionClick} style={{ cursor: 'pointer' }}>
      <h3>{collection.id}</h3>
      {collection.notes.map(note => (
        <Note 
          key={note.id} 
          note={note} 
          onClick={() => onNoteClick(note.id)} 
          onDelete={onDelete} // Pasar la función onDelete a Note
        />
      ))}
    </div>
  );
};

export default NoteCollection;
