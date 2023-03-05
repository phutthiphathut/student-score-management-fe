import React, { useEffect, useState, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

import NavBar from '../components/NavBar';
import ReportBox from '../components/ReportBox';

import '../App.css';
import '../Component.css';

const defaultAppeal = {
  student_id: 0,
  evaluation_id: 0,
  reason: '',
  remark: '',
  course_id: '',
  course_name: '',
  evaluation_title: '',
  full_score: 0,
  eval_received_score: '00.00'
};

export default function ProgramDirectorAppealRemarkPage() {
  const navigate = useNavigate();

  const { studentId, evaluationId } = useParams();

  const [appeal, setAppeal] = useState(defaultAppeal);

  const validationParam = useCallback(() => {
    if (isNaN(studentId) || studentId <= 0) {
      navigate('/programdirector/appeals');
    }
    if (isNaN(evaluationId) || evaluationId <= 0) {
      navigate('/programdirector/appeals');
    }
  }, [studentId, evaluationId, navigate]);

  const fetchAppeal = useCallback(() => {
    axios
      .get(
        process.env.REACT_APP_API_URL +
          `/api/appeals/student/${studentId}/evaluation/${evaluationId}`
      )
      .then((response) => {
        if (response.data != null) {
          setAppeal(response.data);
        }
      })
      .catch((error) => {
        console.log(error);
        navigate('/programdirector/appeals');
      });
  }, []);

  const onSubmitRemark = () => {
    let user = localStorage.getItem('user');

    if (user !== null) {
      user = JSON.parse(user);

      axios
        .put(
          process.env.REACT_APP_API_URL +
            `/api/appeals/student/${studentId}/evaluation/${evaluationId}/remark`,
          { pd_id: user.user_id, remark: appeal.remark }
        )
        .then((response) => {
          if (response.data != null) {
            navigate(
              `/programdirector/appeals/student/${studentId}/evaluation/${evaluationId}`
            );
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  useEffect(() => {
    validationParam();
    fetchAppeal();
  }, [fetchAppeal, validationParam]);

  const onChangeHandler = (value) => {
    setAppeal({
      ...appeal,
      remark: value
    });
  };

  return (
    <div className="app-container row-container">
      <NavBar></NavBar>
      <div className="content-container column-container">
        <div className="body-header-container row-container">
          <h1>Add Remark/Reason</h1>
        </div>
        <ReportBox
          title="Content"
          value={appeal.remark || ''}
          onValueChange={onChangeHandler}
          onSubmit={onSubmitRemark}
        ></ReportBox>
      </div>
    </div>
  );
}
