import React, { useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

import NavBar from '../components/NavBar';
import CourseContainer from '../components/CourseContainer';
import IconButton from '../components/IconButton';
import NormalButton from '../components/NormalButton';

import '../App.css';
import '../Component.css';

import appealicon from '../assets/images/appealicon.png';

const Role = {
  Student: 'Student',
  Teacher: 'Teacher',
  ProgramDirector: 'Program Director'
};

export default function HomePage() {
  const navigate = useNavigate();

  const [role, setRole] = useState(Role.Student);
  const [courses, setCourse] = useState([]);

  const fetchCourses = useCallback(() => {
    let list = [];

    for (let index = 0; index < 5; index++) {
      list.push({
        id: index + 1,
        code: 'SUB101',
        name: 'Mathematics',
        time: '09:00 - 12:00 - M.',
        grade: 'A'
      });
    }

    setCourse(list);
  }, []);

  useEffect(() => {
    fetchCourses();
  }, [fetchCourses]);

  const getTitle = () => {
    switch (role) {
      case Role.Student:
        return 'Student Courses 1/2022';
      case Role.Teacher:
        return 'Teacher Courses 1/2022';
      case Role.ProgramDirector:
        return 'Courses';
      default:
        return 'Student Courses 1/2022';
    }
  };

  const onClickAppeal = () => {
    switch (role) {
      case Role.Student:
        return navigate('/student/appeals');
      case Role.ProgramDirector:
        return navigate('/programdirector/appeals');
      default:
        return navigate('/student/appeals');
    }
  };

  const onClickCourse = (id) => {
    switch (role) {
      case Role.Student:
        return navigate(`/student/courses/${id}`);
      case Role.Teacher:
        return navigate(`/teacher/courses/${id}`);
      case Role.ProgramDirector:
        return navigate(`/programdirector/courses/${id}/statistics`);
      default:
        return navigate(`/student/courses/${id}`);
    }
  };

  return (
    <div className="app-container row-container">
      <NavBar></NavBar>
      <div className="content-container column-container">
        <div className="row-container">
          <NormalButton
            label={Role.Student}
            onClick={() => setRole(Role.Student)}
          ></NormalButton>
          <NormalButton
            label={Role.Teacher}
            onClick={() => setRole(Role.Teacher)}
          ></NormalButton>
          <NormalButton
            label={Role.ProgramDirector}
            onClick={() => setRole(Role.ProgramDirector)}
          ></NormalButton>
        </div>
        <div className="body-header-container row-container">
          <h1>{getTitle()}</h1>
          {(role === Role.Student || role === Role.ProgramDirector) && (
            <IconButton src={appealicon} onClick={onClickAppeal}></IconButton>
          )}
        </div>
        <div className="course-list">
          {courses.map((course) => {
            switch (role) {
              case Role.Student:
                return (
                  <CourseContainer
                    key={course.id}
                    code={course.code}
                    name={course.name}
                    grade={course.grade}
                    onClick={() => onClickCourse(course.id)}
                  ></CourseContainer>
                );
              case Role.Teacher:
                return (
                  <CourseContainer
                    key={course.id}
                    code={course.code}
                    name={course.name}
                    time={course.time}
                    onClick={() => onClickCourse(course.id)}
                  ></CourseContainer>
                );
              case Role.ProgramDirector:
                return (
                  <CourseContainer
                    key={course.id}
                    code={course.code}
                    name={course.name}
                    onClick={() => onClickCourse(course.id)}
                  ></CourseContainer>
                );
              default:
                return (
                  <CourseContainer
                    key={course.id}
                    code={course.code}
                    name={course.name}
                    grade={course.grade}
                    onClick={() => onClickCourse(course.id)}
                  ></CourseContainer>
                );
            }
          })}
        </div>
      </div>
    </div>
  );
}
