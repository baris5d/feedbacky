import * as React from 'react'
import FeedbackySpinner from './FeedbackySpinner'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'

describe('spinner tests', () => {
    it('should render spinner', () => {
        render(<FeedbackySpinner />)

        const spinner = screen.getByTestId('spinner')
        expect(spinner).toBeInTheDocument()
    })
})
