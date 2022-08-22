import Header from '../../common/components/header/Header';
import Button from '../../common/components/button/Button';
import Slogan from './components/slogan/Slogan';
import Showcase from './components/showcase/Showcase';
import './Landing.css';

function Landing() {
  return (
    <div className="page landing">
      <Header />
      <div className="container">
        <Slogan />
        <div style={{textAlign: 'center'}}>
          <Button text="Get started" url="/docs" />
        </div>
        <Showcase />
      </div>
    </div>
  );
}

export default Landing;
