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
  notes: NoteInterface[];
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
      // Lógica para mover la nota dentro de la misma colección
      const noteId = item.id;
      // Aquí puedes decidir dónde mover la nota
      // Por ejemplo, si usas índices para determinar la nueva posición
      const targetIndex = collection.notes.findIndex(note => note.id === noteId);
      if (targetIndex !== -1) {
        // Mueve la nota en la colección
        onNoteMove(noteId, collection.id); // Mantén el mismo id de colección
      }
    },
  });

  return (
    <div ref={drop} className="collection">
      {/* Mantener el encabezado como identificador, pero ocultarlo */}
      <h3 style={{ display: 'none' }} onClick={onCollectionClick}>
        Colección {collection.id}
      </h3>
      <div className="collection-notes">
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