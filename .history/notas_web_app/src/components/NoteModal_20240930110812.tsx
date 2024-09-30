import React, { useState } from 'react';

interface Note {
  id: string;
  title: string;
  content: string;
  // Puedes añadir más propiedades según lo necesites
}

interface NoteModalProps {
  onClose: () => void;
  onAddNote: (note: Note) => void; // Agregar esta propiedad
}

const NoteModal: React.FC<NoteModalProps> = ({ onClose, onAddNote }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleSave = () => {
    const newNote: Note = {
      id: Date.now().toString(), // Generar un ID único
      title,
      content,
    };
    onAddNote(newNote);
    onClose(); // Cerrar el modal después de agregar la nota
  };

  return (
    <div style={{ padding: '20px', backgroundColor: 'white', borderRadius: '8px' }}>
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
