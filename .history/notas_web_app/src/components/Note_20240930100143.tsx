import React from 'react';
import { useDrag } from 'react-dnd';
import { NotesContext } from '../contexts/NotesContext';

interface NoteProps {
  note: {
    id: string;
    title: string;
    content: string;
  };
}

const Note: React.FC<NoteProps> = ({ note }) => {
  const { dispatch } = React.useContext(NotesContext);

  // Configuración del hook useDrag
  const [{ isDragging }, drag] = useDrag({
    type: 'NOTE',  // Identificador único para los elementos que se pueden arrastrar
    item: { id: note.id },  // Elemento que se está arrastrando
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),  // Estado de arrastre
    }),
  });

  const handleDelete = () => {
    if (window.confirm('¿Estás seguro de que deseas eliminar esta nota?')) {
      dispatch({ type: 'DELETE_NOTE', payload: note.id });
    }
  };

  return (
    <div
      ref={drag}  // Vincula el drag a este contenedor
      className="note"
      style={{ opacity: isDragging ? 0.5 : 1 }}  // Cambia la opacidad cuando se está arrastrando
    >
      <h3>{note.title}</h3>
      <p>{note.content}</p>
      <button onClick={handleDelete}>Eliminar</button>
    </div>
  );
};

export default Note;
