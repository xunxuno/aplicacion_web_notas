import React, { useState, useContext } from 'react';
import { NotesProvider, NotesContext } from './contexts/NotesContext';
import NoteCollection from './components/NoteCollection';
import NoteModal from './components/NoteModal';

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
    if (activeCollectionId) {
      dispatch({
        type: 'ADD_NOTE',
        payload: { collectionId: activeCollectionId, note },
      });
    }
    setModalOpen(false);
  };

  return (
    <NotesProvider>
      <div style={{ padding: '20px' }}>
        <h1>Aplicación de Notas</h1>
        <h2>Bienvenido a tu espacio de notas</h2>

        <button onClick={() => setModalOpen(true)}>Agregar Nota</button>

        <div>
          {state.collections.map((collection: NoteCollectionInterface) => (
            <NoteCollection
              key={collection.id}
              collection={collection}
              onNoteClick={(noteId) => {
                // Aquí podrías abrir un modal para ver la nota
              }}
              onCollectionClick={() => setActiveCollectionId(collection.id)}
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
