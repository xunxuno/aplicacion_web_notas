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
    if (activeCollectionId) {
      const newNote: Note = {
        id: '', // Puedes dejarlo vacío aquí, se asignará en el reducer
        title,
        content,
        collectionId: activeCollectionId,
      };
      onAddNote(newNote); // Llama a la función onAddNote
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
