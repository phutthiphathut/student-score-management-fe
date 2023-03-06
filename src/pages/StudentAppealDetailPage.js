import React, { useEffect, useState, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

import NavBar from '../components/NavBar';
import DetailBox from '../components/DetailBox';

import '../App.css';
import '../Component.css';

const defaultAppeal = {
  remark: '',
  evaluation_title: '',
  full_score: 0,
  eval_received_score: '00.00'
};

export default function StudentAppealDetailPage() {
  const navigate = useNavigate();

  const { evaluationId } = useParams();

  const [user, setUser] = useState({});
  const [appeal, setAppeal] = useState(defaultAppeal);

  const validationParam = useCallback(() => {
    if (isNaN(evaluationId) || evaluationId <= 0) {
      navigate('/student/appeals');
    }
  }, [evaluationId, navigate]);

  const getCurrentUser = useCallback(() => {
    let user = localStorage.getItem('user');

    if (user !== null) {
      user = JSON.parse(user);
      setUser(user);
    }
  }, []);

  const fetchAppeal = useCallback(() => {
    if (user.user_id) {
      axios
        .get(
          process.env.REACT_APP_API_URL +
            `/api/student/appeals/evaluations/${evaluationId}/students/${user.user_id}`
        )
        .then((response) => {
          if (response.data != null) {
            setAppeal(response.data);
          }
        })
        .catch((error) => {
          console.log(error);
          navigate('/student/appeals');
        });
    }
  }, [evaluationId, user.user_id, navigate]);

  useEffect(() => {
    validationParam();
    getCurrentUser();
    fetchAppeal();
  }, [getCurrentUser, fetchAppeal, validationParam]);

  return (
    <div className="app-container row-container">
      <NavBar></NavBar>
      <div className="content-container column-container">
        <div className="body-header-container row-container">
          <h1>Appeal Remark</h1>
        </div>
        <DetailBox
          title={appeal.evaluation_title}
          detail={appeal.remark}
          score={`${appeal.eval_received_score}/${appeal.full_score}`}
        ></DetailBox>
      </div>
    </div>
  );
}
