import React, { useState, useContext } from 'react';
import { NotesContext } from '../contexts/NotesContext';
import { NoteInterface } from './NoteCollection'; // Importar la interfaz correcta

interface NoteModalProps {
  onClose: () => void;
  onAddNote: (note: Omit<NoteInterface, 'id'>) => void; // Acepta Omit<NoteInterface, 'id'>
  activeCollectionId: string | null; // ID de la colección activa
}

const NoteModal: React.FC<NoteModalProps> = ({ onClose, onAddNote, activeCollectionId }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const { state } = useContext(NotesContext); 

  const handleSave = () => {
    if (title.trim() === '' || content.trim() === '') {
      alert("Por favor, completa todos los campos.");
      return; // Salir de la función si hay campos vacíos
    }

    const newNote: NoteInterface = {
      id: '', // Puedes dejarlo vacío ya que será generado en el reducer
      title,
      content,
      collectionId: activeCollectionId || '', 
      colorClass: '', // Aquí puedes asignar un valor por defecto o manejarlo más adelante
    };

    console.log("Nueva Nota:", newNote);
    onAddNote(newNote);
    console.log("Estado actualizado de las colecciones: ", state.collections);
    setTitle(''); // Reiniciar el campo de título
    setContent(''); // Reiniciar el campo de contenido
    onClose(); // Cerrar el modal después de guardar
  };

  return (
    <div className="modal-background"> {/* Contenedor del fondo */}
      <div className="modal-content"> {/* Contenedor del contenido del modal */}
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
        <button className="cancel-button" onClick={onClose}>Cancelar</button>
      </div>
    </div>
  );
};


export default NoteModal;