import { createContext, useReducer } from 'react';

const NotesContext = createContext();

const notesReducer = (state, action) => {
    switch (action.type) {
      // Otras acciones...
      case 'MOVE_NOTE':
        const { noteId, targetCollectionId } = action.payload;
        return state.map(collection => {
          // Si es la colección de destino, agregamos la nota aquí
          if (collection.id === targetCollectionId) {
            return {
              ...collection,
              notes: [...collection.notes, state.find(note => note.id === noteId)],
            };
          }
          // Si la nota estaba en esta colección, la quitamos
          return {
            ...collection,
            notes: collection.notes.filter(note => note.id !== noteId),
          };
        });
      default:
        return state;
    }
  };

export const NotesProvider = ({ children }) => {
  const [notes, dispatch] = useReducer(notesReducer, []);

  return (
    <NotesContext.Provider value={{ notes, dispatch }}>
      {children}
    </NotesContext.Provider>
  );
};

export default NotesContext;