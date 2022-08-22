import { Link } from 'react-router-dom';
import './Header.css'

const Header = () => {
    return (
        <header className="header">
            <div className="header__content container">
                <div className="logo">
                    <Link to="/">
                        <span>Logo</span>
                    </Link>
                </div>
                <div className="header__menu">
                    <ul className="header__menu-list">
                        <li className="header__menu-item">
                            <Link to="/sign-in">Sign in</Link>
                        </li>
                        <li className="header__menu-item">
                            <Link to="/sign-up">Sign up</Link>
                        </li>
                    </ul>
                </div>
            </div>
        </header>
    );
  }
  
  export default Header;
  