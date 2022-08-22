import React from 'react';
import ReactDOM from 'react-dom/client';
import './normalize.css'
import './index.css';
import Landing from './pages/landing/Landing';
import reportWebVitals from './reportWebVitals';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

reportWebVitals();
