import Header from '../../common/components/header/Header';
import Button from '../../common/components/button/Button';
import Slogan from './components/slogan/Slogan';
import Showcase from './components/showcase/Showcase';
import './Landing.css';

function Landing() {
  return (
    <div className="page landing">
      <div className="container">
        <Slogan />
        <div style={{textAlign: 'center'}}>
          <Button text="Get started" url="/getting-started" />
        </div>
        <Showcase />
      </div>
    </div>
  );
}

export default Landing;
