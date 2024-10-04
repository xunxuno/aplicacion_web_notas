import React, { useState } from 'react';
import Note from './Note';
import { useDrop } from 'react-dnd';

export interface NoteInterface {
  id: string;
  title: string;
  content: string;
  dateCreated: string;
  collectionId: string;
}

interface NoteCollectionProps {
  collection: NoteCollectionInterface;
  onNoteClick: (noteId: string) => void;
  onCollectionClick: () => void;
  onNoteMove: (noteId: string, targetCollectionId: string) => void;
  onDelete: (noteId: string) => void;
}

const NoteCollection: React.FC<NoteCollectionProps> = ({
  collection,
  onNoteMove,
  onNoteClick,
  onCollectionClick,
  onDelete,
}) => {
  const [isExpanded, setIsExpanded] = useState(false); // Estado para manejar la expansión/colapso

  const [, drop] = useDrop({
    accept: 'NOTE',
    drop: (item: { id: string }) => {
      onNoteMove(item.id, collection.id);
    },
  });

  // Ordenar las notas por fecha de creación, más reciente primero
  const sortedNotes = [...collection.notes].sort(
    (a, b) => new Date(b.dateCreated).getTime() - new Date(a.dateCreated).getTime()
  );

  const recentNote = sortedNotes[0]; // La nota más reciente

  // Cambiar el estado de la colección cuando se hace clic en la nota
  const toggleCollection = () => {
    setIsExpanded(!isExpanded); // Cambia el estado de expansión
  };

  return (
    <div ref={drop} className="collection">
      <h3 onClick={onCollectionClick} style={{ cursor: 'pointer' }}>
        Colección {collection.id}
      </h3>

      <div className="collection-notes">
        {/* Renderizar la nota más reciente */}
        {recentNote && (
          <Note
            note={{ ...recentNote, collectionId: collection.id }}
            onDelete={onDelete}
            onNoteClick={onNoteClick}
            onClick={toggleCollection} // Asegúrate de pasar esta propiedad
          />
        )}

        {/* Mostrar el resto de las notas si isExpanded es true */}
        {isExpanded && (
          <div className="expanded-notes">
            {sortedNotes.slice(1).map((note) => (
              <Note
                key={note.id}
                note={{ ...note, collectionId: collection.id }}
                onDelete={onDelete}
                onNoteClick={onNoteClick}
                onClick={() => onNoteClick(note.id)} // Asegúrate de pasar esta propiedad
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default NoteCollection;
