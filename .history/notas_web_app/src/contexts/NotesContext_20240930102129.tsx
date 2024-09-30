import React, { createContext, useReducer, ReactNode } from 'react';

interface Note {
  id: string;
  title: string;
  content: string;
}

interface NoteCollection {
  id: string;
  notes: Note[];
}

interface NotesState {
  collections: NoteCollection[];
}

interface NotesContextProps {
  state: NotesState;
  dispatch: React.Dispatch<any>;
}

const initialState: NotesState = {
  collections: [], // Inicializa con colecciones vacías o con datos de prueba si es necesario
};

export const NotesContext = createContext<NotesContextProps | undefined>(undefined);

const notesReducer = (state: NotesState, action: any) => {
  switch (action.type) {
    case 'ADD_NOTE':
      // Implementa la lógica para agregar una nota
      return state;
    default:
      return state;
  }
};

export const NotesProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(notesReducer, initialState);

  return (
    <NotesContext.Provider value={{ state, dispatch }}>
      {children}
    </NotesContext.Provider>
  );
};
