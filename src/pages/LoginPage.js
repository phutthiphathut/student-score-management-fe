import { useNavigate } from 'react-router-dom';

import NormalButton from '../components/NormalButton';
import InputBox from '../components/InputBox';

import '../Component.css';
import '../App.css';

import abaclogo from '../assets/images/Logoabac.png';

export default function WelcomePage() {
  const navigate = useNavigate();

  const onSignUp = () => {
    navigate('/signup');
  };

  const onSignIn = () => {
    navigate('/home');
  };

  return (
    <div className="body-container">
      <div className="base-component body-box column-container">
        <img src={abaclogo} alt="abac logo" />
        <InputBox label="User ID" placeholder="User ID"></InputBox>
        <InputBox label="Password" placeholder="Password"></InputBox>
        <div>
          <NormalButton label="Sign Up" onClick={onSignUp}></NormalButton>
          <NormalButton label="Sign In" onClick={onSignIn}></NormalButton>
        </div>
      </div>
    </div>
  );
}
