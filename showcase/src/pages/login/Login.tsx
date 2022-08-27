import { useState } from 'react'
import { Link } from 'react-router-dom'
import Button from '../../common/components/button/Button'
import AuthService from '../../services/auth.service'
import SessionService from '../../services/session.service'
import Validation from '../../utils/Validation'

const Login = () => {
    const [user, setUser] = useState({
        email: '',
        password: '',
    })
    const [errors, setErrors] = useState({
        email: '',
        password: '',
        form: '',
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUser({ ...user, [e.target.name]: e.target.value })
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setErrors((_) => {
            return { email: '', password: '', form: '' }
        })
        if (
            Validation.isEmail(user.email) &&
            Validation.passwordLength(user.password)
        ) {
            AuthService.login(user.email, user.password)
                .then((response) => {
                    SessionService.saveToken(response.data.access_token)
                    SessionService.saveUser(response.data.user)
                    window.location.href = '/applications'
                })
                .catch((error) => {
                    setErrors((_) => {
                        return {
                            ..._,
                            form: error.response.data.message,
                        }
                    })
                })
        } else {
            setErrors((_) => {
                return {
                    email: Validation.isEmail(user.email)
                        ? ''
                        : 'Invalid email',
                    password: Validation.passwordLength(user.password)
                        ? ''
                        : 'Password must be between 8 and 20 characters',
                    form: '',
                }
            })
        }
    }

    return (
        <div className="page register">
            <div className="container">
                <div
                    className="modal"
                    style={{
                        marginTop: '50px',
                    }}
                >
                    <form
                        className="form"
                        id="register-form"
                        onSubmit={handleSubmit}
                    >
                        <div className="modal__header">
                            <h2 className="modal__title">Login</h2>
                        </div>
                        <div className="modal__body">
                            <div className="form__group">
                                <input
                                    className="form__input"
                                    type="email"
                                    placeholder="Email"
                                    required
                                    value={user.email}
                                    name="email"
                                    onChange={handleChange}
                                />
                                {errors.email && (
                                    <label
                                        className="form__warning-message"
                                        htmlFor="email"
                                    >
                                        {errors.email}
                                    </label>
                                )}
                            </div>
                            <div className="form__group">
                                <input
                                    className="form__input"
                                    type="password"
                                    placeholder="Password"
                                    required
                                    value={user.password}
                                    name="password"
                                    onChange={handleChange}
                                />
                                {errors.password && (
                                    <label
                                        className="form__warning-message"
                                        htmlFor="password"
                                    >
                                        {errors.password}
                                    </label>
                                )}
                            </div>
                            <div className="form__group">
                                {errors.form && (
                                    <label className="form__warning-message">
                                        {errors.form}
                                    </label>
                                )}
                                <Button
                                    text="Login"
                                    className="button--large"
                                ></Button>
                            </div>
                        </div>
                        <div className="modal__footer">
                            <p>
                                Don't have account?{' '}
                                <Link to="/register">Register</Link>
                            </p>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Login
