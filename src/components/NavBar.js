import React, { useState } from 'react';

import SizedBox from './SizedBox';

import '../App.css';
import '../Component.css';

import profileicon from '../assets/images/profileicon.png';

export default function NavBar() {
  const [fullName, setFullName] = useState('John Wick');
  const [position, setPosition] = useState('Student');
  const [id, setId] = useState('16410505');

  return (
    <div className="nav-container column-container">
      <SizedBox height="125px"></SizedBox>
      <img src={profileicon} alt="profileicon" />
      <h3>{fullName}</h3>
      <h3>{position}</h3>
      <h3>{id}</h3>
    </div>
  );
}
