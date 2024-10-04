import React, { useState, useContext, useEffect } from 'react';
import { NotesProvider, NotesContext } from './contexts/NotesContext';
import NoteCollection from './components/NoteCollection';
import NoteModal from './components/NoteModal';
import './styles.css';
import AppBar from './components/AppBar';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { NoteInterface } from './components/NoteCollection'; // Asegúrate de importar esta interfaz correctamente

const App: React.FC = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const { state, dispatch } = useContext(NotesContext);

  const handleAddNote = (note: Omit<NoteInterface, 'id'>) => {
    const collectionIdToUse = state.nextCollectionId.toString();

    dispatch({
      type: 'ADD_NOTE',
      payload: { collectionId: collectionIdToUse, note },
    });

    dispatch({ type: 'INCREMENT_COLLECTION_ID' });
    setModalOpen(false);
  };

  const handleOpenModal = () => {
    if (state.collections.length === 0) {
      return; // No hacer nada si no hay colecciones
    }
    setModalOpen(true);
  };

  const handleNoteMove = (noteId: string, targetCollectionId: string) => {
    dispatch({ type: 'MOVE_NOTE', payload: { noteId, targetCollectionId } });
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
            {state.collections.map((collection) => (
              <NoteCollection
                key={collection.id}
                collection={collection}
                onNoteMove={handleNoteMove}
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
              activeCollectionId={null} // Ajustar según tus necesidades
            />
          )}
        </div>
      </DndProvider>
    </NotesProvider>
  );
};

export default App;
