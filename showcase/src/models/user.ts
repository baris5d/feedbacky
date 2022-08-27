export interface User {
    id?: number
    email?: string
    password?: string
}

export interface Register {
    access_token: string
    refresh_token: string
    user: User
}
