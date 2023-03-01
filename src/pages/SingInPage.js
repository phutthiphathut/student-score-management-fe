import { useNavigate } from 'react-router-dom';

import NormalButton from '../components/NormalButton';
import InputBox from '../components/InputBox';

import '../App.css';
import '../Component.css';

import abaclogo from '../assets/images/abac_logo.jpg';

export default function SignInPage() {
  const navigate = useNavigate();

  const onSignUp = () => {
    navigate('/signup');
  };

  const onSignIn = () => {
    navigate('/home');
  };

  return (
    <div className="app-container center column-container">
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
