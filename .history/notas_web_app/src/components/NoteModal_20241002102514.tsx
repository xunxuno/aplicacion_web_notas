import React, { useState } from 'react';

interface Note {
  id: string;
  title: string;
  content: string;
}

interface NoteModalProps {
  onClose: () => void;
  onAddNote: (note: Note) => void;
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
    console.log("Guardando nota:", newNote); // Verifica la nota que se está guardando
    onAddNote(newNote); // Llama a la función para agregar la nota
    onClose(); // Cerrar el modal después de agregar la nota
  };
  

  return (
    <div>
      <h3>Agregar Nota</h3>
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
      <button onClick={onClose}>Cancelar</button>
      <button onClick={handleSave}>Guardar</button>
    </div>
  );
};

export default NoteModal;
