import React, { useState } from 'react'
import FeedBackIcon from './feedback-icon.svg'

const Feedbacky = () => {
    const [isToggle, setIsToggle] = useState(false)

    return (
        <>
            <button
                className="button"
                onClick={() => {
                    setIsToggle(!isToggle)
                }}
            >
                <img src={FeedBackIcon} alt="Feedback" />
            </button>
            {isToggle && (
                <FeedbackyModal
                    toggle={() => {
                        setIsToggle(!isToggle)
                    }}
                />
            )}
        </>
    )
}

type ModalTypes = {
    toggle: () => void
    title?: string
    description?: string
    maxLength?: number
}

const FeedbackyModal = ({
    toggle,
    title,
    description,
    maxLength,
}: ModalTypes) => {
    const [message, setMessage] = useState('')

    const submit = () => {
        toggle()
    }

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setMessage(e.target.value)
    }

    const messageLength = () => {
        return message.length
    }

    const getClassName = (maxLength: number) => {
        if (messageLength() === maxLength) {
            return '--danger'
        } else if (messageLength() > (maxLength / 5) * 4) {
            return '--warning'
        }
    }

    return (
        <div className="modal">
            <div className="modal__content">
                <span className="modal__close-button" onClick={toggle}>
                    &times;
                </span>
                <div className="modal__header">
                    <h2>{title ? title : 'Send your feedback'}</h2>
                </div>
                <div className="modal__body">
                    <div className="modal__form-group --center">
                        <span>
                            {description
                                ? description
                                : "We'd love to hear from you!"}
                        </span>
                    </div>
                    <div className="modal__form-group">
                        <textarea
                            name="message"
                            onChange={handleChange}
                            maxLength={maxLength || 2000}
                        ></textarea>
                        <label className={getClassName(maxLength || 2000)}>
                            {messageLength()} / {maxLength || 2000}{' '}
                        </label>
                    </div>
                    <div className="modal__form-group --right">
                        <button
                            className="modal__submit"
                            onClick={() => {
                                submit()
                            }}
                            disabled={message.length === 0}
                        >
                            Submit
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Feedbacky
