import * as React from 'react'
import Button from '../../common/components/button/Button'
import Slogan from './components/slogan/Slogan'
import Showcase from './components/showcase/Showcase'
import './Landing.css'
import { initFeedbacky } from 'feedbacky'
import 'feedbacky/dist/index.css'

function Landing() {
    React.useEffect(() => {
        initFeedbacky({
            token: '123',
        })
    }, [])
    return (
        <div className="page landing">
            <div className="container">
                <Slogan />
                <div style={{ textAlign: 'center' }}>
                    <Button text="Get started" url="/getting-started" />
                </div>
                <Showcase />
            </div>
            <div id="feedbacky"></div>
        </div>
    )
}

export default Landing
