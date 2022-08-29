import moment from 'moment'
import Application, {
    ApplicationProps,
} from '../pages/applications/application/Application'
import SessionService from './session.service'
import axios from 'axios'

const user = SessionService.getUser()

export default class ApplicationService {
    static fetchAll = async () => {
        const response = await axios.get('/applications')
        return ((await response.data) || { applications: [] }).applications.map(
            (application: any) => this.transform(application)
        )
    }

    static fetch = async (id: number | string): Promise<ApplicationProps> => {
        try {
            const response = await axios.get(`/applications/${id}`)
            const data = await response.data
            return this.transform(data)
        } catch (e) {
            return Application.defaultProps
        }
    }

    static create = async (
        data: ApplicationProps
    ): Promise<ApplicationProps> => {
        const response = await axios.post('/applications', data)
        return await response.data
    }

    static update = async (
        id: number | string,
        data: ApplicationProps
    ): Promise<ApplicationProps> => {
        const response = await axios.put(`/applications/${id}`, data)
        return await response.data
    }

    static delete = async (id: number | string): Promise<ApplicationProps> => {
        const response = await axios.delete(`/applications/${id}`, {})
        return await response.data
    }

    static transform = (data: ApplicationProps): ApplicationProps => {
        return {
            id: data.id,
            name: data.name,
            token: data.token,
            created_at: moment(data.created_at).format('LLL'),
            application_id: 1,
        }
    }
}
