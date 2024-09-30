import React, { useState, useContext } from 'react';
import AppBar from './components/AppBar';
import AddNoteButton from './components/AddNoteButton';
import NoteModal from './components/NoteModal';
import NoteCollection from './components/NoteCollection';
import NotesContext from './contexts/NotesContext';

const App: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { notes } = useContext(NotesContext);

  return (
    <div>
      <AppBar />
      <AddNoteButton onClick={() => setIsModalOpen(true)} />
      {isModalOpen && <NoteModal onClose={() => setIsModalOpen(false)} />}
      <div>
        {notes.map(collection => (
          <NoteCollection key={collection.id} collection={collection} />
        ))}
      </div>
    </div>
  );
};

export default App;
