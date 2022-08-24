import moment from 'moment'
import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import UAParser, { IResult as UAProps } from 'ua-parser-js'
import FeedbackService from '../../services/feedback.service'
import Back from '../../common/assets/back.svg'
import './Feedback.css'
import Button from '../../common/components/button/Button'

export interface FeedbackProps {
    id: number
    application_id: number
    description: string
    ip: string
    user_agent: string
    user_agent_obj?: UAProps
    created_at: string
}

const Feedback = () => {
    const [feedback, setFeedback] = useState<FeedbackProps>()

    const { application_id, id } = useParams<{
        application_id: string
        id: string
    }>()

    useEffect(() => {
        if (application_id !== undefined && id !== undefined) {
            FeedbackService.fetch(application_id, id).then(setFeedback)
        }
    }, [application_id, id])

    const handleDelete = () => {
        if (feedback !== undefined) {
            FeedbackService.delete(feedback.application_id, feedback.id)
                .then(() => {
                    window.location.href = `/applications/${feedback.application_id}`
                })
                .catch((error) => {
                    console.log(error)
                })
        }
    }

    return (
        <div className="page feedback">
            <div className="container">
                <div className="page__content">
                    <div className="page__header">
                        <h1 className="page__title">
                            <Link to={`/applications/${application_id}`}>
                                <img src={Back} alt="Back" />
                            </Link>{' '}
                            Feedback
                        </h1>
                    </div>
                    <div className="feedback__details">
                        <div className="feedback__details-item">
                            <div className="feedback__details-item-label">
                                <span>Description</span>
                            </div>
                            <div className="feedback__details-item-value">
                                <span>{feedback?.description}</span>
                            </div>
                        </div>
                        <div className="feedback__details-item">
                            <div className="feedback__details-item-label">
                                <span>Sent at</span>
                            </div>
                            <div className="feedback__details-item-value">
                                <span>{feedback?.created_at}</span>
                            </div>
                        </div>
                        <div className="feedback__details-item">
                            <div className="feedback__details-item-label">
                                <span>IP</span>
                            </div>
                            <div className="feedback__details-item-value">
                                <span>{feedback?.ip}</span>
                            </div>
                        </div>
                        <div className="feedback__details-item">
                            <div className="feedback__details-item-label">
                                <span>User Agent</span>
                            </div>
                            <div className="feedback__details-item-value">
                                <span>
                                    Sent via{' '}
                                    <b>
                                        {feedback?.user_agent_obj?.browser.name}{' '}
                                        {
                                            feedback?.user_agent_obj?.browser
                                                .version
                                        }
                                    </b>{' '}
                                    on{' '}
                                    <b>
                                        {feedback?.user_agent_obj?.os.name}{' '}
                                        {feedback?.user_agent_obj?.os.version}
                                    </b>
                                </span>
                            </div>
                        </div>
                        <div className="feedback__details-item">
                            <div className="feedback__details-item-label">
                                <span>Actions</span>
                            </div>
                            <div className="feedback__details-item-value">
                                <Button
                                    onClick={handleDelete}
                                    className="button--danger"
                                    text="Delete"
                                    type="small"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

Feedback.defaultProps = {
    id: 0,
    application_id: 0,
    description: '',
    ip: '',
    user_agent: '',
    created_at: '',
}

export default Feedback
