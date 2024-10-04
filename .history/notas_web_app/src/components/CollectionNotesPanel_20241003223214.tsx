// CollectionNotesPanel.tsx
import React from 'react';
import Note from './Note';
import { NoteInterface } from './NoteCollection'; // Ajusta esto si es necesario

interface CollectionNotesPanelProps {
  notes: NoteInterface[];
  onDelete: (noteId: string) => void;
  onNoteClick: (noteId: string) => void;
  onClick: () => void; // Agrega esto si es necesario
}

const CollectionNotesPanel: React.FC<CollectionNotesPanelProps> = ({ notes, onDelete, onNoteClick, onClick }) => {
  return (
    <div className="notes-panel">
      {notes.map(note => (
        <Note
          key={note.id}
          note={note}
          onDelete={onDelete}
          onNoteClick={onNoteClick}
          onClick={onClick} // Asegúrate de pasar onClick aquí
        />
      ))}
    </div>
  );
};

export default CollectionNotesPanel;
