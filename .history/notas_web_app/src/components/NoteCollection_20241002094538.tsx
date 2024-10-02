// NoteCollection.tsx
import React from 'react';
import Note from './Note';
import { useDrop } from 'react-dnd';

interface NoteInterface {
  id: string;
  title: string;
  content: string;
}

interface NoteCollectionProps {
  collection: { id: string; notes: NoteInterface[] };
  onNoteClick: (noteId: string) => void;
  onCollectionClick: () => void;
  onNoteMove: (noteId: string, targetCollectionId: string) => void; // Nueva prop para mover notas
}

const NoteCollection: React.FC<NoteCollectionProps> = ({
  collection,
  onNoteClick,
  onCollectionClick,
  onNoteMove,
}) => {
  const [{ isOver }, drop] = useDrop(() => ({
    accept: 'note',
    drop: (item: { id: string }) => {
      onNoteMove(item.id, collection.id);
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  return (
    <div
      ref={drop}
      onClick={onCollectionClick}
      style={{
        cursor: 'pointer',
        backgroundColor: isOver ? 'lightgreen' : 'white',
      }}
    >
      <h3>{collection.id}</h3>
      {collection.notes.map((note) => (
        <Note key={note.id} note={note} onClick={() => onNoteClick(note.id)} onDelete={() => {/* lógica de eliminar */}} />
      ))}
    </div>
  );
};

export default NoteCollection;

