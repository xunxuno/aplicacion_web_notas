import React, { useState, useContext } from 'react';
import { NotesProvider, NotesContext } from './contexts/NotesContext';
import NoteCollection from './components/NoteCollection';
import NoteModal from './components/NoteModal';
import './styles.css'; 

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
  
  const { state, dispatch } = useContext(NotesContext); // Aquí obtenemos el estado y el dispatch

  const handleAddNote = (note: Note) => {
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
      <div>
        <h1>Aplicación de Notas</h1>
        <h2>Bienvenido a tu espacio de notas</h2>

        {/* Botón para abrir el modal de agregar nota */}
        <button onClick={() => setModalOpen(true)}>Agregar Nota</button>

        {/* Mostrar colecciones de notas */}
        <div>
          {state.collections.map((collection: NoteCollectionInterface) => (
            <NoteCollection
            key={collection.id}
            collection={collection}
            onNoteClick={(noteId) => {
              // Aquí podrías abrir un modal para ver la nota
              console.log("Nota ID:", noteId); // Ejemplo de uso
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
