import React, { useEffect, useState } from 'react'
import { FeedbackyProps } from '../feedback/Feedbacky'
import styles from './feedbackyModal.module.scss'
import FeedbackyForm from '../form/FeedbackyForm'
import FeedbackyMessage from '../message/FeedbackyMessage'
import FeedbackySpinner from '../spinner/FeedbackySpinner'
import axios from 'axios'

export interface ModalTypes extends Omit<FeedbackyProps, ''> {
  toggle: () => void
}

const FeedbackyModal = (props: ModalTypes) => {
  const [currentStatus, setCurrentStatus] = useState<
    'idle' | 'success' | 'error' | 'loading'
  >('idle')
  const [responseMessage, setResponseMessage] = useState<string>()

  const [message, setMessage] = useState<string>('')

  const {
    toggle,
    title,
    description,
    maxLength,
    zIndex,
    primaryColor,
    secondaryColor,
    successMessage,
    hash
  } = props

  useEffect(() => {
    const keyDownHandler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault()
        toggle()
      }
    }

    document.addEventListener('keydown', keyDownHandler)

    return () => {
      document.removeEventListener('keydown', keyDownHandler)
    }
  }, [])

  const handleSubmit = (message: string) => {
    setMessage(message)
    setCurrentStatus('loading')
    axios
      .post(`/feedbacks/${hash}`, { description: message })
      .then(() => {
        setCurrentStatus('success')
        setResponseMessage(successMessage)
      })
      .catch((err) => {
        console.error(err)
        setCurrentStatus((_) => 'error')
        setResponseMessage('Something went wrong, please try again later')
      })
  }

  const gradientBackground = () => {
    return {
      background: `linear-gradient(to right, ${primaryColor} 0%, ${secondaryColor} 100%)`
    }
  }

  return (
    <div className={styles.modal} style={{ zIndex }}>
      <div className={styles.modal__content}>
        <span className={styles.modal__closeButton} onClick={toggle}>
          &times;
        </span>
        <div className={styles.modal__header} style={gradientBackground()}>
          <h2>{title}</h2>
        </div>
        {currentStatus === 'error' && (
          <FeedbackyMessage message={responseMessage} type='error' />
        )}
        <div className={styles.modal__body}>
          {(currentStatus === 'idle' || currentStatus === 'error') && (
            <FeedbackyForm
              message={message}
              description={description}
              maxLength={maxLength}
              primaryColor={primaryColor}
              onSubmit={handleSubmit}
            />
          )}
          {currentStatus === 'loading' && <FeedbackySpinner />}
          {currentStatus === 'success' && (
            <FeedbackyMessage message={responseMessage} type={currentStatus} />
          )}
        </div>
      </div>
    </div>
  )
}

export default FeedbackyModal
