import React, { useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

import SizedBox from './SizedBox';
import IconButton from './IconButton';

import '../App.css';
import '../Component.css';

import profileicon from '../assets/images/profileicon.png';
import homeicon from '../assets/images/homeicon.png';

const Role = {
  Student: 'Student',
  Teacher: 'Teacher',
  ProgramDirector: 'Program Director'
};

export default function NavBar() {
  const navigate = useNavigate();

  const [fullName, setFullName] = useState('');
  const [role, setRole] = useState(Role.Student);
  const [id, setId] = useState('');

  const onBackToHome = () => {
    navigate('/home');
  };

  const getCurrentUser = useCallback(() => {
    let user = localStorage.getItem('user');

    if (user !== null) {
      user = JSON.parse(user);
      setFullName(`${user.first_name} ${user.last_name}`);
      setId(user.user_id);

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

  useEffect(() => {
    getCurrentUser();
  }, [getCurrentUser]);

  return (
    <div className="nav-container column-container">
      <div className="row-container left">
        <IconButton src={homeicon} onClick={onBackToHome}></IconButton>
      </div>
      <SizedBox height="125px"></SizedBox>
      <img src={profileicon} alt="profileicon" />
      <h3>{fullName}</h3>
      <h3>{role}</h3>
      <h3>{id}</h3>
    </div>
  );
}
