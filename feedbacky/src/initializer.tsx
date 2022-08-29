import React, { Suspense } from 'react'
import ReactDOM from 'react-dom'
import { Feedbacky, FeedbackyProps } from './components/feedback/Feedbacky'

export const initFeedbacky = (props: FeedbackyProps) => {
    try {
        ReactDOM.render(
            <React.StrictMode>
                <Suspense
                    fallback={
                        <script>console.error("Feedbacky has an error")</script>
                    }
                >
                    <Feedbacky {...props} />
                </Suspense>
            </React.StrictMode>,
            document.getElementById(props.id || 'feedbacky')
        )
    } catch (error) {
        console.error(error)
    }
}

if (window) {
    // @ts-ignore
    window.initFeedbacky = initFeedbacky
}
