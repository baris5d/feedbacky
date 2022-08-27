import React from 'react'
import ReactDOM from 'react-dom'

import Feedbacky from './components/feedback/Feedbacky'

import './normalize.css'
import './feedbacky.scss'

ReactDOM.render(
    <React.StrictMode>
        <Feedbacky hash="205a0fe6de354464928406e9c3437e05" />
    </React.StrictMode>,
    document.getElementById('root')
)
