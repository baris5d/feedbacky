import axios from 'axios'

export const BASE_URL = 'http://localhost:5002/api/v1'

export default class AuthService {
    static register = async (email: string, password: string) => {
        return axios(`${BASE_URL}/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            data: JSON.stringify({ email, password }),
        })
    }
    static login = async (email: string, password: string) => {
        return axios(`${BASE_URL}/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            data: JSON.stringify({ email, password }),
        })
    }
    static logout = async () => {
        return await axios(`${BASE_URL}/logout`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
        })
    }
}
