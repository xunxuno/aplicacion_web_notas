import React, { useState } from 'react';

interface Note {
  id: string;
  title: string;
  content: string;
  collectionId: string; // Asegúrate de que esto esté aquí
}

interface NoteModalProps {
  onClose: () => void;
  onAddNote: (note: Note) => void;
  activeCollectionId: string | null; // Permitir null aquí
}


const NoteModal: React.FC<NoteModalProps> = ({ onClose, onAddNote, activeCollectionId }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleSave = () => {
    const newNote: Note = {
      id: Date.now().toString(), // Generar un ID único
      title,
      content,
      collectionId: activeCollectionId, // Asegúrate de asignar `collectionId`
    };
    onAddNote(newNote);
    onClose(); // Cerrar el modal después de agregar la nota
  };

  return (
    <div>
      <h3>Add Note</h3>
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
      <button onClick={onClose}>Cancel</button>
      <button onClick={handleSave}>Save</button>
    </div>
  );
};

export default NoteModal;
