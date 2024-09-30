import React, { useContext } from 'react';
import { NotesContext } from '../contexts/NotesContext';

// Definir los tipos de las props
interface Note {
  id: string;
  title: string;
  content: string;
}

interface NoteProps {
  note: Note;
}

const Note: React.FC<NoteProps> = ({ note }) => {
  const { dispatch } = useContext(NotesContext);

  const handleDelete = () => {
    if (window.confirm('¿Estás seguro de que deseas eliminar esta nota?')) {
      dispatch({ type: 'DELETE_NOTE', payload: note.id });
    }
  };

  return (
    <div className="note">
      <h3>{note.title}</h3>
      <p>{note.content}</p>
      <button onClick={handleDelete}>Eliminar</button>
    </div>
  );
};

export default Note;
