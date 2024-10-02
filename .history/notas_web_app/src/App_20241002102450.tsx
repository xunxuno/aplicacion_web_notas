import React, { useState, useContext } from 'react';
import { NotesProvider, NotesContext } from './contexts/NotesContext';
import NoteCollection from './components/NoteCollection';
import NoteModal from './components/NoteModal';
import './styles.css';
import AppBar from './components/AppBar';

// Renombrar la interfaz para evitar conflictos
interface Note {
  id: string;
  title: string;
  content: string;
}

interface NoteCollectionInterface {
  id: string;
  notes: Note[];
}

const App: React.FC = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [activeCollectionId, setActiveCollectionId] = useState<string | null>(null);
  
  const { state, dispatch } = useContext(NotesContext);

  const handleAddNote = (note: Note) => {
    console.log("Nota a agregar:", note);
    if (activeCollectionId) {
      dispatch({
        type: 'ADD_NOTE',
        payload: { collectionId: activeCollectionId, note },
      });
      console.log("Estado después de agregar:", state);
    }
    setModalOpen(false);
  };

  const handleDeleteNote = (noteId: string) => {
    dispatch({
      type: 'DELETE_NOTE',
      payload: { noteId },
    });
  };

  return (
    <NotesProvider>
      <div>
        <AppBar />

        <button onClick={() => setModalOpen(true)}>Agregar Nota</button>

        <div>
          {state.collections.map((collection: NoteCollectionInterface) => (
            <NoteCollection
              key={collection.id}
              collection={collection}
              onNoteClick={(noteId) => console.log("Nota ID:", noteId)}
              onCollectionClick={() => setActiveCollectionId(collection.id)}
              onNoteMove={() => {}} // Agregar función de movimiento si corresponde
              onDelete={handleDeleteNote} // Pasar la función de eliminación
            />
          ))}
        </div>

        {isModalOpen && (
          <NoteModal
            onClose={() => setModalOpen(false)}
            onAddNote={handleAddNote}
          />
        )}
      </div>
    </NotesProvider>
  );
};

export default App;
