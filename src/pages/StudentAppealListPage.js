import { useParams } from 'react-router-dom';

import NavBar from '../components/NavBar';

import '../App.css';
import '../Component.css';

export default function StudentAppealListPage() {
  const { studentId } = useParams();

  return (
    <div className="app-container row-container">
      <NavBar></NavBar>
      <div className="content-container column-container">
        <div className="body-header-container row-container">
          <h1>Appeal Result {studentId}</h1>
        </div>
      </div>
    </div>
  );
}
