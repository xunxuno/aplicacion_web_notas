import React, { createContext, useReducer, ReactNode } from 'react';


// Definir el contexto
interface Note {
  id: string;
  title: string;
  content: string;
}

interface Collection {
  id: string;
  notes: Note[];
}

interface NotesState {
  collections: Collection[];
}

interface Action {
  type: string;
  payload: any;
}

const initialState: NotesState = {
  collections: [
    {
      id: 'collection-1',
      notes: [
        { id: 'note-1', title: 'Nota 1', content: 'Contenido de la nota 1' },
        { id: 'note-2', title: 'Nota 2', content: 'Contenido de la nota 2' },
      ],
    },
    {
      id: 'collection-2',
      notes: [
        { id: 'note-3', title: 'Nota 3', content: 'Contenido de la nota 3' },
      ],
    },
  ],
};

const NotesContext = createContext<any>(null);

// Reducer para manejar las acciones
const notesReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_NOTE':
      return {
        ...state,
        collections: state.collections.map((collection) =>
          collection.id === action.payload.collectionId
            ? { ...collection, notes: [...collection.notes, action.payload.note] }
            : collection
        ),
      };
    case 'DELETE_NOTE':
      return {
        ...state,
        collections: state.collections.map((collection) =>
          collection.id === action.payload.collectionId
            ? {
                ...collection,
                notes: collection.notes.filter((note) => note.id !== action.payload.noteId),
              }
            : collection
        ),
      };
    case 'MOVE_NOTE':
      const { noteId, targetCollectionId } = action.payload;
      const sourceCollection = state.collections.find((collection) =>
        collection.notes.some((note) => note.id === noteId)
      );
      const noteToMove = sourceCollection.notes.find((note) => note.id === noteId);
      
      return {
        ...state,
        collections: state.collections.map((collection) => {
          if (collection.id === sourceCollection.id) {
            return {
              ...collection,
              notes: collection.notes.filter((note) => note.id !== noteId),
            };
          } else if (collection.id === targetCollectionId) {
            return {
              ...collection,
              notes: [...collection.notes, noteToMove],
            };
          } else {
            return collection;
          }
        }),
      };
    default:
      return state;
  }
};

// Proveedor del contexto con soporte para 'children'
interface NotesProviderProps {
  children: ReactNode; // Definir el tipo de la prop 'children'
}

const NotesProvider: React.FC<NotesProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(notesReducer, initialState);

  return (
    <NotesContext.Provider value={{ state, dispatch }}>
      {children}
    </NotesContext.Provider>
  );
};

export { NotesContext, NotesProvider, notesReducer };
