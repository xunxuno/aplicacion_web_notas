import React from 'react';
import Note from './Note';
import { useDrop } from 'react-dnd';

export interface NoteInterface {  
  id: string;
  title: string;
  content: string;
  collectionId: string; 
}

interface NoteCollectionInterface {
  id: string;
  notes: NoteInterface[];  // Cambié a NoteInterface[]
}

interface NoteCollectionProps {
  collection: NoteCollectionInterface;
  onNoteMove: (noteId: string, targetCollectionId: string) => void;
  onNoteClick: (noteId: string) => void;
  onCollectionClick: () => void;
  onDelete: (noteId: string) => void;
}

const NoteCollection: React.FC<NoteCollectionProps> = ({
  collection,
  onNoteMove,
  onNoteClick,
  onCollectionClick,
  onDelete,
}) => {
  const [, drop] = useDrop({
    accept: 'NOTE',
    drop: (item: { id: string }) => {
      onNoteMove(item.id, collection.id);
    },
  });

  return (
    <div ref={drop} className="collection">
      <h3 onClick={onCollectionClick}>Colección {collection.id}</h3>
      <div className="collection-container">
        {collection.notes.map((note: NoteInterface) => (
          <Note
            key={note.id}
            note={{ ...note, collectionId: collection.id }} 
            onDelete={onDelete}
            onNoteClick={onNoteClick}
          />
        ))}
      </div>
    </div>
  );
};

export default NoteCollection;
