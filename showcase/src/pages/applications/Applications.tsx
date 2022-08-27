import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Button from '../../common/components/button/Button'
import ApplicationService from '../../services/application.service'
import { ApplicationProps } from './application/Application'

const Applications = () => {
    const [userApplications, setUserApplications] = useState<
        ApplicationProps[]
    >([])

    useEffect(() => {
        ApplicationService.fetchAll().then(setUserApplications)
    }, [])

    return (
        <div className="page applications">
            <div className="container">
                <div className="page__header">
                    <h1 className="page__title">Applications</h1>
                    <div className="page__actions">
                        <Button
                            url="/application/create"
                            text="Create Application"
                            type="small"
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
                                <span>Key / Hash</span>
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
                                    <span>
                                        <code className="spoiler">
                                            {application.hash}
                                        </code>
                                    </span>
                                </div>
                                <div className="table__cell">
                                    <span>{application.created_at}</span>
                                </div>
                                <div className="table__cell">
                                    <Link
                                        to={`/applications/${application.id}`}
                                    >
                                        View
                                    </Link>
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
