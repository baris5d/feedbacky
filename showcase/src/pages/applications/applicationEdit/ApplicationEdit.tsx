import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import ApplicationService from '../../../services/application.service'
import { ApplicationProps } from '../application/Application'
import ApplicationForm from '../components/applicationForm/ApplicationForm'
import Back from '../../../common/assets/back.svg'

const ApplicationEdit = () => {
    const [application, setApplication] = useState<ApplicationProps>()

    const { id } = useParams<{ id: string }>()

    useEffect(() => {
        if (id !== undefined) {
            ApplicationService.fetch(id).then(setApplication)
        }
    }, [id])

    const handleSubmit = (application: ApplicationProps) => {
        if (id !== undefined) {
            ApplicationService.update(id, application)
                .then(() => {
                    window.location.href = '/applications'
                })
                .catch((error) => {
                    console.log(error)
                })
        }
    }

    const handleDelete = () => {
        if (id !== undefined) {
            ApplicationService.delete(id)
                .then(() => {
                    window.location.href = '/applications'
                })
                .catch((error) => {
                    console.log(error)
                })
        }
    }

    return (
        <div className="page application-edit">
            <div className="container">
                <div className="page__content">
                    <div className="page__header">
                        <h1 className="page__title">
                            <Link to={`/applications/`}>
                                <img src={Back} alt="Back" />
                            </Link>{' '}
                            Edit Application
                        </h1>
                    </div>
                    <ApplicationForm
                        application={application}
                        onSubmit={handleSubmit}
                        onDelete={handleDelete}
                    />
                </div>
            </div>
        </div>
    )
}

export default ApplicationEdit
