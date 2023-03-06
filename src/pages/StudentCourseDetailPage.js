import React, { useEffect, useState, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

import NavBar from '../components/NavBar';
import IconButton from '../components/IconButton';

import '../App.css';
import '../Component.css';

import graphicon from '../assets/images/graphicon.png';
import commenticon from '../assets/images/commenticon.png';
import exclamationicon from '../assets/images/exclamationmarkicon.png';

export default function StudentCourseDetailPage() {
  const navigate = useNavigate();

  const { courseId, section } = useParams();

  const [user, setUser] = useState({});
  const [courseName, setCourseName] = useState('');
  const [evaluations, setEvaluations] = useState([]);

  const validationParam = useCallback(() => {
    if (isNaN(section) || section <= 0) {
      navigate('/home');
    }
  }, [section, navigate]);

  const getCurrentUser = useCallback(() => {
    let user = localStorage.getItem('user');

    if (user !== null) {
      user = JSON.parse(user);
      setUser(user);
    }
  }, []);

  const fetchEvaluations = useCallback(() => {
    if (user.user_id) {
      axios
        .get(
          process.env.REACT_APP_API_URL +
            `/api/student/${courseId}/sections/${section}/students/${user.user_id}`
        )
        .then((response) => {
          if (response.data != null && response.data.length) {
            setCourseName(response.data[0].course_name);
            setEvaluations(response.data);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [courseId, section, user.user_id]);

  useEffect(() => {
    validationParam();
    getCurrentUser();
    fetchEvaluations();
  }, [getCurrentUser, fetchEvaluations, validationParam]);

  const onViewStatistics = () => {
    navigate(`/student/courses/${courseId}/sections/${section}/statistics`);
  };

  const onViewFeedback = (evaluationId) => {
    navigate(
      `/student/courses/${courseId}/sections/${section}/evaluations/${evaluationId}/feedback`
    );
  };

  const onCreateAppeal = (evaluationId) => {
    navigate(
      `/student/courses/${courseId}/sections/${section}/evaluations/${evaluationId}/appeal`
    );
  };

  return (
    <div className="app-container row-container">
      <NavBar></NavBar>
      <div className="content-container column-container">
        <div className="body-header-container row-container">
          <h1 className="uppercase">{courseName}</h1>
          <IconButton src={graphicon} onClick={onViewStatistics}></IconButton>
        </div>
        <div className="table-container">
          <table id="data-table">
            <thead>
              <tr>
                <th>Items</th>
                <th>Full Score</th>
                <th>Score</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {evaluations.map((evaluation) => (
                <tr key={evaluation.evaluation_id}>
                  <td>{evaluation.evaluation_title}</td>
                  <td>{evaluation.full_score}</td>
                  <td>{evaluation.eval_received_score}</td>
                  <td>
                    <div className="action-container row-container">
                      <IconButton
                        src={commenticon}
                        onClick={() => onViewFeedback(evaluation.evaluation_id)}
                      ></IconButton>
                      <IconButton
                        src={exclamationicon}
                        onClick={() => onCreateAppeal(evaluation.evaluation_id)}
                      ></IconButton>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
