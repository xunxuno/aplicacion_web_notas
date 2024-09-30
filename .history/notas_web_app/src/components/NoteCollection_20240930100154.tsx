import React from 'react';
import { useDrop } from 'react-dnd';
import Note from './Note';

interface Note {
  id: string;
  title: string;
  content: string;
}

interface NoteCollectionProps {
  collection: {
    id: string;
    notes: Note[];
  };
  onDropNote: (noteId: string, collectionId: string) => void;  // Callback para manejar cuando una nota se suelte en la colección
}

const NoteCollection: React.FC<NoteCollectionProps> = ({ collection, onDropNote }) => {
  // Configuración del hook useDrop
  const [{ isOver }, drop] = useDrop({
    accept: 'NOTE',  // Identificador del tipo de objeto que puede ser soltado aquí
    drop: (item: { id: string }) => {
      onDropNote(item.id, collection.id);  // Llama a la función cuando se suelte una nota
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),  // Estado si está sobre la colección
    }),
  });

  return (
    <div
      ref={drop}  // Vincula el drop a este contenedor
      style={{
        backgroundColor: isOver ? '#f0f0f0' : 'white',  // Cambia el color de fondo cuando se está sobre el área
        padding: '10px',
        borderRadius: '8px',
      }}
    >
      <h3>{collection.id}</h3>
      {collection.notes.map(note => (
        <Note key={note.id} note={note} />
      ))}
    </div>
  );
};

export default NoteCollection;
