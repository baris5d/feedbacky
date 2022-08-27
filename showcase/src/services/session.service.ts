import { User } from '../models/user'

export default class SessionService {
    static saveToken = (token: string) => {
        localStorage.setItem('token', JSON.stringify(token))
    }

    static saveUser = (user: User) => {
        localStorage.setItem('user', JSON.stringify(user))
    }

    static getToken = () => {
        return JSON.parse(localStorage.getItem('token') || '{}')
    }

    static hasToken = () => {
        return !!localStorage.getItem('token')
    }
}
