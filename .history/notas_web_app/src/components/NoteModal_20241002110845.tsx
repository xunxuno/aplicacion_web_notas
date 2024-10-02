import React, { useState } from 'react';

interface Note {
  id: string;            // ID de la nota
  title: string;         // Título de la nota
  content: string;       // Contenido de la nota
  collectionId: string;  // ID de la colección a la que pertenece
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
    if (activeCollectionId) {
      const newNote: Omit<Note, 'id'> = {
        title,
        content,
        collectionId: activeCollectionId,
      };
      onAddNote(newNote); // Solo pasamos la nueva nota sin el ID
      onClose(); // Cierra el modal
    } else {
      alert('Debes seleccionar una colección para agregar una nota.'); // Mensaje de advertencia
    }
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
