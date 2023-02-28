import { useNavigate } from 'react-router-dom';

import NormalButton from '../components/NormalButton';

import '../Component.css';
import '../App.css';

import abaclogo from '../assets/images/Logoabac.png';

export default function WelcomePage() {
  const navigate = useNavigate();

  const onGetStart = () => {
    navigate('/signin');
  };

  return (
    <div className="body-container column-container">
      <img className="img-welcome-logo" src={abaclogo} alt="abac logo" />
      <NormalButton label="Get Start!" onClick={onGetStart}></NormalButton>
    </div>
  );
}
