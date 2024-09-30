// src/App.js
import React, { useState, useContext } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import AppBar from './components/AppBar';
import AddNoteButton from './components/AddNoteButton';
import NoteModal from './components/NoteModal';
import NoteCollection from './components/NoteCollection';
import NotesContext from './contexts/NotesContext';

const App = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { notes, dispatch } = useContext(NotesContext);

  const handleAddNote = (note) => {
    dispatch({ type: 'ADD_NOTE', payload: { id: Date.now(), ...note } });
    setIsModalOpen(false);
  };

  const handleDropNote = (noteId, collectionId) => {
    dispatch({ type: 'MOVE_NOTE', payload: { noteId, targetCollectionId: collectionId } });
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <AppBar />
      <AddNoteButton onClick={() => setIsModalOpen(true)} />
      <NoteModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onSave={handleAddNote} />
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {notes.map(collection => (
          <NoteCollection 
            key={collection.id} 
            collection={collection} 
            onDropNote={handleDropNote} 
          />
        ))}
      </div>
    </DndProvider>
  );
};

export default App;
