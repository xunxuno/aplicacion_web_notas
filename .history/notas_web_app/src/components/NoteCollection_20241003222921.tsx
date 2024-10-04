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
  const [isExpanded, setIsExpanded] = useState(false);

  const [, drop] = useDrop({
    accept: 'NOTE',
    drop: (item: { id: string }) => {
      onNoteMove(item.id, collection.id);
    },
  });

  const sortedNotes = [...collection.notes].sort(
    (a, b) => new Date(b.dateCreated).getTime() - new Date(a.dateCreated).getTime()
  );

  const recentNote = sortedNotes[0];

  const toggleCollection = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div ref={drop} className="collection">
      <h3 onClick={onCollectionClick} style={{ cursor: 'pointer' }}>
        Colección {collection.id}
      </h3>

      <div className="collection-notes">
        {recentNote && (
          <Note
            note={{ ...recentNote, collectionId: collection.id }}
            onDelete={onDelete}
            onNoteClick={onNoteClick}
            onClick={toggleCollection} // Asegúrate de que onClick esté aquí
          />
        )}

        {isExpanded && (
          <div className="expanded-notes">
            {sortedNotes.slice(1).map((note) => (
              <Note
                key={note.id}
                note={{ ...note, collectionId: collection.id }}
                onDelete={onDelete}
                onNoteClick={onNoteClick}
                onClick={() => onNoteClick(note.id)} // Asegúrate de que onClick esté aquí también
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default NoteCollection;
