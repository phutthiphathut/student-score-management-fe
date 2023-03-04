import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import NavBar from '../components/NavBar';
import DetailBox from '../components/DetailBox';

import '../App.css';
import '../Component.css';

export default function StudentAppealDetailPage() {
  const navigate = useNavigate();

  const { appealId } = useParams();

  const [appeal, setAppeal] = useState({});

  useEffect(() => {
    validationParam();
    fetchAppeal();
  }, []);

  const validationParam = () => {
    if (isNaN(appealId)) navigate("/student/appeals");
  };

  const fetchAppeal = () => {
    const data = {
      id: appealId,
      evaluation: 'Quiz',
      detail:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
      score: 7,
      fullScore: 10
    };

    setAppeal(data);
  };

  return (
    <div className="app-container row-container">
      <NavBar></NavBar>
      <div className="content-container column-container">
        <div className="body-header-container row-container">
          <h1>Appeal Remark</h1>
        </div>
        <DetailBox
          title={appeal.evaluation}
          detail={appeal.detail}
          score={`${appeal.score}/${appeal.fullScore}`}
        ></DetailBox>
      </div>
    </div>
  );
}
