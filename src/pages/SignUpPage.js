import { useNavigate } from 'react-router-dom';

import NormalButton from '../components/NormalButton';
import InputBox from '../components/InputBox';

import '../Component.css';
import '../App.css';

export default function SignUpPage() {
  const navigate = useNavigate();

  const onSignUp = () => {
    navigate('/signin');
  };

  return (
    <div className="app-container center column-container">
      <div className="base-component body-box column-container">
        <h2>Sign Up</h2>
        <div className="row-container">
          <div className="input-half-container">
            <InputBox label="First name" placeholder="First name"></InputBox>
          </div>
          <div className="input-half-container">
            <InputBox label="Last name" placeholder="Last name"></InputBox>
          </div>
        </div>

        <InputBox label="Email" placeholder="Email"></InputBox>
        <InputBox label="Password" placeholder="Password"></InputBox>
        <InputBox
          label="Re-enter Password"
          placeholder="Re-enter Password"
        ></InputBox>

        <NormalButton label="Sign Up" onClick={onSignUp}></NormalButton>
      </div>
    </div>
  );
}
