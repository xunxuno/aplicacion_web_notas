// src/contexts/NotesContext.tsx
import React, { createContext, useReducer, ReactNode } from 'react';

interface Note {
  id: string;
  title: string;
  content: string;
}

interface NotesState {
  notes: Note[];
}

interface Action {
  type: string;
  payload: any;
}

const initialState: NotesState = {
  notes: [],
};

const notesReducer = (state: NotesState, action: Action) => {
  switch (action.type) {
    // Define your actions here
    default:
      return state;
  }
};

// Define the type for the context value
interface NotesContextType {
  notes: Note[];
  dispatch: React.Dispatch<Action>;
}

const NotesContext = createContext<NotesContextType | undefined>(undefined);

interface NotesProviderProps {
  children: ReactNode; // Define the children prop type
}

export const NotesProvider: React.FC<NotesProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(notesReducer, initialState);
  
  return (
    <NotesContext.Provider value={{ notes: state.notes, dispatch }}>
      {children}
    </NotesContext.Provider>
  );
};

export default NotesContext;
