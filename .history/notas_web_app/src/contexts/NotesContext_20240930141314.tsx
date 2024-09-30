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
const notesReducer = (state: NotesState, action: Action) => {
  switch (action.type) {
    case 'ADD_NOTE':
      return {
        ...state,
        collections: state.collections.map(collection =>
          collection.id === action.payload.collectionId
            ? {
                ...collection,
                notes: [...collection.notes, action.payload.note],
              }
            : collection
        ),
      };

    case 'DELETE_NOTE':
      return {
        ...state,
        collections: state.collections.map(collection => ({
          ...collection,
          notes: collection.notes.filter(note => note.id !== action.payload),
        })),
      };

    case 'MOVE_NOTE':
      const { noteId, targetCollectionId } = action.payload;
      let noteToMove: Note | undefined;

      // Remover la nota de su colección original
      const newCollections = state.collections.map(collection => {
        const filteredNotes = collection.notes.filter(note => {
          if (note.id === noteId) {
            noteToMove = note; // Encontrar la nota que se va a mover
          }
          return note.id !== noteId;
        });
        return { ...collection, notes: filteredNotes };
      });

      // Agregar la nota a la nueva colección
      const updatedCollections = newCollections.map(collection => {
        if (collection.id === targetCollectionId && noteToMove) {
          return {
            ...collection,
            notes: [...collection.notes, noteToMove],
          };
        }
        return collection;
      });

      return {
        ...state,
        collections: updatedCollections,
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

export { NotesContext, NotesProvider };
