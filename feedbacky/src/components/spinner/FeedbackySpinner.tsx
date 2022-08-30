import React from 'react'
import styles from './feedbackySpinner.module.scss'

const FeedbackySpinner = () => {
    return (
        <div data-testid='spinner' className={styles.modal__spinner}>
            <div className={styles.modal__spinner_row}></div>
            <div className={styles.modal__spinner_row}></div>
            <div className={styles.modal__spinner_row}></div>
            <div className={styles.modal__spinner_row}></div>
        </div>
    )
}

export default FeedbackySpinner
