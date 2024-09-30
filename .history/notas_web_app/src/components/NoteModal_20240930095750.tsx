import React, { useState } from 'react';

interface NoteModalProps {
  onClose: () => void;
  onSave: (note: { title: string; content: string; category?: string; tags?: string[] }) => void;
}

const NoteModal: React.FC<NoteModalProps> = ({ onClose, onSave }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('');
  const [tags, setTags] = useState('');

  const handleSave = () => {
    // Llamar a la función onSave con los valores actuales
    onSave({
      title,
      content,
      category: category || undefined,
      tags: tags ? tags.split(',').map(tag => tag.trim()) : undefined, // Convierte la cadena de etiquetas en un array
    });
    onClose(); // Cerrar el modal después de guardar
  };

  return (
    <div style={{ padding: '20px', backgroundColor: 'white', borderRadius: '8px' }}>
      <h3>Add Note</h3>
      
      <label>
        Title:
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter note title"
        />
      </label>
      
      <label>
        Content:
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Enter note content"
        />
      </label>
      
      <label>
        Category (optional):
        <input
          type="text"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          placeholder="Enter category"
        />
      </label>
      
      <label>
        Tags (optional, comma-separated):
        <input
          type="text"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
          placeholder="Enter tags"
        />
      </label>

      <button onClick={onClose}>Cancel</button>
      <button onClick={handleSave}>Save</button>
    </div>
  );
};

export default NoteModal;
