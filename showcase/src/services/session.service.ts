import { User } from '../models/user'

export default class SessionService {
    static saveToken = (token: string) => {
        localStorage.setItem('token', token)
    }

    static saveUser = (user: User) => {
        localStorage.setItem('user', JSON.stringify(user))
    }

    static getToken = () => {
        return JSON.parse(localStorage.getItem('token') || '{}')
    }

    static removeSession = () => {
        localStorage.removeItem('token')
        localStorage.removeItem('user')
        return true
    }

    static hasToken = () => {
        return !!localStorage.getItem('token')
    }

    static getUser = () => {
        if (this.hasToken()) {
            return JSON.parse(localStorage.getItem('user') || '{}')
        }
        return
    }
}
