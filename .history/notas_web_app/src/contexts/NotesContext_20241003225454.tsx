import React, { createContext, useReducer, ReactNode } from 'react';

// Interfaces
interface Note {
  id: string;
  title: string;
  content: string;
  collectionId: string;
}

interface NoteCollectionInterface {
  id: string; // ID de la colección, generado de manera secuencial
  notes: Note[]; // Lista de notas en la colección
}

interface NotesState {
  collections: NoteCollectionInterface[];
  nextNoteId: number; // Para los IDs de las notas
  nextCollectionId: number; // Para los IDs de las colecciones
}

// Acciones
interface AddNoteAction {
  type: 'ADD_NOTE';
  payload: {
    collectionId: string;
    note: Omit<Note, 'id'>; // Se espera que la nota no tenga ID al agregarla
  };
}

interface DeleteNoteAction {
  type: 'DELETE_NOTE';
  payload: {
    noteId: string; // ID de la nota a eliminar
  };
}

interface MoveNoteAction {
  type: 'MOVE_NOTE';
  payload: {
    noteId: string;
    targetCollectionId: string;
  };
}

interface IncrementCollectionIdAction {
  type: 'INCREMENT_COLLECTION_ID'; // Nueva acción para incrementar el ID
}

type NotesAction = AddNoteAction | DeleteNoteAction | MoveNoteAction | IncrementCollectionIdAction; // Agrega IncrementCollectionIdAction aquí

const initialState: NotesState = {
  collections: [],
  nextNoteId: 1, // Empieza desde 1 para el ID de notas
  nextCollectionId: 1, // Empieza desde 1 para el ID de colecciones
};

// Contexto y Reducer
const NotesContext = createContext<{
  state: NotesState;
  dispatch: React.Dispatch<NotesAction>;
}>({ state: initialState, dispatch: () => null });

// Reducer
const notesReducer = (state: NotesState, action: NotesAction): NotesState => {
  switch (action.type) {
    case 'ADD_NOTE':
      const newNoteId = state.nextNoteId; // ID de la nueva nota
      const { collectionId, note } = action.payload;

      const collectionExists = state.collections.some(collection => collection.id === collectionId);

      const updatedCollections = collectionExists
        ? state.collections.map(collection => {
            if (collection.id === collectionId) {
              const newNote = {
                ...note,
                id: newNoteId.toString(), // Asigna el nuevo ID a la nota
                collectionId, // Asigna el ID de colección a la nota
              };
              return {
                ...collection,
                notes: [...collection.notes, newNote],
              };
            }
            return collection;
          })
        : [
            ...state.collections,
            {
              id: state.nextCollectionId.toString(), // Crea una nueva colección con ID secuencial
              notes: [
                {
                  ...note,
                  id: newNoteId.toString(), // Asigna el nuevo ID a la nota
                  collectionId: state.nextCollectionId.toString(), // Asigna el ID de colección a la nota
                },
              ],
            },
          ];

      return {
        ...state,
        collections: updatedCollections,
        nextNoteId: newNoteId + 1, // Incrementa el ID de la nota
        nextCollectionId: collectionExists ? state.nextCollectionId : state.nextCollectionId + 1, // Incrementa solo si se crea una nueva colección
      };
    case 'DELETE_NOTE':
      return {
        ...state,
        collections: state.collections.map(collection => ({
          ...collection,
          notes: collection.notes.filter(note => note.id !== action.payload.noteId),
        })),
      };
    case 'MOVE_NOTE': {
      const { noteId, targetCollectionId } = action.payload;

      let noteToMove: Note | undefined;
      const updatedCollections = state.collections.map(collection => {
        const notes = collection.notes.filter(note => {
          if (note.id === noteId) {
            noteToMove = note; // Guarda la nota a mover
            return false; // Elimina la nota de la colección
          }
          return true; // Mantiene otras notas
        });

        return { ...collection, notes }; // Devuelve la colección con las notas actualizadas
      });

      if (noteToMove) {
        const targetCollection = updatedCollections.find(collection => collection.id === targetCollectionId);
        if (targetCollection) {
          targetCollection.notes.push(noteToMove);
        }
      }

      return {
        ...state,
        collections: updatedCollections,
      };
    }
    case 'INCREMENT_COLLECTION_ID':
      return {
        ...state,
        nextCollectionId: state.nextCollectionId + 1, // Incrementa el ID de colección
      };

    default:
      return state;
  }
};

// Proveedor del contexto
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
