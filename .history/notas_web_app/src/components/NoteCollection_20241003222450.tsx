import React, { useState } from 'react';
import Note from './Note';
import { useDrop } from 'react-dnd';

// Definición de la interfaz NoteInterface
export interface NoteInterface {
  id: string;
  title: string;
  content: string;
  dateCreated: string; // Asegúrate de incluir todas las propiedades necesarias
  collectionId: string;
}

// Define la interfaz para las props de la colección
interface NoteCollectionProps {
  collection: {
    id: string;
    notes: NoteInterface[];
  };
  onNoteMove: (noteId: string, targetCollectionId: string) => void;
  onDelete: (noteId: string) => void;
}

const NoteCollection: React.FC<NoteCollectionProps> = ({
  collection,
  onNoteMove,
  onDelete,
}) => {
  const [showPanel, setShowPanel] = useState(false); // Estado para manejar el panel de notas

  const [, drop] = useDrop({
    accept: 'NOTE',
    drop: (item: { id: string }) => {
      onNoteMove(item.id, collection.id);
    },
  });

  const togglePanel = () => {
    setShowPanel(!showPanel);
  };

  return (
    <div ref={drop} className="collection">
      <h3 onClick={togglePanel} style={{ cursor: 'pointer' }}>
        Colección {collection.id}
      </h3>

      {showPanel && (
        <div className="collection-notes">
          {collection.notes.map((note) => (
            <Note
              key={note.id}
              note={note}
              onDelete={onDelete}
              onNoteClick={() => {}} // Aquí puedes manejar el clic en la nota
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default NoteCollection;
