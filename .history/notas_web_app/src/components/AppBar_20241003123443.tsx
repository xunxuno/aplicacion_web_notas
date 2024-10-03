// AppBar.tsx
import React from 'react';

const AppBar: React.FC = () => {
  const appBarStyle = {
    backgroundColor: '#C96868', // Color pastel
    borderRadius: '8px',
    margin: '0',
    padding: '20px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)', // Agregar sombra para mayor profundidad
  };

  return (
    <div style={appBarStyle}>
      <h1 style={{ textAlign: 'center' }}>VOX NOTES</h1>
      <h2 style={{ textAlign: 'center' }}>Que el Omnissiah te recuerde tus tareas!</h2>
    </div>
  );
};

export default AppBar;
