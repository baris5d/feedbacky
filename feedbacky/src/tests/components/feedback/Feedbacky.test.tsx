import React from 'react'
import Enzyme, { shallow } from 'enzyme'
import { Feedbacky } from '../../../components/feedback/Feedbacky'
import Adapter from 'enzyme-adapter-react-16'

Enzyme.configure({ adapter: new Adapter() })

describe('feedbacky component', () => {
    it('renders modal when toggle button clicked', () => {
        const wrapper = shallow(<Feedbacky token='test' />)
        const toggleButton = wrapper.find('button')
        toggleButton.simulate('click')

        expect(wrapper.find('FeedbackyModal').exists()).toBe(true)
    })

    it('does not render modal when toggle button not clicked', () => {
        const wrapper = shallow(<Feedbacky token='test' />)

        expect(wrapper.find('FeedbackyModal').exists()).toBe(false)
    })

    it('passes and renders optional title prop correctly', () => {
        const wrapper = shallow(<Feedbacky token='test' title='Custom Title' />)

        const toggleButton = wrapper.find('button')
        toggleButton.simulate('click')

        // const modalTitle = wrapper.findWhere(node => node.text() == 'Custom Title');

        expect(wrapper.find('h2')).toHaveLength(1)
    })
})
