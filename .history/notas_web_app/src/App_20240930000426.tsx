// src/App.js
import React, { useState } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import AppBar from './components/AppBar';
import AddNoteButton from './components/AddNoteButton';
import NoteModal from './components/NoteModal';
import { NotesProvider } from './contexts/NotesContext';

const App = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <DndProvider backend={HTML5Backend}>
      <NotesProvider>
        <AppBar />
        <AddNoteButton onClick={() => setIsModalOpen(true)} />
        <NoteModal 
          isOpen={isModalOpen} 
          onClose={() => setIsModalOpen(false)} 
          onSave={(note) => console.log(note)} 
        />
      </NotesProvider>
    </DndProvider>
  );
};

export default App;
