import React, { useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import NormalButton from '../components/NormalButton';
import InputBox from '../components/InputBox';

import '../App.css';
import '../Component.css';

import abaclogo from '../assets/images/abac_logo.jpg';

const defaultForm = {
  email: '',
  password: ''
};

const defaultError = {
  error: false,
  message: ''
};

export default function SignInPage() {
  const navigate = useNavigate();

  const [form, setForm] = useState(defaultForm);
  const [emailError, setEmailError] = useState(defaultError);
  const [passwordError, setPasswordError] = useState(defaultError);

  const onEmailChangeHandler = (value) => {
    setEmailError(defaultError);
    setForm({
      ...form,
      email: value
    });
  };

  const onPasswordChangeHandler = (value) => {
    setPasswordError(defaultError);
    setForm({
      ...form,
      password: value
    });
  };

  const onSignUp = () => {
    navigate('/signup');
  };

  const onSignIn = () => {
    let valid = true;
    if (form.email.toLowerCase().trim() === '') {
      valid = false;
      setEmailError({
        error: true,
        message: 'Invalid email'
      });
    }
    if (form.password.trim() === '') {
      valid = false;
      setPasswordError({
        error: true,
        message: 'Invalid password'
      });
    }
    if (valid) {
      axios
        .post(process.env.REACT_APP_API_URL + '/api/users/signin', {
          email_address: form.email,
          password: form.password
        })
        .then((response) => {
          localStorage.setItem('user', JSON.stringify(response.data));
          navigate('/home');
        })
        .catch((error) => {
          setEmailError({
            error: true,
            message: 'Invalid email'
          });
          setPasswordError({
            error: true,
            message: 'Invalid password'
          });
        });
    }
  };

  return (
    <div className="app-container center column-container">
      <div className="base-component body-box column-container">
        <img src={abaclogo} alt="abac logo" />
        <InputBox
          label="Email"
          value={form.email}
          placeholder="Email"
          onValueChange={onEmailChangeHandler}
          error={emailError.error}
          errMessage={emailError.message}
        ></InputBox>
        <InputBox
          label="Password"
          value={form.password}
          type="password"
          placeholder="Password"
          onValueChange={onPasswordChangeHandler}
          error={passwordError.error}
          errMessage={passwordError.message}
        ></InputBox>
        <div>
          <NormalButton label="Sign Up" onClick={onSignUp}></NormalButton>
          <NormalButton label="Sign In" onClick={onSignIn}></NormalButton>
        </div>
      </div>
    </div>
  );
}
