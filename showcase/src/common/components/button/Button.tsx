import { Link } from 'react-router-dom';
import './Button.css';

interface ButtonProps {
    text: string
    className?: string
    disabled?: boolean
    onClick?: () => void
    url?: string
}

const Button = (props: ButtonProps) => {
    return (
        props.url ? 
            <Link to={props.url} className={`button ${props.className}`}>{props.text}</Link> :
            <button className={`button ${props.className}`} onClick={props.onClick} disabled={props.disabled}>
                {props.text}
            </button>
    );
}

export default Button;