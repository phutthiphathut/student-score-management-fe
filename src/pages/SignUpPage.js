import NormalButton from '../components/NormalButton';
import InputBox from '../components/InputBox';

import '../Component.css';
import '../App.css';

export default function SignUpPage() {
  return (
    <div className="body-container">
      <div className="base-component body-box ">
        <div>
          <InputBox label="User ID" placeholder="User ID"></InputBox>
          <InputBox label="Password" placeholder="Password"></InputBox>
        </div>

        <InputBox label="User ID" placeholder="User ID"></InputBox>
        <InputBox label="Password" placeholder="Password"></InputBox>
        
          <NormalButton label="Sign Up"></NormalButton>

        
      </div>
    </div>
  );
}
