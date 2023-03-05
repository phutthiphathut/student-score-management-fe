import React, { useEffect, useState, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

import NavBar from '../components/NavBar';
import DetailButtonBox from '../components/DetailButtonBox';

import '../App.css';
import '../Component.css';

const Status = {
  Pending: 'Pending',
  Accepted: 'Accepted',
  Denied: 'Denied'
};

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

export default function ProgramDirectorAppealDetailPage() {
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

  useEffect(() => {
    validationParam();
    fetchAppeal();
  }, [fetchAppeal, validationParam]);

  const onAcceptedAppeal = () => {
    let user = localStorage.getItem('user');

    if (user !== null) {
      user = JSON.parse(user);

      axios
        .put(
          process.env.REACT_APP_API_URL +
            `/api/appeals/student/${studentId}/evaluation/${evaluationId}/status`,
          { pd_id: user.user_id, status: Status.Accepted }
        )
        .then((response) => {
          if (response.data != null) {
            navigate(
              `/programdirector/appeals/student/${studentId}/evaluation/${evaluationId}/remark`
            );
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  const onDeniedAppeal = () => {
    let user = localStorage.getItem('user');

    if (user !== null) {
      user = JSON.parse(user);

      axios
        .put(
          process.env.REACT_APP_API_URL +
            `/api/appeals/student/${studentId}/evaluation/${evaluationId}/status`,
          { pd_id: user.user_id, status: Status.Denied }
        )
        .then((response) => {
          if (response.data != null) {
            navigate(
              `/programdirector/appeals/student/${studentId}/evaluation/${evaluationId}/remark`
            );
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  return (
    <div className="app-container row-container">
      <NavBar></NavBar>
      <div className="content-container column-container">
        <div className="body-header-container row-container space-between">
          <h1>Appeal Reason</h1>
          <h1>
            <span className="uppercase">{appeal.course_id}</span>{' '}
            {appeal.course_name}
          </h1>
        </div>
        <DetailButtonBox
          title={appeal.evaluation_title}
          detail={appeal.reason}
          score={`${appeal.eval_received_score}/${appeal.full_score}`}
          code={appeal.student_id}
          onAccepted={onAcceptedAppeal}
          onDenied={onDeniedAppeal}
        ></DetailButtonBox>
      </div>
    </div>
  );
}
