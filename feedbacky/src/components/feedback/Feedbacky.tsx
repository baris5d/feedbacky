import React, { useState } from 'react'
import FeedbackyModal from '../modal/FeedbackyModal'
import FeedBackIcon from '../../feedback-icon.svg'
import styles from './feedbacky.module.scss'

export interface FeedbackyProps {
    token?: string
    primaryColor?: string
    secondaryColor?: string
    gradientColor?: string
    maxLength?: number
    title?: string
    description?: string
    successMessage?: string
    zIndex?: string
}

const Feedbacky = (props: FeedbackyProps): JSX.Element => {
    const { zIndex } = props
    const [isToggle, setIsToggle] = useState(false)

    const toggle = () => {
        setIsToggle(!isToggle)
    }

    return (
        <>
            <button
                className={styles.button}
                style={{ zIndex }}
                onClick={toggle}
            >
                <img src={FeedBackIcon} alt="Feedback" />
            </button>
            {isToggle && (
                <FeedbackyModal
                    toggle={() => {
                        setIsToggle(!isToggle)
                    }}
                    {...props}
                />
            )}
        </>
    )
}

Feedbacky.defaultProps = {
    primaryColor: '#4B4B67',
    secondaryColor: '#5c5c90',
    maxLength: 2000,
    title: 'Feedback',
    description: 'Share your thoughts with us',
    successMessage: 'Thanks for your feedback',
    zIndex: 99999,
}

export default Feedbacky
