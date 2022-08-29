import React from 'react'
import FeedbackyForm from '../../../components/form/FeedbackyForm'

describe('FeedbackyForm', () => {
    it('renders textarea', () => {
        const wrapper = shallow(<FeedbackyForm />)
        expect(wrapper.find('textarea').length).toBe(1)
    })

    it('renders submit button', () => {
        const wrapper = shallow(<FeedbackyForm />)
        expect(wrapper.find('button').length).toBe(1)
    })

    it('button should be disabled if message is empty', () => {
        const wrapper = shallow(<FeedbackyForm />)
        wrapper
            .find('textarea')
            .simulate('change', { target: { value: 'test' } })
        expect(wrapper.find('button').prop('disabled')).toBe(false)
    })

    it('FeedbackyForm should call onSubmit if button is clicked', () => {
        const onSubmit = jest.fn()
        const wrapper = shallow(<FeedbackyForm onSubmit={onSubmit} />)
        wrapper
            .find('textarea')
            .simulate('change', { target: { value: 'test' } })
        wrapper.find('button').simulate('click')
        expect(onSubmit).toHaveBeenCalled()
    })
})
