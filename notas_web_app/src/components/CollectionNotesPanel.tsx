import React from 'react';
import { NoteInterface } from './NoteCollection';
import Note from './Note';

interface CollectionNotesPanelProps {
  notes: NoteInterface[];
  onClose: () => void; // Función para cerrar el panel
  onDelete: (noteId: string) => void;
}

const CollectionNotesPanel: React.FC<CollectionNotesPanelProps> = ({ notes, onClose, onDelete }) => {
  return (
    <div className="collection-notes-panel">
      <button onClick={onClose}>Cerrar</button>
      <h2>Notas de la Colección</h2>
      <div className="notes-list">
        {notes.map(note => (
          <Note key={note.id} note={note} onDelete={onDelete} onNoteClick={() => {}} />
        ))}
      </div>
    </div>
  );
};

export default CollectionNotesPanel;