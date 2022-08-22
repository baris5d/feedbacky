import { Link } from 'react-router-dom';
import './Header.css'
import logo from '../../assets/logo.svg'

const Header = () => {
    return (
        <header className="header">
            <div className="header__content container">
                <div className="logo">
                    <Link to="/">
                        <img src={logo} />
                    </Link>
                </div>
                <div className="header__menu">
                    <ul className="header__menu-list">
                        <li className="header__menu-item">
                            <Link to="/login">Login</Link>
                        </li>
                        <li className="header__menu-item">
                            <Link to="/get-started">Get Started</Link>
                        </li>
                    </ul>
                </div>
            </div>
        </header>
    );
  }
  
  export default Header;
  