import React, { useEffect, useState, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

import NavBar from '../components/NavBar';
import ReportBox from '../components/ReportBox';

import '../App.css';
import '../Component.css';

const defaultAppeal = {
  reason: ''
};

export default function EvaluationAppealPage() {
  const navigate = useNavigate();

  const { courseId, section, evaluationId } = useParams();

  const [user, setUser] = useState({});
  const [evaluationName, setEvaluationName] = useState('');
  const [appeal, setAppeal] = useState(defaultAppeal);
  const [isNewAppeal, setIsNewAppeal] = useState(true);

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

  const fetchEvaluation = useCallback(() => {
    axios
      .get(
        process.env.REACT_APP_API_URL +
          `/api/student/evaluations/${evaluationId}`
      )
      .then((response) => {
        if (response.data != null) {
          setEvaluationName(response.data.evaluation_title);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, [evaluationId]);

  const fetchAppeal = useCallback(() => {
    if (user.user_id) {
      axios
        .get(
          process.env.REACT_APP_API_URL +
            `/api/student/evaluations/${evaluationId}/students/${user.user_id}/appeal`
        )
        .then((response) => {
          if (response.data != null) {
            setAppeal(response.data);
            setIsNewAppeal(false);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [evaluationId, user.user_id]);

  const onSubmitAppeal = () => {
    if (user.user_id) {
      if (isNewAppeal) {
        axios
          .post(
            process.env.REACT_APP_API_URL +
              `/api/student/evaluations/${evaluationId}/students/${user.user_id}/appeal`,
            { reason: appeal.reason }
          )
          .then((response) => {
            if (response.data != null) {
              navigate(`/student/courses/${courseId}/sections/${section}`);
            }
          })
          .catch((error) => {
            console.log(error);
          });
      } else {
        axios
          .put(
            process.env.REACT_APP_API_URL +
              `/api/student/evaluations/${evaluationId}/students/${user.user_id}/appeal`,
            { reason: appeal.reason }
          )
          .then((response) => {
            if (response.data != null) {
              navigate(`/student/courses/${courseId}/sections/${section}`);
            }
          })
          .catch((error) => {
            console.log(error);
          });
      }
    }
  };

  useEffect(() => {
    validationParam();
    getCurrentUser();
    fetchEvaluation();
    fetchAppeal();
  }, [getCurrentUser, fetchEvaluation, fetchAppeal, validationParam]);

  const onChangeHandler = (value) => {
    setAppeal({
      ...appeal,
      reason: value
    });
  };

  return (
    <div className="app-container row-container">
      <NavBar></NavBar>
      <div className="content-container column-container">
        <div className="body-header-container row-container">
          <h1>Score Appeal: {evaluationName}</h1>
        </div>
        <ReportBox
          title="Reason"
          value={appeal.reason}
          onValueChange={onChangeHandler}
          onSubmit={onSubmitAppeal}
        ></ReportBox>
      </div>
    </div>
  );
}
