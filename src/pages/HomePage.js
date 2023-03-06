import React, { useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

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

  const [user, setUser] = useState({});
  const [role, setRole] = useState(Role.Student);
  const [courses, setCourses] = useState([]);

  const getCurrentUserRole = useCallback(() => {
    let user = localStorage.getItem('user');

    if (user !== null) {
      user = JSON.parse(user);
      setUser(user);

      switch (user.role) {
        case 'student':
          return setRole(Role.Student);
        case 'teacher':
          return setRole(Role.Teacher);
        case 'program_director':
          return setRole(Role.ProgramDirector);
        default:
          return setRole(Role.Student);
      }
    }
  }, []);

  const fetchCourses = useCallback(() => {
    switch (role) {
      case Role.Student:
        break;
      case Role.Teacher:
        axios
          .get(
            process.env.REACT_APP_API_URL +
              `/api/teacher/${user.user_id}/courses`
          )
          .then((response) => {
            if (response.data != null && response.data.length) {
              setCourses(response.data);
            }
          })
          .catch((error) => {
            console.log(error);
          });
        break;
      case Role.ProgramDirector:
        axios
          .get(process.env.REACT_APP_API_URL + '/api/pd/courses')
          .then((response) => {
            if (response.data != null && response.data.length) {
              setCourses(response.data);
            }
          })
          .catch((error) => {
            console.log(error);
          });
        break;
      default:
        setCourses([]);
        break;
    }
  }, [role, user.user_id]);

  useEffect(() => {
    getCurrentUserRole();
    fetchCourses();
  }, [getCurrentUserRole, fetchCourses]);

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

  const onClickTeacherCourse = (courseId, section) => {
    navigate(`/teacher/courses/${courseId}/sections/${section}`);
  };

  const onClickProgramDirectorCourse = (courseId, section) => {
    navigate(
      `/programdirector/courses/${courseId}/sections/${section}/statistics`
    );
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
                    key={`${course.course_id}${course.section}`}
                    code={`${course.course_id} (SEC ${course.section})`}
                    name={course.course_name}
                    time={`${course.day_of_week.substring(
                      0,
                      3
                    )}: ${course.start_time.substring(
                      0,
                      5
                    )} - ${course.end_time.substring(0, 5)}`}
                    onClick={() =>
                      onClickTeacherCourse(course.course_id, course.section)
                    }
                  ></CourseContainer>
                );
              case Role.ProgramDirector:
                return (
                  <CourseContainer
                    key={`${course.course_id}${course.section}`}
                    code={`${course.course_id} (SEC ${course.section})`}
                    name={course.course_name}
                    onClick={() =>
                      onClickProgramDirectorCourse(
                        course.course_id,
                        course.section
                      )
                    }
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
