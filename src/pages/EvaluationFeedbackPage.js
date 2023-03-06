import React, { useEffect, useState, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

import NavBar from '../components/NavBar';
import DetailBox from '../components/DetailBox';

import '../App.css';
import '../Component.css';

export default function EvaluationFeedbackPage() {
  const navigate = useNavigate();

  const { courseId, section, evaluationId } = useParams();

  const [user, setUser] = useState({});
  const [evaluation, setEvaluation] = useState({});

  const validationParam = useCallback(() => {
    if (isNaN(section) || section <= 0) {
      navigate('/home');
    }
    if (isNaN(evaluationId) || evaluationId <= 0) {
      navigate(`/student/courses/${courseId}/sections/${section}`);
    }
  }, [courseId, section, evaluationId, navigate]);

  const getCurrentUser = useCallback(() => {
    let user = localStorage.getItem('user');

    if (user !== null) {
      user = JSON.parse(user);
      setUser(user);
    }
  }, []);

  const fetchFeedback = useCallback(() => {
    if (user.user_id) {
      axios
        .get(
          process.env.REACT_APP_API_URL +
            `/api/student/evaluations/${evaluationId}/students/${user.user_id}/feedback`
        )
        .then((response) => {
          if (response.data != null) {
            setEvaluation(response.data);
          }
        })
        .catch((error) => {
          console.log(error);
          navigate(`/student/courses/${courseId}/sections/${section}`);
        });
    }
  }, [courseId, section, evaluationId, user.user_id, navigate]);

  useEffect(() => {
    validationParam();
    getCurrentUser();
    fetchFeedback();
  }, [getCurrentUser, fetchFeedback, validationParam]);

  return (
    <div className="app-container row-container">
      <NavBar></NavBar>
      <div className="content-container column-container">
        <div className="body-header-container row-container">
          <h1>Feedback</h1>
        </div>
        <DetailBox
          title={evaluation.evaluation_title}
          detail={evaluation.feedback || 'No feedback'}
          score={`${evaluation.eval_received_score}/${evaluation.full_score}`}
        ></DetailBox>
      </div>
    </div>
  );
}
