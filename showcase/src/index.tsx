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
import GettingStarted from './pages/gettingStarted/GettingStarted';
import Header from './common/components/header/Header';
import Register from './pages/register/Register';
import Login from './pages/login/Login';
import Applications from './pages/applications/Applications';


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <BrowserRouter>
    <main className="main">
      <Header />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/getting-started" element={<GettingStarted />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />

        <Route path="/applications" element={<Applications />} />
        
      </Routes>
    </main>
    </BrowserRouter>
  </React.StrictMode>
);

reportWebVitals();
