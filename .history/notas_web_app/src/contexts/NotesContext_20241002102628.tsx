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


interface AddNoteAction {
  type: 'ADD_NOTE';
  payload: {
    collectionId: string;
    note: Note;
  };
}

interface DeleteNoteAction {
  type: 'DELETE_NOTE';
  payload: {
    collectionId: string;
    noteId: string;
  };
}

interface MoveNoteAction {
  type: 'MOVE_NOTE';
  payload: {
    noteId: string;
    targetCollectionId: string;
  };
}
type NotesAction = AddNoteAction | DeleteNoteAction | MoveNoteAction;

const initialState: NotesState = {
  collections: [
    {
      id: '1',
      notes: [
        
      ],
    },
  ],
};

const NotesContext = createContext<any>(null);

// Reducer para manejar las acciones
const notesReducer = (state: NotesState, action: NotesAction): NotesState => {
  switch (action.type) {
    case 'ADD_NOTE':
      return {
        ...state,
        collections: state.collections.map(collection => {
          if (collection.id === action.payload.collectionId) {
            return {
              ...collection,
              notes: [...collection.notes, action.payload.note], // Agregar la nueva nota
            };
          }
          return collection;
        }),
      };
    case 'DELETE_NOTE':
      return {
        ...state,
        collections: state.collections.map(collection => ({
          ...collection,
          notes: collection.notes.filter(note => note.id !== action.payload.noteId), // Eliminar la nota
        })),
      };
    case 'MOVE_NOTE':
      const { noteId, targetCollectionId } = action.payload;
      const sourceCollection = state.collections.find((collection) =>
        collection.notes.some((note) => note.id === noteId)
      );
      if (!sourceCollection) return state;

      const noteToMove = sourceCollection.notes.find((note) => note.id === noteId);
      if (!noteToMove) return state;

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
