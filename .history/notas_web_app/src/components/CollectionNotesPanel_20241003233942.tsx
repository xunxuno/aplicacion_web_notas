import React from 'react';
import { NoteInterface } from './NoteCollection';
import Note from './Note';

const CloseIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M18 6L6 18" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M6 6L18 18" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

interface CollectionNotesPanelProps {
  notes: NoteInterface[];
  onClose: () => void; // Función para cerrar el panel
  onDelete: (noteId: string) => void;
}

const CollectionNotesPanel: React.FC<CollectionNotesPanelProps> = ({ notes, onClose, onDelete }) => {
  return (
    <div className="overlay">
      <div className="collection-notes-panel">
        <button className="close-button" onClick={onClose}>
          <CloseIcon /> {/* Ícono de "X" */}
        </button>
        <h2>Notas de la Colección</h2>
        <div className="notes-list">
          {notes.map(note => (
            <Note key={note.id} note={note} onDelete={onDelete} onNoteClick={() => {}} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default CollectionNotesPanel;