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
import TeacherCourseAddStudentPage from './pages/TeacherCourseAddStudentPage';
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
          path="student/appeals/evaluations/:evaluationId"
          element={<StudentAppealDetailPage />}
        />
        <Route
          path="student/courses/:courseId/sections/:section"
          element={<StudentCourseDetailPage />}
        />
        <Route
          path="student/courses/:courseId/sections/:section/statistics"
          element={<StudentCourseStatisticsPage />}
        />
        <Route
          path="student/courses/:courseId/sections/:section/evaluations/:evaluationId/feedback"
          element={<EvaluationFeedbackPage />}
        />
        <Route
          path="student/courses/:courseId/sections/:section/evaluations/:evaluationId/appeal"
          element={<EvaluationAppealPage />}
        />
        <Route
          path="teacher/courses/:courseId/sections/:section"
          element={<TeacherCourseDetailPage />}
        />
        <Route
          path="teacher/courses/:courseId/sections/:section/students/:studentId"
          element={<TeacherCourseStudentDetailPage />}
        />
        <Route
          path="teacher/courses/:courseId/sections/:section/students/add"
          element={<TeacherCourseAddStudentPage />}
        />
        <Route
          path="teacher/courses/:courseId/sections/:section/evaluations/:evaluationId/students/:studentId/feedback"
          element={<TeacherFeedbackPage />}
        />
        <Route
          path="programdirector/appeals"
          element={<ProgramDirectorAppealListPage />}
        />
        <Route
          path="programdirector/appeals/student/:studentId/evaluation/:evaluationId"
          element={<ProgramDirectorAppealDetailPage />}
        />
        <Route
          path="programdirector/appeals/student/:studentId/evaluation/:evaluationId/remark"
          element={<ProgramDirectorAppealRemarkPage />}
        />
        <Route
          path="programdirector/courses/:courseId/sections/:section/statistics"
          element={<ProgramDirectorCourseStatisticsPage />}
        />
      </Routes>
    </BrowserRouter>
  );
}
