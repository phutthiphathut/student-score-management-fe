import React, { useEffect, useState, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

import NavBar from '../components/NavBar';
import IconButton from '../components/IconButton';
import EditableScoreRow from '../components/EditableScoreRow';

import '../App.css';
import '../Component.css';

import binicon from '../assets/images/binicon.png';

export default function TeacherCourseStudentDetailPage() {
  const navigate = useNavigate();

  const { courseId, section, studentId } = useParams();

  const [courseName, setCourseName] = useState('');
  const [studentCode, setStudentCode] = useState('');
  const [studentName, setStudentName] = useState('');
  const [evaluations, setEvaluations] = useState([]);

  const validationParam = useCallback(() => {
    if (isNaN(section) || section <= 0) {
      navigate('/home');
    }
    if (isNaN(studentId) || studentId <= 0) {
      navigate(`/teacher/courses/${courseId}/sections/${section}`);
    }
  }, [courseId, section, studentId, navigate]);

  const fetchEvaluations = useCallback(() => {
    axios
      .get(
        process.env.REACT_APP_API_URL +
          `/api/teacher/${courseId}/sections/${section}/students/${studentId}`
      )
      .then((response) => {
        if (response.data != null && response.data.length) {
          setCourseName(response.data[0].course_name);
          setStudentCode(response.data[0].user_id);
          setStudentName(
            `${response.data[0].first_name} ${response.data[0].last_name}`
          );
          setEvaluations(response.data);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, [courseId, section, studentId]);

  useEffect(() => {
    validationParam();
    fetchEvaluations();
  }, [fetchEvaluations, validationParam]);

  const onDeleteStudent = () => {
    axios
      .post(
        process.env.REACT_APP_API_URL +
          `/api/teacher/${courseId}/sections/${section}/students/remove`,
        {
          student_id: studentId
        }
      )
      .then((response) => {
        navigate(`/teacher/courses/${courseId}/sections/${section}`);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const onSaveScore = useCallback(
    (evaluationId, score) => {
      axios
        .put(
          process.env.REACT_APP_API_URL +
            `/api/teacher/evaluations/${evaluationId}/students/${studentId}/score`,
          { score: score }
        )
        .then((response) => {
          if (response.data != null) {
            fetchEvaluations();
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    [studentId, fetchEvaluations]
  );

  const onViewFeedback = (evaluationId) => {
    navigate(
      `/teacher/courses/${courseId}/sections/${section}/evaluations/${evaluationId}/students/${studentCode}/feedback`
    );
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
                  key={evaluation.evaluation_id}
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
