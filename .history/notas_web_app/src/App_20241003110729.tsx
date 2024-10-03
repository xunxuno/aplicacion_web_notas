// src/App.tsx
import React, { useState, useContext, useEffect } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend'; // Asegúrate de importar el backend que necesites
import { NotesProvider, NotesContext } from './contexts/NotesContext';
import NoteCollection from './components/NoteCollection';
import NoteModal from './components/NoteModal';
import './styles.css';
import AppBar from './components/AppBar';

interface Note {
  id: string;
  title: string;
  content: string;
  collectionId: string;
}

interface NoteCollectionInterface {
  id: string;
  notes: Note[];
}

const App: React.FC = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [activeCollectionId, setActiveCollectionId] = useState<string | null>(null);
  const { state, dispatch } = useContext(NotesContext);

  useEffect(() => {
    console.log("Actualización de colecciones:");
    state.collections.forEach((collection: NoteCollectionInterface) => {
      console.log(`Notas en la colección ${collection.id}:`);
      collection.notes.forEach((n: Note) => {
        console.log(`Nota ID: ${n.id}, Título: ${n.title}, Contenido: ${n.content}`);
      });
    });
  }, [state.collections]);

  const handleAddNote = (note: Omit<Note, 'id'>) => {
    const collectionIdToUse = activeCollectionId || state.nextCollectionId.toString(); // Usa el ID de la colección activa o el siguiente ID

    dispatch({
      type: 'ADD_NOTE',
      payload: {
        collectionId: collectionIdToUse,
        note: {
          ...note,
          collectionId: state.nextCollectionId.toString(), // Asigna el ID de colección automáticamente
        },
      },
    });

    setModalOpen(false);
  };

  const handleOpenModal = () => {
    if (state.collections.length === 0) {
      setActiveCollectionId(null);
    } else {
      // Asigna automáticamente el ID de la primera colección disponible
      setActiveCollectionId(state.collections[0].id);
    }
    setModalOpen(true);
  };

  return (
    <DndProvider backend={HTML5Backend}> {/* Asegúrate de envolver tu aplicación con el DndProvider */}
      <NotesProvider>
        <AppBar />
        <div className="app-container">
          <div className="button-container"> {/* Contenedor para el botón */}
            <button className="add-note-button" onClick={handleOpenModal}>
              Nueva Nota
            </button>
          </div>

          <div className="collections-container">
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
              activeCollectionId={activeCollectionId} // Usa el ID de la colección activa
            />
          )}
        </div>
      </NotesProvider>
    </DndProvider>
  );
};

export default App;
