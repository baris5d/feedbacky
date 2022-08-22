import { useEffect, useState } from 'react'
import Button from '../../common/components/button/Button'

export interface IApplication {
    id: number
    name: string
    status: string
    feedback_count: number
    created_at: string
}

const Applications = () => {
    const [userApplications, setUserApplications] = useState<IApplication[]>([])

    useEffect(() => {
        // TODO: fetch user applications
        setUserApplications([])
    }, [])

    return (
        <div className="page applications">
            <div className="container">
                <div className="page__header">
                    <h1 className="page__title">Applications</h1>
                    <div className="page__actions">
                        <Button
                            url="/applications/new"
                            text="Create Application"
                        />
                    </div>
                </div>
                <div className="applications__list table">
                    <div className="table__header">
                        <div className="table__row">
                            <div className="table__header-cell">
                                <span>Name</span>
                            </div>
                            <div className="table__header-cell">
                                <span>Status</span>
                            </div>
                            <div className="table__header-cell">
                                <span>Feedbacks</span>
                            </div>
                            <div className="table__header-cell">
                                <span>Created</span>
                            </div>
                            <div className="table__header-cell">
                                <span>Actions</span>
                            </div>
                        </div>
                    </div>
                    <div className="table__body">
                        {userApplications.map((application) => (
                            <div key={application.id} className="table__row">
                                <div className="table__cell">
                                    <span>{application.name}</span>
                                </div>
                                <div className="table__cell">
                                    <span>{application.status}</span>
                                </div>
                                <div className="table__cell">
                                    <span>{application.feedback_count}</span>
                                </div>
                                <div className="table__cell">
                                    <span>{application.created_at}</span>
                                </div>
                                <div className="table__cell">
                                    <Button
                                        url={`/applications/${application.id}`}
                                        text="View"
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Applications
