import React from 'react';
import Note from './Note';

interface NoteInterface {
  id: string;
  title: string;
  content: string;
  collectionId: string;
}

interface NoteCollectionProps {
  collection: {
    id: string;
    notes: NoteInterface[]; 
  };
  onNoteClick: (noteId: string) => void;
  onCollectionClick: () => void;
  onNoteMove: (noteId: string, targetCollectionId: string) => void;
  onDelete: (noteId: string) => void;
}


const NoteCollection: React.FC<NoteCollectionProps> = ({
  collection,
  onNoteClick,
  onCollectionClick,
  onNoteMove,
  onDelete,
}) => {
  return (
    <div onClick={onCollectionClick} style={{ cursor: 'pointer' }}>
      <h3>{collection.id}</h3>
      {collection.notes.length > 0 ? ( 
        collection.notes.map(note => (
          <Note
            key={note.id}
            note={note} 
            onClick={() => onNoteClick(note.id)}
            onDelete={() => onDelete(note.id)} // Función para eliminar la nota
          />
        ))
      ) : (
        <p>No hay notas en esta colección.</p> // Mensaje para colecciones vacías
      )}
    </div>
  );
};

export default NoteCollection;
