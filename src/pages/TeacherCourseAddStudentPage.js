import React, { useEffect, useState, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

import NavBar from '../components/NavBar';
import IconButton from '../components/IconButton';

import '../App.css';
import '../Component.css';

import addicon from '../assets/images/addicon.png';

export default function TeacherCourseAddStudentPage() {
  const navigate = useNavigate();

  const { courseId, section } = useParams();

  const [courseName, setCourseName] = useState('');
  const [students, setStudents] = useState([]);

  const validationParam = useCallback(() => {
    if (isNaN(section) || section <= 0) {
      navigate('/home');
    }
  }, [section, navigate]);

  const fetchStudents = useCallback(() => {
    axios
      .get(
        process.env.REACT_APP_API_URL +
          `/api/teacher/${courseId}/sections/${section}/unregistered`
      )
      .then((response) => {
        if (response.data != null && response.data.length) {
          setCourseName(response.data[0].course_name);
          setStudents(response.data);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, [courseId, section]);

  useEffect(() => {
    validationParam();
    fetchStudents();
  }, [fetchStudents, validationParam]);

  const onAddStudent = (student_id) => {
    axios
      .post(
        process.env.REACT_APP_API_URL +
          `/api/teacher/${courseId}/sections/${section}/students/add`,
        {
          student_id: student_id
        }
      )
      .then((response) => {
        const list = students.filter(
          (student) => student.user_id !== student_id
        );
        setStudents(list);
      })
      .catch((error) => {
        console.log(error);
      });
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
                <tr key={student.user_id}>
                  <td>{student.user_id}</td>
                  <td>{`${student.first_name} ${student.last_name}`}</td>
                  <td>
                    <div className="action-container row-container">
                      <IconButton
                        src={addicon}
                        onClick={() => onAddStudent(student.user_id)}
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
