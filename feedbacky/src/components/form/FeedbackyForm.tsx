import React, { useEffect, useState } from 'react'
import classNames from 'classnames'
import styles from '../modal/feedbackyModal.module.scss'

export interface FormTypes {
  message?: string
  description?: string
  maxLength?: number
  primaryColor?: string
  onSubmit?: (message: string) => void
}

const FeedbackyForm = (props: FormTypes) => {
  const { description, maxLength, primaryColor, onSubmit, message } = props

  const [_message, setMessage] = useState('')

  useEffect(() => {
    if (message) {
      setMessage(message)
    }
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value)
  }

  const messageLength = () => {
    return _message.length
  }

  const getClassName = (maxLength: number = 2000) => {
    if (messageLength() === maxLength) {
      return 'modal__label--danger'
    } else if (messageLength() > (maxLength / 5) * 4) {
      return 'modal__label--warning'
    }
    return 'modal__label--safe'
  }

  return (
    <React.Fragment>
      <div className={classNames(styles.modal__formGroup, styles.__center)}>
        <p className={styles.modal__formDescription}>{description}</p>
      </div>
      <div className={styles.modal__formGroup}>
        <textarea
          name='message'
          onChange={handleChange}
          maxLength={maxLength}
          spellCheck={false}
          value={_message}
        ></textarea>
        <label className={styles[getClassName(maxLength)]}>
          {messageLength()} / {maxLength}
        </label>
      </div>
      <div className={classNames(styles.modal__formGroup, styles.__right)}>
        <button
          className={classNames(styles.modal__submit)}
          style={{ backgroundColor: primaryColor }}
          onClick={() => {
            if (onSubmit) {
              onSubmit(_message)
            }
          }}
          disabled={messageLength() === 0}
        >
          Submit
        </button>
      </div>
    </React.Fragment>
  )
}

export default FeedbackyForm
