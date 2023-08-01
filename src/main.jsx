import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter} from 'react-router-dom'
import { IsaeApp } from './IsaeApp'
import './styles.css'
import './styles/theme2.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <IsaeApp />
    </BrowserRouter>  
  </React.StrictMode>,
)
