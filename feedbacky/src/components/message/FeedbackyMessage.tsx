import classNames from 'classnames'
import styles from './feedbackyMessage.module.scss'

export interface MessageTypes {
    message?: string
    type: 'success' | 'error'
}

const FeedbackyMessage = (props: MessageTypes) => {
    const { message, type } = props

    const messageClasses = classNames(styles.modal__message, {
        [styles['modal__message--success']]: type === 'success',
        [styles['modal__message--error']]: type === 'error',
    })

    return (
        <div className={messageClasses}>
            <p>{message}</p>
        </div>
    )
}

export default FeedbackyMessage
