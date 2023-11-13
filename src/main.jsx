import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom';
import { CustomProvider } from 'rsuite';
import esAR from 'rsuite/locales/es_AR';


ReactDOM.createRoot(document.getElementById('root')).render(
  <CustomProvider locale={esAR}>
  <BrowserRouter>
    <App />
  </BrowserRouter>
  </CustomProvider>
)
