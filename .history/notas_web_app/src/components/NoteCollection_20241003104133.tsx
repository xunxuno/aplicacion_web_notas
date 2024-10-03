import React from 'react';
import Note from './Note';
import { useDrop } from 'react-dnd';

interface NoteInterface {
  id: string;
  title: string;
  content: string;
  collectionId: string;
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
    <div ref={drop} style={{ padding: '10px', backgroundColor: '#f0f0f0', marginBottom: '20px' }}>
      <h3 onClick={onCollectionClick}>Colección {collection.id}</h3>
      {collection.notes.map((note) => (
        <Note key={note.id} note={note} onDelete={onDelete} />
      ))}
    </div>
  );
};

export default NoteCollection;
