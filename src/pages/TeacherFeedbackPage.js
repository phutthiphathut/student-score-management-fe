import React, { useEffect, useState, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

import NavBar from '../components/NavBar';
import ReportBox from '../components/ReportBox';

import '../App.css';
import '../Component.css';

export default function TeacherFeedbackPage() {
  const navigate = useNavigate();

  const { courseId, section, evaluationId, studentId } = useParams();

  const [evaluationName, setEvaluationName] = useState('');
  const [feedback, setFeedback] = useState('');

  const validationParam = useCallback(() => {
    if (isNaN(section) || section <= 0) {
      navigate('/home');
    }
    if (isNaN(evaluationId) || evaluationId <= 0) {
      navigate(`/teacher/courses/${courseId}/sections/${section}`);
    }
    if (isNaN(studentId) || studentId <= 0) {
      navigate(`/teacher/courses/${courseId}/sections/${section}`);
    }
  }, [courseId, section, evaluationId, studentId, navigate]);

  const fetchFeedback = useCallback(() => {
    axios
      .get(
        process.env.REACT_APP_API_URL +
          `/api/teacher/evaluations/${evaluationId}/students/${studentId}`
      )
      .then((response) => {
        if (response.data != null) {
          setEvaluationName(response.data.evaluation_title);
          setFeedback(response.data.feedback);
        }
      })
      .catch((error) => {
        console.log(error);
        navigate(
          `/teacher/courses/${courseId}/sections/${section}/students/${studentId}`
        );
      });
  }, [courseId, section, evaluationId, studentId, navigate]);

  const onSubmitFeedback = () => {
    axios
      .put(
        process.env.REACT_APP_API_URL +
          `/api/teacher/evaluations/${evaluationId}/students/${studentId}/feedback`,
        { feedback: feedback }
      )
      .then((response) => {
        if (response.data != null) {
          navigate(
            `/teacher/courses/${courseId}/sections/${section}/students/${studentId}`
          );
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    validationParam();
    fetchFeedback();
  }, [fetchFeedback, validationParam]);

  const onChangeHandler = (value) => {
    setFeedback(value);
  };

  return (
    <div className="app-container row-container">
      <NavBar></NavBar>
      <div className="content-container column-container">
        <div className="body-header-container row-container">
          <h1>Feedback: {evaluationName}</h1>
        </div>
        <ReportBox
          title="Content"
          value={feedback}
          onValueChange={onChangeHandler}
          onSubmit={onSubmitFeedback}
        ></ReportBox>
      </div>
    </div>
  );
}
