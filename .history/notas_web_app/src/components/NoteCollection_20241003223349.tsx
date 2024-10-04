import React, { useState } from 'react';
import Note from './Note';
import { NoteInterface } from './NoteCollection'; // Verifica esta importación

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

const NoteCollection: React.FC<NoteCollectionProps> = ({ collection, onNoteClick, onCollectionClick, onNoteMove, onDelete }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const sortedNotes = [...collection.notes].sort((a, b) => new Date(b.dateCreated).getTime() - new Date(a.dateCreated).getTime());
  const recentNote = sortedNotes[0];

  const toggleCollection = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="collection">
      <h3 onClick={toggleCollection} style={{ cursor: 'pointer' }}>
        Colección {collection.id}
      </h3>
      {recentNote && (
        <Note
          note={recentNote}
          onDelete={onDelete}
          onNoteClick={() => onNoteClick(recentNote.id)}
          onClick={toggleCollection} // Asegúrate de que esté aquí
        />
      )}
      {isExpanded && (
        <div className="expanded-notes">
          {sortedNotes.map(note => (
            <Note
              key={note.id}
              note={note}
              onDelete={onDelete}
              onNoteClick={() => onNoteClick(note.id)}
              onClick={toggleCollection} // Pasar onClick aquí
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default NoteCollection;
