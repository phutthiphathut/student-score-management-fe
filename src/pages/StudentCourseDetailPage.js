import React, { useEffect, useState, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import NavBar from '../components/NavBar';
import IconButton from '../components/IconButton';

import '../App.css';
import '../Component.css';

import graphicon from '../assets/images/graphicon.png';
import commenticon from '../assets/images/commenticon.png';
import exclamationicon from '../assets/images/exclamationmarkicon.png';

export default function StudentCourseDetailPage() {
  const navigate = useNavigate();

  const { courseId } = useParams();

  const [courseName, setCourseName] = useState('Mathematics');
  const [evaluations, setEvaluations] = useState([]);

  const validationParam = useCallback(() => {
    if (isNaN(courseId)) navigate('home');
  }, [courseId, navigate]);

  const fetchEvaluations = useCallback(() => {
    let list = [];

    for (let index = 0; index < 5; index++) {
      list.push({
        id: index + 1,
        name: 'Quiz',
        score: 7,
        fullScore: 10,
        rubric: []
      });
    }

    setEvaluations(list);
  }, []);

  useEffect(() => {
    validationParam();
    fetchEvaluations();
  }, [fetchEvaluations, validationParam]);

  const onViewStatistics = () => {
    navigate(`statistics`);
  };

  const onViewFeedback = (id) => {
    navigate(`evaluation/${id}/feedback`);
  };

  const onCreateAppeal = (id) => {
    navigate(`evaluation/${id}/appeal`);
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
                <tr key={evaluation.id}>
                  <td>{evaluation.name}</td>
                  <td>{evaluation.fullScore}</td>
                  <td>{evaluation.score}</td>
                  <td>
                    <div className="action-container row-container">
                      <IconButton
                        src={commenticon}
                        onClick={() => onViewFeedback(evaluation.id)}
                      ></IconButton>
                      <IconButton
                        src={exclamationicon}
                        onClick={() => onCreateAppeal(evaluation.id)}
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
