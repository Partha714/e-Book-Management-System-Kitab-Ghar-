import React from 'react'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {BrowserRouter as Router} from 'react-router-dom'
import {Provider} from 'react-redux'
import library from './Library/index.js'



createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Router><Provider store={library}><App /></Provider></Router>
    
  </React.StrictMode>,
)
