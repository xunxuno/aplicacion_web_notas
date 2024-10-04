import React, { useState } from 'react';

interface EditNoteModalProps {
  note: { id: string; title: string; content: string; collectionId: string };
  onClose: () => void; // Función para cerrar el modal
  onSave: (note: { id: string; title: string; content: string; collectionId: string }) => void; // Función para guardar los cambios
}

const EditNoteModal: React.FC<EditNoteModalProps> = ({ note, onClose, onSave }) => {
  const [title, setTitle] = useState(note.title);
  const [content, setContent] = useState(note.content);

  const handleSave = () => {
    onSave({ ...note, title, content }); // Guarda los cambios
    onClose(); // Cierra el modal
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Editar Nota</h2>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Título"
        />
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Contenido"
        />
        <button onClick={handleSave}>Guardar</button>
        <button onClick={onClose}>Cerrar</button>
      </div>
    </div>
  );
};

export default EditNoteModal;
