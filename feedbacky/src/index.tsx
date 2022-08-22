import React from 'react'
import ReactDOM from 'react-dom'

import Feedbacky from './components/feedback/Feedbacky'

import './normalize.css'
import './feedbacky.scss'

ReactDOM.render(
    <React.StrictMode>
        <Feedbacky />
    </React.StrictMode>,
    document.getElementById('root')
)
