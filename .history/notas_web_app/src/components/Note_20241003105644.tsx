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
      style={{
        opacity: isDragging ? 0.5 : 1, // Cambia la opacidad mientras se arrastra
        padding: '10px',
        border: '1px solid #ccc',
        marginBottom: '10px',
        cursor: 'move', // Cambia el cursor a "move" cuando se puede arrastrar
        backgroundColor: '#fff',
        borderRadius: '5px',
      }}
      onClick={() => onNoteClick(note.id)}
    >
      <h4>{note.title} (Colección {note.collectionId})</h4>
      <p>{note.content}</p>
      <button onClick={handleDelete}>Eliminar Nota</button>
    </div>
  );
};

export default Note;
