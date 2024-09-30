import React, { useState } from 'react';

const NoteModal = ({ isOpen, onClose, onSave }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  if (!isOpen) return null;

  return (
    <div style={{ backgroundColor: '#fff', padding: '20px', borderRadius: '10px' }}>
      <input value={title} onChange={e => setTitle(e.target.value)} placeholder="Título" />
      <textarea value={content} onChange={e => setContent(e.target.value)} placeholder="Contenido" />
      <button onClick={() => onSave({ title, content })}>Guardar</button>
      <button onClick={onClose}>Cancelar</button>
    </div>
  );
};

export default NoteModal;