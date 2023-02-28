import { useNavigate } from 'react-router-dom';

import NavBar from '../components/NavBar';

import '../Component.css';
import '../App.css';

export default function WelcomePage() {
  return (
    <div className="body-container row-container left-content">
      <NavBar></NavBar>
      <div className="content-body column-container">
        <div className="body-header-container row-container">
          <h1>Student Courses 1/2022</h1>
        </div>
      </div>
    </div>
  );
}
