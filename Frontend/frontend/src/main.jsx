import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import AuthContextProvider from '../src/context/authContext'
import { BrowserRouter } from "react-router-dom";
import { Toaster } from 'react-hot-toast';
createRoot(document.getElementById('root')).render(
  <>
    <BrowserRouter>
      <AuthContextProvider>
        <App />
      </AuthContextProvider>
    </BrowserRouter>
    <Toaster />
  </>

)
