import React, { useEffect, useState, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import NavBar from '../components/NavBar';
import DetailButtonBox from '../components/DetailButtonBox';

import '../App.css';
import '../Component.css';

export default function ProgramDirectorAppealDetailPage() {
  const navigate = useNavigate();

  const { appealId } = useParams();

  const [courseCode, setCourseCode] = useState('CSX2007');
  const [courseName, setCourseName] = useState('Mathematics');
  const [appeal, setAppeal] = useState({});

  const validationParam = useCallback(() => {
    if (isNaN(appealId) || appealId <= 0) {
      navigate('/programdirector/appeals');
    }
  }, [appealId, navigate]);

  const fetchAppeal = useCallback(() => {
    const data = {
      id: appealId,
      studentId: 1000000 + appealId,
      evaluation: 'Quiz',
      detail:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
      score: 7,
      fullScore: 10
    };

    setAppeal(data);
  }, [appealId]);

  useEffect(() => {
    validationParam();
    fetchAppeal();
  }, [fetchAppeal, validationParam]);

  const onApprovedAppeal = () => {
    alert('Appeal approved');
    navigate(`/programdirector/appeals/${appealId}/remark`);
  };

  const onRejectedAppeal = () => {
    alert('Appeal rejected');
    navigate(`/programdirector/appeals/${appealId}/remark`);
  };

  return (
    <div className="app-container row-container">
      <NavBar></NavBar>
      <div className="content-container column-container">
        <div className="body-header-container row-container space-between">
          <h1>Appeal Reason</h1>
          <h1><span className="uppercase">{courseCode}</span> {courseName}</h1>
        </div>
        <DetailButtonBox
          title={appeal.evaluation}
          detail={appeal.detail}
          score={`${appeal.score}/${appeal.fullScore}`}
          code={appeal.studentId}
          onApproved={onApprovedAppeal}
          onRejected={onRejectedAppeal}
        ></DetailButtonBox>
      </div>
    </div>
  );
}
