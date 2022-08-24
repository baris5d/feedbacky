import React, { useState } from 'react'
import { FeedbackyProps } from '../feedback/Feedbacky'
import classNames from 'classnames'
import styles from './feedbackyModal.module.scss'

export interface ModalTypes extends Omit<FeedbackyProps, ''> {
    toggle: () => void
}

const BASE_URL = 'http://0.0.0.0:5001/api/v1/applications/1/feedbacks'

const FeedbackyModal = (props: ModalTypes) => {
    const {
        toggle,
        title,
        description,
        maxLength,
        zIndex,
        primaryColor,
        secondaryColor,
    } = props
    const [message, setMessage] = useState('')

    const submit = () => {
        fetch(BASE_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    content: message
                }),
                })
            .then(() => {
                setMessage('')
                toggle()
            }).catch(err => {
                console.log(err)
            })
    }

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setMessage(e.target.value)
    }

    const messageLength = () => {
        return message.length
    }

    const getClassName = (maxLength: number = 2000) => {
        if (messageLength() === maxLength) {
            return '--danger'
        } else if (messageLength() > (maxLength / 5) * 4) {
            return '--warning'
        }
    }

    const gradientBackground = () => {
        return {
            background: `linear-gradient(to right, ${primaryColor} 0%, ${secondaryColor} 100%)`,
        }
    }

    return (
        <div className={styles.modal} style={{ zIndex }}>
            <div className={styles.modal__content}>
                <span className={styles.modal__closeButton} onClick={toggle}>
                    &times;
                </span>
                <div
                    className={styles.modal__header}
                    style={gradientBackground()}
                >
                    <h2>{title}</h2>
                </div>
                <div className={styles.modal__body}>
                    <div
                        className={classNames(
                            styles.modal__formGroup,
                            styles.__center
                        )}
                    >
                        <span>{description}</span>
                    </div>
                    <div className={styles.modal__formGroup}>
                        <textarea
                            name="message"
                            onChange={handleChange}
                            maxLength={maxLength}
                        ></textarea>
                        <label className={getClassName(maxLength)}>
                            {messageLength()} / {maxLength}
                        </label>
                    </div>
                    <div
                        className={classNames(
                            styles.modal__formGroup,
                            styles.__right
                        )}
                    >
                        <button
                            className={classNames(styles.modal__submit)}
                            style={{ backgroundColor: primaryColor }}
                            onClick={() => {
                                submit()
                            }}
                            disabled={messageLength() === 0}
                        >
                            Submit
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default FeedbackyModal
