import React, { useEffect, useState } from 'react'
import Button from '../../../../common/components/button/Button'
import Application, { ApplicationProps } from '../../application/Application'

export interface ApplicationFormProps {
    application?: ApplicationProps
    onSubmit?: (application: ApplicationProps) => void
    onDelete?: (application: ApplicationProps) => void
}

const ApplicationForm = (props: ApplicationFormProps) => {
    const [isEditing, setIsEditing] = useState(false)

    const [application, setApplication] = useState<ApplicationProps>(
        Application.defaultProps
    )

    useEffect(() => {
        if (props.application) {
            setApplication(props.application)

            if (props.application.id) {
                setIsEditing(true)
            }
        }
    }, [props.application])

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setApplication({ ...application, [e.target.name]: e.target.value })
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (props.onSubmit) {
            props.onSubmit(application)
        }
    }

    return (
        <form className="form" id="application-form" onSubmit={handleSubmit}>
            <input
                className="form__input"
                type="text"
                placeholder="Application Name"
                required
                value={application?.name}
                name="name"
                onChange={handleChange}
            />
            <div className="form__actions">
                {isEditing && props.onDelete && (
                    <Button
                        className="button--danger"
                        type="small"
                        text="Delete"
                        onClick={() =>
                            props.onDelete && props.onDelete(application)
                        }
                    ></Button>
                )}
                <Button
                    type="small"
                    text={isEditing ? 'Update' : 'Create'}
                ></Button>
            </div>
        </form>
    )
}

export default ApplicationForm
