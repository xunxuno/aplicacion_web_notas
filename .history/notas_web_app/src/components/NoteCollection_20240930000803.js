import React from 'react';
import { useDrop } from 'react-dnd';
import Note from './Note';

const NoteCollection = ({ collection, onDropNote }) => {
    const [{ isOver }, drop] = useDrop(() => ({
      accept: 'NOTE',
      drop: (item) => {
        // Aquí despachamos la acción MOVE_NOTE con los ids de la nota y la colección
        onDropNote(item.id, collection.id);
      },
      collect: (monitor) => ({
        isOver: !!monitor.isOver(),
      }),
    }));
    
    return (
      <div ref={drop} style={{ backgroundColor: isOver ? '#f0f0f0' : 'white', padding: '20px', borderRadius: '10px' }}>
        <h3>{collection.title}</h3>
        {collection.notes.map(note => (
          <Note key={note.id} note={note} />
        ))}
      </div>
    );
  };

export default NoteCollection;