// CollectionNotesPanel.tsx
import React from 'react';
import { NoteInterface } from './NoteCollection'; // Asegúrate de importar correctamente la interfaz NoteInterface
import Note from './Note';

interface CollectionNotesPanelProps {
  notes: NoteInterface[];
  onClose: () => void;
  onDelete: (noteId: string) => void;
  onEdit: (note: NoteInterface) => void; // Añadir la propiedad onEdit
}

const CollectionNotesPanel: React.FC<CollectionNotesPanelProps> = ({ notes, onClose, onDelete, onEdit }) => {
  return (
    <div className="collection-notes-panel">
      <button onClick={onClose}>Cerrar</button>
      <div>
        {notes.map(note => (
          <Note
            key={note.id}
            note={note}
            onDelete={onDelete}
            onNoteClick={() => { /* Aquí podrías manejar clics para mostrar detalles de la nota si es necesario */ }}
            onEdit={onEdit} // Pasar onEdit a cada nota
          />
        ))}
      </div>
    </div>
  );
};

export default CollectionNotesPanel;

