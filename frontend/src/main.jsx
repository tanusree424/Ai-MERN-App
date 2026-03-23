import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

export const serverURL = "http://localhost:5000/api"  ||  "https://ai-mern-app-2.onrender.com/api";
createRoot(document.getElementById('root')).render(
  
  <StrictMode>
    <App />
  </StrictMode>,
)
