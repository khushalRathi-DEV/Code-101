import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {BrowserRouter} from 'react-router-dom';
import counterContextProvider from './contextApi';
console.log(counterContextProvider);

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <counterContextProvider>
      <App />
    </counterContextProvider>
  </BrowserRouter>
  
)
