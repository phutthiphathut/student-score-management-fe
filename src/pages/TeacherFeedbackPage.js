import React, { useEffect, useState, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import NavBar from '../components/NavBar';
import ReportBox from '../components/ReportBox';

import '../App.css';
import '../Component.css';

export default function TeacherFeedbackPage() {
  const navigate = useNavigate();

  const { courseId, evaluationId } = useParams();

  const [feedback, setFeedback] = useState();

  const validationParam = useCallback(() => {
    if (isNaN(courseId) || courseId <= 0) {
      navigate('/home');
    }
    if (isNaN(evaluationId) || evaluationId <= 0) {
      navigate(`/teacher/courses/${courseId}`);
    }
  }, [courseId, evaluationId, navigate]);

  const fetchFeedback = useCallback(() => {
    const data = {
      id: 1,
      evaluation: 'Quiz',
      detail:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
    };

    setFeedback(data.detail);
  }, []);

  const sendFeedback = () => {
    alert(feedback);
    navigate(`/teacher/courses/${courseId}`);
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
          <h1>Feedback: {evaluationId}</h1>
        </div>
        <ReportBox
          title="Content"
          value={feedback}
          onValueChange={onChangeHandler}
          onSubmit={sendFeedback}
        ></ReportBox>
      </div>
    </div>
  );
}
