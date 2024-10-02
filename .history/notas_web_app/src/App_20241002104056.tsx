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
  collectionId: string; // Asegúrate de que esta propiedad esté aquí
}

interface NoteCollectionInterface {
  id: string;
  notes: Note[]; // Asegúrate de que aquí también se use Note[]
}

const App: React.FC = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [activeCollectionId, setActiveCollectionId] = useState<string | null>(null);
  
  const { state, dispatch } = useContext(NotesContext);

  const handleAddNote = (note: Omit<Note, 'collectionId'>) => { // Omitir collectionId al recibir
    console.log("Nota a agregar:", note);
    if (activeCollectionId) {
      dispatch({
        type: 'ADD_NOTE',
        payload: { 
          collectionId: activeCollectionId, 
          note: { ...note, collectionId: activeCollectionId }, // Agregar collectionId
        },
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
              onNoteClick={(noteId) => {
                console.log("Nota ID:", noteId);
              }}
              onCollectionClick={() => setActiveCollectionId(collection.id)}
              onNoteMove={(noteId, targetCollectionId) => {
                dispatch({ type: 'MOVE_NOTE', payload: { noteId, targetCollectionId } });
              }}
              onDelete={(noteId) => {
                handleDeleteNote(noteId);
              }}
            />
          ))}
        </div>

        {isModalOpen && (
          <NoteModal
            onClose={() => setModalOpen(false)}
            onAddNote={handleAddNote}
            activeCollectionId={activeCollectionId!} // Asegúrate de que no sea null
          />
        )}
      </div>
    </NotesProvider>
  );
};

export default App;
