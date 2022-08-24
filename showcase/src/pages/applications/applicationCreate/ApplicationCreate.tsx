import ApplicationService from '../../../services/application.service'
import { ApplicationProps } from '../application/Application'
import ApplicationForm from '../components/applicationForm/ApplicationForm'
import Back from '../../../common/assets/back.svg'
import { Link } from 'react-router-dom'

const ApplicationCreate = () => {
    const handleSubmit = (application: ApplicationProps) => {
        ApplicationService.create(application)
            .then(() => {
                window.location.href = '/applications'
            })
            .catch((error) => {
                console.log(error)
            })
    }

    return (
        <div className="page application-create">
            <div className="container">
                <div className="page__content">
                    <div className="page__header">
                        <h1 className="page__title">
                            <Link to={`/applications/`}>
                                <img src={Back} alt="Back" />
                            </Link>{' '}
                            Create Application
                        </h1>
                    </div>
                    <ApplicationForm onSubmit={handleSubmit} />
                </div>
            </div>
        </div>
    )
}

export default ApplicationCreate
