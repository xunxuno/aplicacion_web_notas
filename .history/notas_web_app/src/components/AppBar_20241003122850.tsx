// AppBar.tsx
import React from 'react';

const AppBar: React.FC = () => {
  const appBarStyle = {
    backgroundColor: '#9D5353', // Color pastel
    borderRadius: '8px',
    margin: '0',
    padding: '20px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)', // Agregar sombra para mayor profundidad
  };

  return (
    <div style={appBarStyle}>
      <h1>Aplicación de Notas</h1>
      <h2>Welcome to the Notes App!</h2>
    </div>
  );
};

export default AppBar;
