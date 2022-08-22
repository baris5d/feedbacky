
import { TypeAnimation } from 'react-type-animation';
import icon from './icon.svg'
import './Showcase.css';

const Showcase = () => {
    return (
        <div className="showcase">
            <div className="showcase__content container">
                <div className="showcase__wrapper">
                    <div className="showcase__item">
                        <div className="showcase__item-header">
                            <div className="showcase__item-close"></div>
                        </div>
                        <div className="showcase__item-content">
                            <div className="showcase__item-input">
                                <TypeAnimation
                                    sequence={[
                                        'Best way to communicate with customers',
                                        2000,
                                        'Great app for feedback, ever.',
                                        3000,
                                        'Good UI and UX',
                                        3000,
                                        'Thanks for this amazing app!',
                                        2000
                                    ]}
                                    wrapper="div"
                                    cursor={true}
                                    repeat={Infinity}
                                />
                            </div>
                            <div className="showcase__item-button">
                                <span></span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="showcase__button">
                    <img src={icon} alt="Feedbacky Toggle Button" width="30" height="22"/>
                </div>
                <div className="showcase__background"></div>
            </div>
        </div>
    )
}

export default Showcase;