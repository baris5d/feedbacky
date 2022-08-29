import { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import ApplicationService from '../../../services/application.service'
import FeedbackService from '../../../services/feedback.service'
import { FeedbackProps } from '../../feedback/Feedback'
import Back from '../../../common/assets/back.svg'
import './Application.css'
import Button from '../../../common/components/button/Button'

export interface ApplicationProps {
    id: number
    name: string
    token: string
    created_at: string
    application_id: number
}

const Application = () => {
    const [application, setApplication] = useState<ApplicationProps>()
    const [feedbacks, setFeedbacks] = useState<FeedbackProps[]>([])

    const { id } = useParams<{ id: string }>()

    useEffect(() => {
        if (id !== undefined) {
            ApplicationService.fetch(id)
                .then(setApplication)
                .then((_) => {
                    FeedbackService.fetchAll(id).then(setFeedbacks)
                })
        }
    }, [id])

    return (
        <div className="page application">
            <div className="container">
                <div className="page__content">
                    <div className="page__header">
                        <h1 className="page__title">
                            <Link to={`/applications/`}>
                                <img src={Back} alt="Back" />
                            </Link>{' '}
                            {application?.name}
                        </h1>
                        <Button
                            url={`/applications/${id}/edit`}
                            text="Edit"
                            type="small"
                        />
                    </div>
                    <div className="application__details">
                        <div className="application__details-item">
                            <div className="application__details-item-label">
                                <span>Name</span>
                            </div>
                            <div className="application__details-item-value">
                                <span>{application?.name}</span>
                            </div>
                        </div>
                        <div className="application__details-item">
                            <div className="application__details-item-label">
                                <span>Token</span>
                            </div>
                            <div className="application__details-item-value">
                                <span>
                                    <code>{application?.token}</code>
                                </span>
                            </div>
                        </div>
                        <div className="application__details-item">
                            <div className="application__details-item-label">
                                <span>Created</span>
                            </div>
                            <div className="application__details-item-value">
                                <span>{application?.created_at}</span>
                            </div>
                        </div>
                    </div>
                    <div className="application__feedbacks">
                        <div className="application__feedbacks__header">
                            <h2 className="application__feedbacks__title">
                                Feedbacks
                            </h2>
                        </div>
                        <div className="application__feedbacks__list table">
                            <div className="table__header">
                                <div className="table__row">
                                    <div className="table__header-cell">
                                        <span>Feedback</span>
                                    </div>
                                    <div className="table__header-cell">
                                        <span>Sent at</span>
                                    </div>
                                    <div className="table__header-cell">
                                        <span>Actions</span>
                                    </div>
                                </div>
                            </div>
                            <div className="table__body">
                                {feedbacks.map((feedback) => (
                                    <div
                                        key={feedback.id}
                                        className="table__row"
                                    >
                                        <div className="table__cell">
                                            <span>{feedback.description}</span>
                                        </div>
                                        <div className="table__cell">
                                            <span>{feedback.created_at}</span>
                                        </div>
                                        <div className="table__cell">
                                            <Link
                                                to={`/applications/${id}/feedbacks/${feedback.id}`}
                                            >
                                                Show Details
                                            </Link>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

Application.defaultProps = {
    id: 0,
    name: '',
    token: '',
    created_at: '',
    application_id: 1,
}

export default Application
