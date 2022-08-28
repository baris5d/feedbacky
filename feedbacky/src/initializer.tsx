import React from 'react'
import ReactDOM from 'react-dom'
import { Feedbacky } from './components/feedback/Feedbacky'

export const getFeedbacky = (props: any) => {
    return <Feedbacky {...props} />
}

export const initFeedbacky = (props: any) => {
    ReactDOM.render(
        <React.StrictMode>
            <Feedbacky {...props} />
        </React.StrictMode>,
        document.getElementById('feedbacky')
    )
}
