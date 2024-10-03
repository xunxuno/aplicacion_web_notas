import React, { useState, useContext, useEffect } from 'react';
import { NotesProvider, NotesContext } from './contexts/NotesContext';
import NoteCollection from './components/NoteCollection';
import NoteModal from './components/NoteModal';
import './styles.css';
import AppBar from './components/AppBar';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

interface Note {
  id: string;
  title: string;
  content: string;
  collectionId: string;
  colorClass: string; // Asegúrate de que esto esté aquí
}

interface NoteCollectionInterface {
  id: string;
  notes: Note[];
}

const colorClasses = ['red', 'blue', 'green', 'yellow', 'purple']; // Lista de colores

const App: React.FC = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [activeCollectionId, setActiveCollectionId] = useState<string | null>(null);
  const { state, dispatch } = useContext(NotesContext);

  useEffect(() => {
    console.log("Actualización de colecciones:");
    state.collections.forEach((collection: NoteCollectionInterface) => {
      console.log(`Notas en la colección ${collection.id}:`);
      collection.notes.forEach((n: Note) => {
        console.log(`Nota ID: ${n.id}, Título: ${n.title}, Contenido: ${n.content}, Color: ${n.colorClass}`);
      });
    });
  }, [state.collections]);

  const handleAddNote = (note: Omit<Note, 'id'>) => {
    const collectionIdToUse = state.nextCollectionId.toString();

    // Asignar un color aleatorio
    const randomColor = colorClasses[Math.floor(Math.random() * colorClasses.length)];

    const newNote = {
      ...note,
      id: '', // Este ID será generado en el reducer
      colorClass: randomColor,
    };

    dispatch({
      type: 'ADD_NOTE',
      payload: { collectionId: collectionIdToUse, note: newNote },
    });

    dispatch({ type: 'INCREMENT_COLLECTION_ID' });
    setModalOpen(false);
  };

  const handleOpenModal = () => {
    if (state.collections.length === 0) {
      setActiveCollectionId(null);
    } else {
      setActiveCollectionId(state.collections[0].id);
    }
    setModalOpen(true);
  };

  return (
    <NotesProvider>
      <DndProvider backend={HTML5Backend}>
        <AppBar />
        <div className="app-container">
          <div className="button-container">
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
                onCollectionClick={() => setActiveCollectionId(collection.id)}
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
              activeCollectionId={activeCollectionId!}
            />
          )}
        </div>
      </DndProvider>
    </NotesProvider>
  );
};

export default App;
