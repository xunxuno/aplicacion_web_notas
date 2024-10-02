// src/App.tsx
import React, { useState, useContext, useEffect } from 'react';
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

  const handleAddNote = (note: Omit<Note, 'id'>) => {
    if (activeCollectionId) {
      dispatch({
        type: 'ADD_NOTE',
        payload: { collectionId: activeCollectionId, note },
      });
    }
    setModalOpen(false);
  };

  useEffect(() => {
    console.log("Estado actualizado de las colecciones: ", state.collections); // Mostrar colecciones cuando cambien
  }, [state.collections]); // Solo se ejecuta cuando las colecciones cambian

  const handleOpenModal = () => {
    // Si no hay colecciones, no necesitas asignar activeCollectionId aquí
    if (state.collections.length === 0) {
      setActiveCollectionId(null); // Esto es opcional, pero puedes dejarlo como null
    } else {
      // Asigna automáticamente el ID de la primera colección disponible
      setActiveCollectionId(state.collections[0].id);
    }
    setModalOpen(true);
  };
  

  return (
    <NotesProvider>
      <div>
        <AppBar />

        <button onClick={handleOpenModal}>Agregar Nota</button>

        <div>
          {state.collections.map((collection: NoteCollectionInterface) => (
            <NoteCollection
              key={collection.id}
              collection={collection}
              onNoteClick={(noteId) => {
                console.log("Nota ID:", noteId);
              }}
              onCollectionClick={() => setActiveCollectionId(collection.id)} // Establece correctamente el ID de la colección activa
              onNoteMove={(noteId, targetCollectionId) => {
                dispatch({ type: 'MOVE_NOTE', payload: { noteId, targetCollectionId } });
              }}
              onDelete={(noteId) => {
                dispatch({ type: 'DELETE_NOTE', payload: { noteId } });
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
