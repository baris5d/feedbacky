import moment from 'moment';
import Application, { ApplicationProps } from '../pages/applications/application/Application';

export const BASE_URL = 'http://localhost:3001/api/v1'

export default class ApplicationService {
    static fetchAll = async () => {
        const response = await fetch(`${BASE_URL}/applications`)
        return (await response.json()).map((application: any) => this.transform(application));
    }

    static fetch = async (id: number|string) : Promise<ApplicationProps> => {
        try {
            const response = await fetch(`${BASE_URL}/applications/${id}`)
            const data = await response.json()
            return this.transform(data)
        } catch (e) {
            return Application.defaultProps
        }
    }

    static create = async (data: ApplicationProps) : Promise<ApplicationProps> => {
        const response = await fetch(`${BASE_URL}/applications`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        return await response.json()
    }

    static update = async (id: number|string, data: ApplicationProps) : Promise<ApplicationProps> => {
        const response = await fetch(`${BASE_URL}/applications/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        return await response.json()
    }

    static delete = async (id: number|string) : Promise<ApplicationProps> => {
        const response = await fetch(`${BASE_URL}/applications/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        return await response.json()
    }

    static transform = (data: ApplicationProps) : ApplicationProps => {
        return {
            id: data.id,
            name: data.name,
            feedback_count: data.feedback_count,
            hash: data.hash,
            created_at: moment(data.created_at).format('LLL'),
        }
    }
}