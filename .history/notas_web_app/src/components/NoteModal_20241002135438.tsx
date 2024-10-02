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
    if (title.trim() === '' || content.trim() === '') {
      alert("Por favor, completa todos los campos.");
      return; // Salir de la función si hay campos vacíos
    }

    const newNote: Omit<Note, 'id'> = {
      title,
      content,
      collectionId: activeCollectionId || '', // Asegúrate de que collectionId se pase aquí
    };

    onAddNote(newNote);
    setTitle(''); // Reiniciar el campo de título
    setContent(''); // Reiniciar el campo de contenido
    onClose(); // Cerrar el modal después de guardar
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
