import { BrowserRouter, Routes, Route } from 'react-router-dom';

import WelcomePage from './pages/WelcomePage';
import SingInPage from './pages/SingInPage';
import SignUpPage from './pages/SignUpPage';
import HomePage from './pages/HomePage';
import StudentAppealListPage from './pages/StudentAppealListPage';
import StudentAppealDetailPage from './pages/StudentAppealDetailPage';
import StudentCourseDetailPage from './pages/StudentCourseDetailPage';
import StudentCourseStatisticsPage from './pages/StudentCourseStatisticsPage';
import EvaluationFeedbackPage from './pages/EvaluationFeedbackPage';
import EvaluationAppealPage from './pages/EvaluationAppealPage';
import TeacherCourseDetailPage from './pages/TeacherCourseDetailPage';
import TeacherCourseStudentDetailPage from './pages/TeacherCourseStudentDetailPage';
import TeacherFeedbackPage from './pages/TeacherFeedbackPage';
import ProgramDirectorAppealListPage from './pages/ProgramDirectorAppealListPage';
import ProgramDirectorAppealDetailPage from './pages/ProgramDirectorAppealDetailPage';
import ProgramDirectorAppealRemarkPage from './pages/ProgramDirectorAppealRemarkPage';
import ProgramDirectorCourseStatisticsPage from './pages/ProgramDirectorCourseStatisticsPage';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<WelcomePage />} />
        <Route path="signin" element={<SingInPage />} />
        <Route path="signup" element={<SignUpPage />} />
        <Route path="home" element={<HomePage />} />
        <Route path="student/appeals" element={<StudentAppealListPage />} />
        <Route
          path="student/appeals/:appealId"
          element={<StudentAppealDetailPage />}
        />
        <Route
          path="student/courses/:courseId"
          element={<StudentCourseDetailPage />}
        />
        <Route
          path="student/courses/:courseId/statistics"
          element={<StudentCourseStatisticsPage />}
        />
        <Route
          path="student/courses/:courseId/evaluation/:evaluationId/feedback"
          element={<EvaluationFeedbackPage />}
        />
        <Route
          path="student/courses/:courseId/evaluation/:evaluationId/appeal"
          element={<EvaluationAppealPage />}
        />
        <Route
          path="teacher/courses/:courseId"
          element={<TeacherCourseDetailPage />}
        />
        <Route
          path="teacher/courses/:courseId/students/:studentId"
          element={<TeacherCourseStudentDetailPage />}
        />
        <Route
          path="teacher/courses/:courseId/evaluation/:evaluationId/feedback"
          element={<TeacherFeedbackPage />}
        />
        <Route
          path="programdirector/appeals"
          element={<ProgramDirectorAppealListPage />}
        />
        <Route
          path="programdirector/appeals/:appealId"
          element={<ProgramDirectorAppealDetailPage />}
        />
        <Route
          path="programdirector/appeals/:appealId/remark"
          element={<ProgramDirectorAppealRemarkPage />}
        />
        <Route
          path="programdirector/courses/:courseId/statistics"
          element={<ProgramDirectorCourseStatisticsPage />}
        />
      </Routes>
    </BrowserRouter>
  );
}
