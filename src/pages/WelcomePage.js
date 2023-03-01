import { useNavigate } from 'react-router-dom';

import NormalButton from '../components/NormalButton';

import '../App.css';
import '../Component.css';

import abaclogo from '../assets/images/abac_logo.jpg';

export default function WelcomePage() {
  const navigate = useNavigate();

  const onGetStart = () => {
    navigate('/signin');
  };

  return (
    <div className="app-container center column-container">
      <img className="welcome-logo" src={abaclogo} alt="abac logo" />
      <NormalButton label="Get Start!" onClick={onGetStart}></NormalButton>
    </div>
  );
}
