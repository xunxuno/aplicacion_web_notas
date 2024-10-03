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
  <h1 
    style={{ 
      textAlign: 'center', 
      transition: 'transform 0.3s ease', 
      cursor: 'pointer'
    }}
    onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.2)'}
    onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
  >
    VOX NOTES
  </h1>
  <h2 style={{ textAlign: 'center' }}>Que el Omnissiah te recuerde tus tareas!</h2>
</div>
  );
};

export default AppBar;
