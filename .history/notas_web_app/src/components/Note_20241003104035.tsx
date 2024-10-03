import React from 'react';
import { useDrag } from 'react-dnd';


interface Note {
  id: string;
  title: string;
  content: string;
  collectionId: string; 
}

interface NoteProps {
  note: Note;
  onClick: () => void;
  onDelete: (id: string) => void;
}

const Note: React.FC<NoteProps> = ({ note, onDelete }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'NOTE',
    item: { id: note.id },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  return (
    <div
      ref={drag} // Referencia para hacer la nota arrastrable
      style={{
        opacity: isDragging ? 0.5 : 1,
        padding: '10px',
        border: '1px solid #ddd',
        borderRadius: '5px',
        backgroundColor: 'white',
        marginBottom: '10px',
      }}
    >
      <h4>{note.title}</h4>
      <p>{note.content}</p>
      <button onClick={() => onDelete(note.id)}>Eliminar Nota</button>
    </div>
  );
};


export default Note;
