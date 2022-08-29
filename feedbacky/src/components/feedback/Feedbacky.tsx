import { useState } from 'react'
import * as React from 'react'
import FeedbackyModal from '../modal/FeedbackyModal'
import styles from './feedbacky.module.scss'

import axios from 'axios'

axios.defaults.baseURL = ''
axios.defaults.headers.post['Content-Type'] = 'application/json'

const FeedbackyIcon = () => (
    <svg width={30} height={22.5} xmlns='http://www.w3.org/2000/svg'>
        <path
            d='M27 0C27.7956 0 28.5587 0.316071 29.1213 0.87868C29.6839 1.44129 30 2.20435 30 3V19.5C30 20.2956 29.6839 21.0587 29.1213 21.6213C28.5587 22.1839 27.7956 22.5 27 22.5H3C2.20435 22.5 1.44129 22.1839 0.87868 21.6213C0.316071 21.0587 0 20.2956 0 19.5V3C0 2.20435 0.316071 1.44129 0.87868 0.87868C1.44129 0.316071 2.20435 0 3 0L27 0ZM22.0605 11.6925C21.8795 11.6102 21.6732 11.6032 21.487 11.6729C21.3008 11.7427 21.1499 11.8835 21.0675 12.0645C19.9425 14.5403 17.9625 15.75 15 15.75C12.0375 15.75 10.0575 14.5403 8.9325 12.0645C8.89318 11.9727 8.8359 11.8896 8.76404 11.8202C8.69217 11.7508 8.60716 11.6964 8.51401 11.6603C8.42085 11.6242 8.32141 11.6071 8.22155 11.61C8.12168 11.6128 8.02339 11.6356 7.93245 11.677C7.84151 11.7184 7.75975 11.7775 7.69198 11.8509C7.62421 11.9243 7.57178 12.0105 7.53778 12.1045C7.50379 12.1984 7.4889 12.2982 7.49401 12.398C7.49911 12.4978 7.5241 12.5955 7.5675 12.6855C8.94225 15.7095 11.4622 17.25 15 17.25C18.5378 17.25 21.0577 15.7095 22.4325 12.6855C22.5148 12.5045 22.5218 12.2982 22.4521 12.112C22.3823 11.9258 22.2415 11.7749 22.0605 11.6925V11.6925ZM11.25 6C11.0511 6 10.8603 6.07902 10.7197 6.21967C10.579 6.36032 10.5 6.55109 10.5 6.75V9L10.5052 9.08775C10.5278 9.27757 10.622 9.45161 10.7686 9.5743C10.9152 9.69699 11.1031 9.75908 11.294 9.74788C11.4848 9.73668 11.6641 9.65303 11.7954 9.51403C11.9266 9.37502 11.9998 9.19116 12 9V6.75L11.9948 6.66225C11.9733 6.47981 11.8856 6.31161 11.7483 6.18954C11.611 6.06747 11.4337 6.00002 11.25 6ZM18.75 6C18.5511 6 18.3603 6.07902 18.2197 6.21967C18.079 6.36032 18 6.55109 18 6.75V9L18.0052 9.08775C18.0278 9.27757 18.122 9.45161 18.2686 9.5743C18.4152 9.69699 18.6031 9.75908 18.794 9.74788C18.9848 9.73668 19.1641 9.65303 19.2954 9.51403C19.4266 9.37502 19.4998 9.19116 19.5 9V6.75L19.4948 6.66225C19.4733 6.47981 19.3856 6.31161 19.2483 6.18954C19.111 6.06747 18.9337 6.00002 18.75 6V6Z'
            fill='#fff'
            fillRule='evenodd'
        />
    </svg>
)

export interface FeedbackyProps {
    id?: string
    token: string
    primaryColor?: string
    secondaryColor?: string
    maxLength?: number
    title?: string
    description?: string
    successMessage?: string
    zIndex?: string
    baseURL?: string
}

export const Feedbacky = (props: FeedbackyProps): JSX.Element => {
    const { zIndex } = props
    const [isToggle, setIsToggle] = useState(false)

    axios.defaults.baseURL = props.baseURL
        ? props.baseURL
        : axios.defaults.baseURL

    const toggle = () => {
        setIsToggle(!isToggle)
    }

    return (
        <React.Fragment>
            <button
                className={styles.button}
                style={{ zIndex }}
                onClick={toggle}
            >
                <FeedbackyIcon />
            </button>
            {isToggle && (
                <FeedbackyModal
                    toggle={() => {
                        setIsToggle(!isToggle)
                    }}
                    {...props}
                />
            )}
        </React.Fragment>
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
