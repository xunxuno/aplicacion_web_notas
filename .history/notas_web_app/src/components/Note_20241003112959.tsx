import React from 'react';
import { useDrag } from 'react-dnd';
import { NoteInterface } from './NoteCollection';

interface NoteProps {
  note: NoteInterface;
  onDelete: (noteId: string) => void;
  onNoteClick: (noteId: string) => void;
}

const Note: React.FC<NoteProps> = ({ note, onDelete, onNoteClick }) => {
  // Configuración del drag source
  const [{ isDragging }, drag] = useDrag({
    type: 'NOTE',
    item: { id: note.id, collectionId: note.collectionId },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const handleDelete = () => onDelete(note.id);

  return (
    <div
      ref={drag} // Referencia para que el drag and drop funcione
      className="note" // Agregamos la clase para los estilos
      style={{
        opacity: isDragging ? 0.5 : 1, // Cambia la opacidad mientras se arrastra
        cursor: 'move', // Cambia el cursor a "move" cuando se puede arrastrar
      }}
      onClick={() => onNoteClick(note.id)}
    >
      <div className="note-title">{note.title} (Colección {note.collectionId})</div>
      <div className="note-content">{note.content}</div>
      <button className="delete-button" onClick={handleDelete}>Eliminar Nota</button>
    </div>
  );
};

export default Note;

