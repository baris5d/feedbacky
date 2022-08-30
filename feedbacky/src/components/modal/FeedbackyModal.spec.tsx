import * as React from 'react'
import FeedbackyModal, { ModalTypes } from './FeedbackyModal'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'

describe('modal tests', () => {
    it('should render modal', () => {
        const props: ModalTypes = {
            toggle: () => {},
            token: ''
        }
        render(<FeedbackyModal {...props} />)

        const modal = screen.getByTestId('feedbacky-modal')
        expect(modal).toBeInTheDocument()
    })

    it('should render idle state', () => {
        const setStateMock = jest.fn()
        const useStateMock: any = (useState: any) => [useState, setStateMock]
        jest.spyOn(React, 'useState').mockImplementation(useStateMock)
        setStateMock('idle')

        const props: ModalTypes = {
            toggle: () => {},
            token: ''
        }

        render(<FeedbackyModal {...props} />)

        setTimeout(() => {
            const modal = screen.getByTestId('feedbacky-modal-form')
            expect(modal).toBeInTheDocument()
        }, 500)
    })
})
