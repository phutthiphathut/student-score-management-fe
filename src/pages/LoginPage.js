import NormalButton from '../components/NormalButton';
import InputBox from '../components/InputBox';

import '../Component.css';
import '../App.css';

import abaclogo from '../assets/images/Logoabac.png';

export default function LoginPage() {
  return (
    <div className="body-container">
      <div className="base-component body-box ">
        <img src={abaclogo} alt="abac logo" />
        <InputBox label="User ID" placeholder="User ID"></InputBox>
        <InputBox label="Password" placeholder="Password"></InputBox>
        <div>
          <NormalButton label="Sign Up"></NormalButton>
          <NormalButton label="Sign In"></NormalButton>
        </div>
      </div>
    </div>
  );
}
