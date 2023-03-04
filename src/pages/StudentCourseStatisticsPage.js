import React, { useEffect, useState, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import NavBar from '../components/NavBar';
import VerticleBarGraph from '../components/VerticleBarGraph';

import '../App.css';
import '../Component.css';

export default function StudentCourseStatisticsPage() {
  const navigate = useNavigate();

  const { courseId } = useParams();

  const [evaluations, setEvaluations] = useState([]);
  const [statistics, setStatistics] = useState({});

  const fetchEvaluations = useCallback(() => {
    let list = [];

    for (let index = 0; index < 5; index++) {
      list.push({
        id: index + 1,
        title: 'Quiz',
        value: Math.random() * 100
      });
    }

    setEvaluations(list);
  }, []);

  const fetchStatistics = useCallback(() => {
    const data = {
      id: courseId,
      average: 68.4,
      total: 79.5,
      percentile: 75.15
    };

    setStatistics(data);
  }, [courseId]);

  const validationParam = useCallback(() => {
    if (isNaN(courseId)) navigate('home');
  }, [courseId, navigate]);

  useEffect(() => {
    validationParam();
    fetchEvaluations();
    fetchStatistics();
  }, [fetchEvaluations, fetchStatistics, validationParam]);

  return (
    <div className="app-container row-container">
      <NavBar></NavBar>
      <div className="content-container column-container">
        <div className="body-header-container row-container">
          <h1>Your Statistics</h1>
        </div>
        <VerticleBarGraph dataset={evaluations}></VerticleBarGraph>
        <div className="stat-details column-container">
          <div className="row-container">
            <div className="stat-text">Average Score</div>
            <div className="stat-text">:</div>
            <div className="stat-text">{statistics.average}</div>
          </div>
          <div className="row-container">
            <div className="stat-text">Your Total Score</div>
            <div className="stat-text">:</div>
            <div className="stat-text">{statistics.total}</div>
          </div>
          <div className="row-container">
            <div className="stat-text">Percentile</div>
            <div className="stat-text">:</div>
            <div className="stat-text">{statistics.total}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
