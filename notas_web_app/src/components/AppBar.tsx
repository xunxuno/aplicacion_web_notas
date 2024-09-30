import React from 'react';

const AppBar: React.FC = () => {
  return (
    <div style={{ backgroundColor: '#F0F0F0', padding: '20px', borderRadius: '8px' }}>
      <h1 style={{ fontWeight: 'bold' }}>App Title</h1>
      <h2 style={{ fontWeight: 400 }}>Welcome to the Notes App!</h2>
    </div>
  );
};

export default AppBar;