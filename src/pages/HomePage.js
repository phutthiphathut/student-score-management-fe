import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import NavBar from '../components/NavBar';
import CourseContainer from '../components/CourseContainer';
import IconButton from '../components/IconButton';

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

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = () => {
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
  };

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
    navigate('/student/appeals');
  };

  const onClickCourse = (id) => {
    console.log(id);
  };

  return (
    <div className="app-container row-container">
      <NavBar></NavBar>
      <div className="content-container column-container">
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
