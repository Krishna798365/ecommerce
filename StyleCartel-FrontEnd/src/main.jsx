import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import ShopContextProvider from './context/ShopContext'
import App from './App.jsx'
import {BrowserRouter}  from 'react-router-dom'
import {GoogleOAuthProvider} from '@react-oauth/google'
const clientId = "711377915961-vq1loojcdmae5rcnm6vq5rhsd8b6sorp.apps.googleusercontent.com"
createRoot(document.getElementById('root')).render(
  <BrowserRouter>
  <ShopContextProvider>
    <GoogleOAuthProvider clientId={clientId}>

    <App />
    </GoogleOAuthProvider>
  </ShopContextProvider>
  
  </BrowserRouter>,
)
