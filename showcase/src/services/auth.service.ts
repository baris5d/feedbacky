import axios from 'axios'

export default class AuthService {
    static register = async (email: string, password: string) => {
        return axios.post(`/register`, { email, password })
    }
    static login = async (email: string, password: string) => {
        return axios.post(`/login`, { email, password })
    }
    static logout = async () => {
        return axios.post(`/logout`)
    }
}
