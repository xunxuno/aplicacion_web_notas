import React, { createContext, useReducer, ReactNode } from 'react';

// Definir el tipo de nota
interface Note {
  id: string;
  title: string;
  content: string;
}

// Definir el tipo de colección
interface NoteCollection {
  id: string;
  title: string;
  notes: Note[];
}

// Estado inicial del contexto
interface NotesState {
  notes: Note[];
  collections: NoteCollection[];
}

// Acción que el reducer manejará
type Action =
  | { type: 'ADD_NOTE'; payload: Note }
  | { type: 'DELETE_NOTE'; payload: string }
  | { type: 'EDIT_NOTE'; payload: Note }
  | { type: 'MOVE_NOTE_TO_COLLECTION'; payload: { noteId: string; collectionId: string } }
  | { type: 'DELETE_COLLECTION'; payload: string };

// Estado inicial
const initialState: NotesState = {
  notes: [],
  collections: []
};

// Reducer que maneja las acciones
const notesReducer = (state: NotesState, action: Action): NotesState => {
  switch (action.type) {
    case 'ADD_NOTE':
      return { ...state, notes: [...state.notes, action.payload] };
    case 'DELETE_NOTE':
      return { ...state, notes: state.notes.filter(note => note.id !== action.payload) };
    case 'EDIT_NOTE':
      return {
        ...state,
        notes: state.notes.map(note => note.id === action.payload.id ? action.payload : note)
      };
    case 'DELETE_COLLECTION':
      return {
        ...state,
        collections: state.collections.filter(collection => collection.id !== action.payload)
      };
    case 'MOVE_NOTE_TO_COLLECTION':
      // Mover una nota a una colección
      const noteToMove = state.notes.find(note => note.id === action.payload.noteId);
      if (!noteToMove) return state;
      return {
        ...state,
        notes: state.notes.filter(note => note.id !== action.payload.noteId),
        collections: state.collections.map(collection =>
          collection.id === action.payload.collectionId
            ? { ...collection, notes: [...collection.notes, noteToMove] }
            : collection
        )
      };
    default:
      return state;
  }
};

// Crear el contexto
const NotesContext = createContext<{
  state: NotesState;
  dispatch: React.Dispatch<Action>;
}>({ state: initialState, dispatch: () => null });

// Proveedor del contexto
const NotesProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(notesReducer, initialState);

  return (
    <NotesContext.Provider value={{ state, dispatch }}>
      {children}
    </NotesContext.Provider>
  );
};

export { NotesContext, NotesProvider };
