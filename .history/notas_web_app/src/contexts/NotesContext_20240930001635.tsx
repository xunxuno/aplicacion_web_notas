import React, { createContext, useReducer } from 'react';

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

const NotesContext = createContext<{ notes: Note[]; dispatch: React.Dispatch<Action> } | undefined>(undefined);

export const NotesProvider: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer(notesReducer, initialState);
  
  return (
    <NotesContext.Provider value={{ notes: state.notes, dispatch }}>
      {children}
    </NotesContext.Provider>
  );
};

export default NotesContext;
