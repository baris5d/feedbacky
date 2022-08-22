import { useState } from 'react'
import { Link } from 'react-router-dom'
import Button from '../../common/components/button/Button'

const Register = () => {
    let [user, setUser] = useState({
        email: '',
        password: '',
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUser({ ...user, [e.target.name]: e.target.value })
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        console.log(user)
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
                            <h2 className="modal__title">Register</h2>
                        </div>
                        <div className="modal__body">
                            <input
                                className="form__input"
                                type="email"
                                placeholder="Email"
                                required
                                value={user.email}
                                name="email"
                                onChange={handleChange}
                            />
                            <input
                                className="form__input"
                                type="password"
                                placeholder="Password"
                                required
                                value={user.password}
                                name="password"
                                onChange={handleChange}
                            />
                            <Button text="Register"></Button>
                        </div>
                        <div className="modal__footer">
                            <p>
                                Already have account?{' '}
                                <Link to="/login">Login</Link>
                            </p>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Register
