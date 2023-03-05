import React, { useEffect, useState, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import NavBar from '../components/NavBar';
import IconButton from '../components/IconButton';

import '../App.css';
import '../Component.css';

import informationicon from '../assets/images/informationicon.png';

export default function TeacherCourseDetailPage() {
  const navigate = useNavigate();

  const { courseId } = useParams();

  const [courseName, setCourseName] = useState('Mathematics');
  const [students, setStudents] = useState([]);

  const validationParam = useCallback(() => {
    if (isNaN(courseId) || courseId <= 0) {
      navigate('/home');
    }
  }, [courseId, navigate]);

  const fetchStudents = useCallback(() => {
    let list = [];

    for (let index = 0; index < 5; index++) {
      list.push({
        id: index + 1,
        name: 'Alexandria Trival',
        score: Math.floor(Math.random() * 10) + 1
      });
    }

    setStudents(list);
  }, []);

  useEffect(() => {
    validationParam();
    fetchStudents();
  }, [fetchStudents, validationParam]);

  const onClickStudent = (id) => {
    navigate(`/teacher/courses/${courseId}/students/${id}`);
  };

  return (
    <div className="app-container row-container">
      <NavBar></NavBar>
      <div className="content-container column-container">
        <div className="body-header-container row-container">
          <h1 className="uppercase">{courseName}</h1>
        </div>
        <div className="table-container">
          <table id="data-table">
            <thead>
              <tr>
                <th>Student ID</th>
                <th>Student Name</th>
                <th>Total Score</th>
              </tr>
            </thead>
            <tbody>
              {students.map((studentScore) => (
                <tr key={studentScore.id}>
                  <td>{studentScore.id}</td>
                  <td>{studentScore.name}</td>
                  <td>
                    <div className="action-container row-container">
                      {studentScore.score}
                      <IconButton
                        src={informationicon}
                        onClick={() => onClickStudent(studentScore.id)}
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
