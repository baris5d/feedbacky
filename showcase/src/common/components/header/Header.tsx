import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import './Header.css'
import logo from '../../assets/logo.svg'
import SessionService from '../../../services/session.service'
import AuthService from '../../../services/auth.service'

const Header = () => {
    const [user, setUser] = useState({})

    useEffect(() => {
        setUser((_) => SessionService.getUser())
    }, [])

    return (
        <header className="header">
            <div className="header__content container">
                <div className="logo">
                    <Link to="/">
                        <img src={logo} alt="Feedbacky Logo" />
                    </Link>
                </div>
                <div className="header__menu">
                    <ul className="header__menu-list">
                        {user ? (
                            <>
                                <li className="header__menu-item">
                                    <Link to="/applications">
                                        My Applications
                                    </Link>
                                </li>
                                <li className="header__menu-item">
                                    <Link
                                        to={''}
                                        onClick={() => {
                                            AuthService.logout().finally(() => {
                                                SessionService.removeSession()
                                                window.location.href = '/'
                                            })
                                        }}
                                    >
                                        Logout
                                    </Link>
                                </li>
                            </>
                        ) : (
                            <li className="header__menu-item">
                                <Link to="/login">Login</Link>
                            </li>
                        )}
                        <li className="header__menu-item">
                            <Link to="/getting-started">Get Started</Link>
                        </li>
                    </ul>
                </div>
            </div>
        </header>
    )
}

export default Header
