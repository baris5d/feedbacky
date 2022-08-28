import { useState } from 'react'
import * as React from 'react'
import FeedbackyModal from '../modal/FeedbackyModal'
import FeedBackIcon from '../../feedback-icon.svg'
import styles from './feedbacky.module.scss'

import axios from 'axios'

axios.defaults.baseURL = ''
axios.defaults.headers.post['Content-Type'] = 'application/json'

export interface FeedbackyProps {
    hash: string
    primaryColor?: string
    secondaryColor?: string
    gradientColor?: string
    maxLength?: number
    title?: string
    description?: string
    successMessage?: string
    zIndex?: string
}

export const Feedbacky = (props: FeedbackyProps): JSX.Element => {
    const { zIndex } = props
    const [isToggle, setIsToggle] = useState(false)

    const toggle = () => {
        setIsToggle(!isToggle)
    }

    return (
        <div>
            <button
                className={styles.button}
                style={{ zIndex }}
                onClick={toggle}
            >
                <img src={FeedBackIcon} alt='Feedback' />
            </button>
            {isToggle && (
                <FeedbackyModal
                    toggle={() => {
                        setIsToggle(!isToggle)
                    }}
                    {...props}
                />
            )}
        </div>
    )
}

Feedbacky.defaultProps = {
    primaryColor: '#4B4B67',
    secondaryColor: '#5c5c90',
    maxLength: 2000,
    title: 'Feedback',
    description: 'Share your thoughts with us',
    successMessage: 'Thanks for your feedback',
    zIndex: 99999
}
