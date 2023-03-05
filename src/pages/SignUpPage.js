import React, { useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

import NormalButton from '../components/NormalButton';
import InputBox from '../components/InputBox';

import '../Component.css';
import '../App.css';

const defaultForm = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  confirmPassword: ''
};

const defaultError = {
  error: false,
  message: ''
};

export default function SignUpPage() {
  const navigate = useNavigate();

  const [form, setForm] = useState(defaultForm);
  const [firstNameError, setFirstNameError] = useState(defaultError);
  const [lastNameError, setLastNameError] = useState(defaultError);
  const [emailError, setEmailError] = useState(defaultError);
  const [passwordError, setPasswordError] = useState(defaultError);
  const [confirmPasswordError, setConfirmPasswordError] =
    useState(defaultError);

  const onFirstNameChangeHandler = (value) => {
    setFirstNameError(defaultError);
    setForm({
      ...form,
      firstName: value
    });
  };

  const onLastNameChangeHandler = (value) => {
    setLastNameError(defaultError);
    setForm({
      ...form,
      lastName: value
    });
  };

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

  const onConfirmPasswordChangeHandler = (value) => {
    setConfirmPasswordError(defaultError);
    setForm({
      ...form,
      confirmPassword: value
    });
  };

  const onSignUp = () => {
    let valid = true;
    if (form.firstName.trim() === '') {
      valid = false;
      setFirstNameError({
        error: true,
        message: 'Invalid first name'
      });
    }
    if (form.lastName.trim() === '') {
      valid = false;
      setLastNameError({
        error: true,
        message: 'Invalid last name'
      });
    }
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
    if (form.confirmPassword.trim() !== form.password.trim()) {
      valid = false;
      setConfirmPasswordError({
        error: true,
        message: 'Password not matched'
      });
    }
    if (valid) {
      navigate('/signin');
    }
  };

  return (
    <div className="app-container center column-container">
      <div className="base-component body-box column-container">
        <h2>Sign Up</h2>
        <div className="row-container">
          <div className="input-half-container">
            <InputBox
              label="First name"
              value={form.firstName}
              placeholder="First name"
              onValueChange={onFirstNameChangeHandler}
              error={firstNameError.error}
              errMessage={firstNameError.message}
            ></InputBox>
          </div>
          <div className="input-half-container">
            <InputBox
              label="Last name"
              value={form.lastName}
              placeholder="Last name"
              onValueChange={onLastNameChangeHandler}
              error={lastNameError.error}
              errMessage={lastNameError.message}
            ></InputBox>
          </div>
        </div>

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
        <InputBox
          label="Re-enter Password"
          value={form.confirmPassword}
          type="password"
          placeholder="Re-enter Password"
          onValueChange={onConfirmPasswordChangeHandler}
          error={confirmPasswordError.error}
          errMessage={confirmPasswordError.message}
        ></InputBox>

        <NormalButton label="Sign Up" onClick={onSignUp}></NormalButton>
      </div>
    </div>
  );
}
