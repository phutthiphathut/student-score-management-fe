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
    if (user.user_id) {
      switch (role) {
        case Role.Student:
          axios
            .get(
              process.env.REACT_APP_API_URL +
                `/api/student/${user.user_id}/courses`
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
    }
  }, [role, user.user_id]);

  useEffect(() => {
    getCurrentUserRole();
    fetchCourses();
  }, [getCurrentUserRole, fetchCourses]);

  const getTitle = () => {
    const year = new Date().getFullYear();
    switch (role) {
      case Role.Student:
        return 'Student Courses 1/' + year;
      case Role.Teacher:
        return 'Teacher Courses 1/' + year;
      case Role.ProgramDirector:
        return 'Courses';
      default:
        return 'Student Courses 1/' + year;
    }
  };

  const calculateGrade = (score) => {
    console.log(score);
    if (score >= 90) {
      return 'A';
    } else if (score >= 85) {
      return 'B+';
    } else if (score >= 80) {
      return 'B';
    } else if (score >= 75) {
      return 'C+';
    } else if (score >= 70) {
      return 'C';
    } else if (score >= 65) {
      return 'D+';
    } else if (score >= 60) {
      return 'D';
    } else if (score > 0) {
      return 'F';
    } else {
      return 'N/A';
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

  const onClickStudentCourse = (courseId, section) => {
    navigate(`/student/courses/${courseId}/sections/${section}`);
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
                    key={`${course.course_id}${course.section}`}
                    code={`${course.course_id} (SEC ${course.section})`}
                    name={course.course_name}
                    grade={calculateGrade(course.total)}
                    onClick={() =>
                      onClickStudentCourse(course.course_id, course.section)
                    }
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
                return <div></div>;
            }
          })}
        </div>
      </div>
    </div>
  );
}
