import React, { useState } from 'react';
import { NotesProvider } from './contexts/NotesContext';
import NoteCollection from './components/NoteCollection';
import NoteModal from './components/NoteModal';

const App: React.FC = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [activeCollectionId, setActiveCollectionId] = useState<string | null>(null);

  const handleAddNote = (note: { id: string; title: string; content: string }) => {
    if (activeCollectionId) {
      // Aquí se despacha la acción para agregar la nota a la colección activa
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

        {/* Botón para abrir el modal de agregar nota */}
        <button onClick={() => setModalOpen(true)}>Agregar Nota</button>

        {/* Mostrar colecciones de notas */}
        <div>
          {state.collections.map(collection => (
            <NoteCollection
              key={collection.id}
              collection={collection}
              onNoteClick={(noteId) => {
                // Aquí se podría abrir un modal para ver la nota
              }}
              onCollectionClick={() => setActiveCollectionId(collection.id)}
            />
          ))}
        </div>

        {/* Modal para agregar notas */}
        {isModalOpen && (
          <NoteModal
            onClose={() => setModalOpen(false)}
            onAddNote={handleAddNote} // Pasar la función para agregar notas
          />
        )}
      </div>
    </NotesProvider>
  );
};

export default App;

