import React, { useEffect, useState, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import NavBar from '../components/NavBar';
import IconButton from '../components/IconButton';
import EditableScoreRow from '../components/EditableScoreRow';

import '../App.css';
import '../Component.css';

import binicon from '../assets/images/binicon.png';

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

  const onSaveScore = (id, score) => {
    console.log(id, score);
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
          <div className="icon-header">
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
                <EditableScoreRow
                  key={evaluation.id}
                  evaluation={evaluation}
                  onSaveScore={onSaveScore}
                  onViewFeedback={onViewFeedback}
                ></EditableScoreRow>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
