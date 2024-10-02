import React, { useState, useContext } from 'react';
import { NotesProvider, NotesContext } from './contexts/NotesContext';
import NoteCollection from './components/NoteCollection';
import NoteModal from './components/NoteModal';
import AppBar from './components/AppBar';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import './styles.css';

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
    if (activeCollectionId) {
      dispatch({
        type: 'ADD_NOTE',
        payload: { collectionId: activeCollectionId, note },
      });
    }
    setModalOpen(false);
  };

  const handleMoveNote = (noteId: string, targetCollectionId: string) => {
    dispatch({
      type: 'MOVE_NOTE',
      payload: { noteId, targetCollectionId },
    });
  };

  return (
    <DndProvider backend={HTML5Backend}>
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
                  console.log('Nota ID:', noteId);
                }}
                onCollectionClick={() => setActiveCollectionId(collection.id)}
                onNoteMove={handleMoveNote}
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
    </DndProvider>
  );
};

export default App;
