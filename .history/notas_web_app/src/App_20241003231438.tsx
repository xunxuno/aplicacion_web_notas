import React, { useState, useContext, useEffect } from 'react';
import { NotesProvider, NotesContext } from './contexts/NotesContext';
import NoteCollection from './components/NoteCollection';
import NoteModal from './components/NoteModal';
import CollectionNotesPanel from './components/CollectionNotesPanel';
import './styles.css';
import AppBar from './components/AppBar';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

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
  const [selectedNotes, setSelectedNotes] = useState<Note[]>([]);
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
    const collectionIdToUse = state.nextCollectionId.toString();

    dispatch({
      type: 'ADD_NOTE',
      payload: { 
        collectionId: collectionIdToUse, 
        note: { ...note, collectionId: collectionIdToUse }
      },
    });

    dispatch({ type: 'INCREMENT_COLLECTION_ID' });

    setModalOpen(false);
  };

  const handleOpenModal = () => {
    setModalOpen(true); // Solo abrir el modal sin afectar el panel
  };

  const handleNoteMove = (noteId: string, targetCollectionId: string) => {
    dispatch({ type: 'MOVE_NOTE', payload: { noteId, targetCollectionId } });
  };

  const handleNoteClick = (noteId: string) => {
    const selectedCollection = state.collections.find(
      (collection) => collection.notes.some(note => note.id === noteId)
    );

    if (selectedCollection) {
      setSelectedNotes(selectedCollection.notes);
      setActiveCollectionId(selectedCollection.id); // Establece el ID de la colección activa
    }
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
                onNoteClick={handleNoteClick} // Mantener la función para manejar el clic en las notas
                onCollectionClick={() => setActiveCollectionId(collection.id)}
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
              activeCollectionId={activeCollectionId!}
            />
          )}

          {selectedNotes.length > 0 && (
            <CollectionNotesPanel
              notes={selectedNotes}
              onClose={() => setSelectedNotes([])} // Limpia las notas seleccionadas al cerrar
              onDelete={(noteId) => {
                dispatch({ type: 'DELETE_NOTE', payload: { noteId } });
                setSelectedNotes(selectedNotes.filter(note => note.id !== noteId)); // Actualiza las notas mostradas
              }}
            />
          )}
        </div>
      </DndProvider>
    </NotesProvider>
  );
};


export default App;
