import moment from 'moment';
import Feedback, { FeedbackProps } from '../pages/feedback/Feedback';
import UAParser from 'ua-parser-js'

export const BASE_URL = 'http://localhost:3001/api/v1'

export default class FeedbackService {
    static fetchAll = async (application_id: number|string) => {
        const response = await fetch(`${BASE_URL}/applications/${application_id}/feedbacks`)
        return (await response.json()).map((application: any) => this.transform(application));
    }

    static fetch = async (application_id: number|string, id: number|string) : Promise<FeedbackProps> => {
        try {
            const response = await fetch(`${BASE_URL}/applications/${application_id}/feedbacks/${id}`)
            const data = await response.json()
            return this.transform(data)
        } catch (e) {
            return Feedback.defaultProps
        }
    }

    static delete = async (application_id: number|string, id: number|string) : Promise<FeedbackProps> => {
        const response = await fetch(`${BASE_URL}/applications/${application_id}/feedbacks/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        return await response.json()
    }

    static transform = (data: FeedbackProps) : FeedbackProps => {
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