import React, { useState } from 'react';
import Note from './Note';

interface NoteModalProps {
  onClose: () => void;
  onAddNote: (note: Omit<Note, 'id'>) => void; // Acepta Omit<Note, 'id'>
  activeCollectionId: string | null; // ID de la colección activa
}

const NoteModal: React.FC<NoteModalProps> = ({ onClose, onAddNote, activeCollectionId }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleSave = () => {
    const newNote: Omit<Note, 'id'> = {
      title,
      content,
      collectionId: activeCollectionId || '', // Puedes dejarlo como vacío si ya está definido
    };
    onAddNote(newNote);
    onClose();
  };
  
  

  return (
    <div>
      <h2>Agregar Nota</h2>
      <input
        type="text"
        placeholder="Título"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        placeholder="Contenido"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <button onClick={handleSave}>Guardar</button>
      <button onClick={onClose}>Cancelar</button>
    </div>
  );
};

export default NoteModal;
