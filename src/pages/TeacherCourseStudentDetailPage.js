import React, { useEffect, useState, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import NavBar from '../components/NavBar';
import IconButton from '../components/IconButton';

import '../App.css';
import '../Component.css';

import binicon from '../assets/images/binicon.png';
import commenticon from '../assets/images/commenticon.png';
import editicon from '../assets/images/editicon.png';
import sendicon from '../assets/images/sendicon.png';

export default function TeacherCourseStudentDetailPage() {
  const navigate = useNavigate();

  const { courseId, studentId } = useParams();

  const [courseName, setCourseName] = useState('Mathematics');
  const [studentCode, setStudentCode] = useState('10100001');
  const [studentName, setStudentName] = useState('Alexandria Trival');
  const [evaluations, setEvaluations] = useState([]);

  const validationParam = useCallback(() => {
    if (isNaN(courseId) || courseId <= 0) {
      navigate('/home');
    }
    if (isNaN(studentId) || studentId <= 0) {
      navigate(`/teacher/courses/${courseId}`);
    }
  }, [courseId, studentId, navigate]);

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

  const onDeleteStudent = () => {
    alert('Student deleted');
  };

  const onViewFeedback = (id) => {
    navigate(`/teacher/courses/${courseId}/evaluation/${id}/feedback`);
  };

  return (
    <div className="app-container row-container">
      <NavBar></NavBar>
      <div className="content-container column-container">
        <div className="body-header-container row-container">
          <h1 className="uppercase">{courseName}</h1>
          <div className="icon-header" >
            <IconButton src={binicon} onClick={onDeleteStudent}></IconButton>
            <h1>
              {studentCode} {studentName}
            </h1>
          </div>
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
                        src={editicon}
                        onClick={() => onViewFeedback(evaluation.id)}
                      ></IconButton>
                      <IconButton
                        src={commenticon}
                        onClick={() => onViewFeedback(evaluation.id)}
                      ></IconButton>
                      {/* <IconButton
                        src={sendicon}
                        onClick={() => onViewFeedback(evaluation.id)}
                      ></IconButton> */}
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
