import moment from 'moment'
import Feedback, { FeedbackProps } from '../pages/feedback/Feedback'
import UAParser from 'ua-parser-js'
import axios from 'axios'

export default class FeedbackService {
    static fetchAll = async (application_id: number | string) => {
        const response = await axios.get(
            `/applications/${application_id}/feedbacks`
        )
        return ((await response.data) || { feedbacks: [] }).feedbacks.map(
            (application: any) => this.transform(application)
        )
    }

    static fetch = async (
        application_id: number | string,
        id: number | string
    ): Promise<FeedbackProps> => {
        try {
            const response = await axios.get(
                `/applications/${application_id}/feedbacks/${id}`
            )
            const data = await response.data
            return this.transform(data)
        } catch (e) {
            return Feedback.defaultProps
        }
    }

    static delete = async (
        application_id: number | string,
        id: number | string
    ): Promise<FeedbackProps> => {
        const response = await axios.delete(
            `/applications/${application_id}/feedbacks/${id}`
        )
        return await response.data
    }

    static transform = (data: FeedbackProps): FeedbackProps => {
        let userAgent = new UAParser(data.user_agent).getResult()
        return {
            id: data.id,
            application_id: data.application_id,
            description: data.description,
            ip: data.ip,
            user_agent: data.user_agent,
            user_agent_obj: userAgent,
            created_at: moment(data.created_at).format('LLL'),
        }
    }
}
