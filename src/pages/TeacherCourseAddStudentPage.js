import React, { useEffect, useState, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import NavBar from '../components/NavBar';
import IconButton from '../components/IconButton';

import '../App.css';
import '../Component.css';

import addicon from '../assets/images/addicon.png';

export default function TeacherCourseAddStudentPage() {
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
        name: 'Alexandria Trival'
      });
    }

    setStudents(list);
  }, []);

  useEffect(() => {
    validationParam();
    fetchStudents();
  }, [fetchStudents, validationParam]);

  const onAddStudent = (id) => {
    alert('add student ' + id);
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
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {students.map((student) => (
                <tr key={student.id}>
                  <td>{student.id}</td>
                  <td>{student.name}</td>
                  <td>
                    <div className="action-container row-container">
                      <IconButton
                        src={addicon}
                        onClick={() => onAddStudent(student.id)}
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
