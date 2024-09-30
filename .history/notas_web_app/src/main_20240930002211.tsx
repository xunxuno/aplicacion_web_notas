import React from 'react'
import ReactDoom from 'react-dom/client'
import App from './App.tsx'
import './index.css'

ReactDoom.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
