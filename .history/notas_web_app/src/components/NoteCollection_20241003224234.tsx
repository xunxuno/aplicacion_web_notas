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
  onNoteClick: (collectionId: string) => void; // Cambié el tipo para pasar el ID de colección
  onCollectionClick: () => void;
  onNoteMove: (noteId: string, targetCollectionId: string) => void;
  onDelete: (noteId: string) => void;
}

const NoteCollection: React.FC<NoteCollectionProps> = ({
  collection,
  onNoteMove,
  onNoteClick, // Esta función ahora recibe el ID de la colección
  onCollectionClick,
  onDelete,
}) => {
  const [, drop] = useDrop({
    accept: 'NOTE',
    drop: (item: { id: string }) => {
      onNoteMove(item.id, collection.id);
    },
  });

  const noteSpacing = 10; // Espaciado entre las notas en píxeles

  return (
    <div ref={drop} className="collection">
      <h3 style={{ display: 'none' }} onClick={onCollectionClick}>
        Colección {collection.id}
      </h3>
      <div className="collection-notes">
        {collection.notes
          .slice() // Crea una copia del array para no mutar el original
          .reverse() // Invierte el orden para que la última nota agregada esté arriba
          .map((note, index) => (
            <div
              key={note.id}
              style={{
                position: 'relative',
                top: `${index * noteSpacing}px`, // Desplaza las notas hacia abajo
                zIndex: collection.notes.length - index, // Asegura que las notas más recientes estén arriba
              }}
            >
              <Note
                note={{ ...note, collectionId: collection.id }}
                onDelete={onDelete}
                onNoteClick={() => onNoteClick(collection.id)} // Llama a onNoteClick con el ID de colección
              />
            </div>
          ))}
      </div>
    </div>
  );
};

export default NoteCollection;
