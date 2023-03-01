import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import WelcomePage from './pages/WelcomePage';
import SingInPage from './pages/SingInPage';
import SignUpPage from './pages/SignUpPage';
import HomePage from './pages/HomePage';
import StudentAppealListPage from './pages/StudentAppealListPage';

import './App.css';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<WelcomePage />} />
        <Route path="signin" element={<SingInPage />} />
        <Route path="signup" element={<SignUpPage />} />
        <Route path="home" element={<HomePage />} />
        <Route path="student/:studentId/appeals" element={<StudentAppealListPage />} />
      </Routes>
    </BrowserRouter>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
