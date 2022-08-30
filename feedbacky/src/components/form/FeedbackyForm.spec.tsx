import * as React from 'react'
import '@testing-library/jest-dom'
import { render, screen, wait } from '@testing-library/react'
import FeedbackyForm from './FeedbackyForm'
import userEvent from '@testing-library/user-event'

describe('feedbacky form', () => {
    it('textarea should not exceed 2000 characters as default', async () => {
        render(<FeedbackyForm />)
        const textInput = screen.getByTestId('feedbacky-form-textarea')
        const longText =
            'abcdefghijklmnoprstxuvwyzabcdefghijklmnoprstxuvwyzabcdefghijklmnoprstxuvwyzabcdefghijklmnoprstxuvwyzabcdefghijklmnoprstxuvwyzabcdefghijklmnoprstxuvwyzabcdefghijklmnoprstxuvwyzabcdefghijklmnoprstxuvwyzabcdefghijklmnoprstxuvwyzabcdefghijklmnoprstxuvwyzabcdefghijklmnoprstxuvwyzabcdefghijklmnoprstxuvwyzabcdefghijklmnoprstxuvwyzabcdefghijklmnoprstxuvwyzabcdefghijklmnoprstxuvwyzabcdefghijklmnoprstxuvwyzabcdefghijklmnoprstxuvwyzabcdefghijklmnoprstxuvwyhijklmnoprstxuvwyzabcdefghijklmnoprstxuvwyzabcdefghijklmnoprstxuvwyzabcdefghijklmnoprstxuvwyzabcdefghijklmnoprstxuvwyzabcdefghijklmnoprstxuvwyzabcdefghijklmnoprstxuvwyzabcdefghijklmnoprstxuvwyzabcdefghijklmnoprstxuvwyzabcdefghijklmnoprstxuvwyzabcdefghijklmnoprstxuvwyzabcdefghijklmnoprstxuvwyzabcdefghijklmnoprstxuvwyzabcdefghijklmnoprstxuvwyzabcdefghijklmnoprstxuvwyzabcdefghijklmnoprstxuvwyzabcdefghijklmnoprstxuvwyz'
        const textInputAllowedText = longText.slice(0, 2000)
        await userEvent.type(textInput, longText)
        await wait(() => {
            expect(textInput).toHaveValue(textInputAllowedText)
        })
    })

    it("button should be disabled if there's no text in textare", () => {
        render(<FeedbackyForm />)
        const textInput = screen.getByTestId('feedbacky-form-textarea')
        const button = screen.getByTestId('feedbacky-form-button')
        expect(button).toBeDisabled()
        userEvent.type(textInput, 'text')
        expect(button).not.toBeDisabled()
    })

    it('label should have modal__label--danger class if textarea length is equal to maxLength', () => {
        render(<FeedbackyForm />)
        const textInput = screen.getByTestId('feedbacky-form-textarea')
        const label = screen.getByTestId('maxlength-label')
        expect(label).not.toHaveClass('modal__label--danger')
        const longText = '!'.repeat(2000)
        userEvent.type(textInput, longText)
        expect(label).toHaveClass('modal__label--danger')
    })

    it('label should have modal__label--warning class if textarea length is equal to (maxLength / 5) * 4', () => {
        render(<FeedbackyForm />)
        const textInput = screen.getByTestId('feedbacky-form-textarea')
        const label = screen.getByTestId('maxlength-label')
        expect(label).not.toHaveClass('modal__label--warning')
        const longText = '!'.repeat((2000 / 5) * 4 + 1)
        userEvent.type(textInput, longText)
        expect(label).toHaveClass('modal__label--warning')
    })
})
