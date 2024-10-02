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
  collections: NoteCollectionInterface[];
  nextNoteId: number; // Para los IDs de las notas
  nextCollectionId: number; // Para los IDs de las colecciones
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
  collections: [],
  nextNoteId: 1, // Empieza desde 1 para el ID de notas
  nextCollectionId: 1, // Empieza desde 1 para el ID de colecciones
};



const NotesContext = createContext<any>(null);

// Reducer para manejar las acciones
const notesReducer = (state: NotesState, action: NotesAction): NotesState => {
  switch (action.type) {
    case 'ADD_NOTE':
      const newNoteId = state.nextNoteId; // Toma el siguiente ID de nota disponible
      const collectionId = action.payload.collectionId; // ID de colección del payload
      
      // Verificar si la colección existe
      const collectionExists = state.collections.some(collection => collection.id === collectionId);
      
      // Si la colección no existe, crearla y asignar un nuevo ID de colección
      const updatedCollections = collectionExists
        ? state.collections.map(collection => {
            if (collection.id === collectionId) {
              const newNote = {
                ...action.payload.note,
                id: newNoteId.toString(), // Asigna el nuevo ID a la nota
              };
              return {
                ...collection,
                notes: [...collection.notes, newNote],
              };
            }
            return collection;
          })
        : [...state.collections, {
            id: state.nextCollectionId.toString(), // Crea una nueva colección con ID secuencial
            notes: [{
              ...action.payload.note,
              id: newNoteId.toString(), // Asigna el nuevo ID a la nota
            }],
          }];
      
      return {
        ...state,
        collections: updatedCollections,
        nextNoteId: state.nextNoteId + 1, // Incrementa el contador del ID de nota
        nextCollectionId: state.nextCollectionId + 1, // Incrementa el contador del ID de colección
      };
    /*case 'DELETE_NOTE':
      return {
        ...state,
        collections: state.collections.map(collection => ({
          ...collection,
          notes: collection.notes.filter(note => note.id !== action.payload.noteId),
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
      };*/
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
