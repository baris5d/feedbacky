import React from 'react'
import ReactDOM from 'react-dom/client'
import './normalize.css'
import './index.css'
import Landing from './pages/landing/Landing'
import reportWebVitals from './reportWebVitals'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import GettingStarted from './pages/gettingStarted/GettingStarted'
import Header from './common/components/header/Header'
import Register from './pages/register/Register'
import Login from './pages/login/Login'
import Applications from './pages/applications/Applications'
import Application from './pages/applications/application/Application'
import ApplicationEdit from './pages/applications/applicationEdit/ApplicationEdit'
import ApplicationCreate from './pages/applications/applicationCreate/ApplicationCreate'
import Feedback from './pages/feedback/Feedback'
import PrivateRoute from './utils/PrivateRoute'
import axios from 'axios'
import authHeader from './services/auth.header.service'
import RestrictedRoute from './utils/RestrictedRoute'

axios.defaults.baseURL = process.env.REACT_APP_API_URL
axios.defaults.headers.common['Authorization'] =
    authHeader().Authorization || ''
axios.defaults.headers.post['Content-Type'] = 'application/json'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)

root.render(
    <React.StrictMode>
        <BrowserRouter>
            <main className="main">
                <Header />
                <Routes>
                    <Route path="/" element={<Landing />} />
                    <Route
                        path="/getting-started"
                        element={<GettingStarted />}
                    />
                    <Route path="/" element={<RestrictedRoute />}>
                        <Route path="/register" element={<Register />} />
                        <Route path="/login" element={<Login />} />
                    </Route>

                    <Route path="/" element={<PrivateRoute />}>
                        <Route
                            path="/applications"
                            element={<Applications />}
                        />
                        <Route
                            path="/applications/:id"
                            element={<Application />}
                        />
                        <Route
                            path="/application/create"
                            element={<ApplicationCreate />}
                        />
                        <Route
                            path="/applications/:id/edit"
                            element={<ApplicationEdit />}
                        />

                        <Route
                            path="/applications/:application_id/feedbacks/:id"
                            element={<Feedback />}
                        />
                    </Route>
                </Routes>
            </main>
        </BrowserRouter>
    </React.StrictMode>
)

reportWebVitals()
