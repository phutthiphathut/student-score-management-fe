import React, { useEffect, useState, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

import NavBar from '../components/NavBar';
import VerticleBarGraph from '../components/VerticleBarGraph';

import '../App.css';
import '../Component.css';

const defaultStatistics = {
  sum: '-',
  count: '-',
  max: '-',
  min: '-',
  range: '-',
  average: '-',
  median: '-',
  mode: '-',
  variance: '-',
  stdDeviation: '-'
};

export default function ProgramDirectorCourseStatisticsPage() {
  const navigate = useNavigate();

  const { courseId, section } = useParams();

  const [courseCode, setCourseCode] = useState('');
  const [courseSection, setCourseSection] = useState('');
  const [courseName, setCourseName] = useState('');
  const [students, setStudents] = useState([]);
  const [statistics, setStatistics] = useState(defaultStatistics);

  const validationParam = useCallback(() => {
    if (isNaN(section) || section <= 0) {
      navigate('/home');
    }
  }, [section, navigate]);

  const fetchStudentScores = useCallback(() => {
    axios
      .get(
        process.env.REACT_APP_API_URL +
          `/api/pd/${courseId}/sections/${section}/students/score`
      )
      .then((response) => {
        if (response.data != null && response.data.length) {
          setCourseCode(response.data[0].course_id);
          setCourseSection(response.data[0].section);
          setCourseName(response.data[0].course_name);
          setStudents(response.data);
          calculateStatistics(response.data);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, [courseId, section]);

  const calculateStatistics = (list) => {
    const data = defaultStatistics;

    const values = list.map((student) => Number(student.total));

    if (values.length > 0) {
      const sum = values.reduce((acc, val) => acc + val, 0);
      data.sum = sum.toFixed(2);

      const count = values.length;
      data.count = count;

      const average = sum / count;
      data.average = average.toFixed(2);

      const max = Math.max(...values);
      data.max = max.toFixed(2);

      const min = Math.min(...values);
      data.min = min.toFixed(2);

      const range = max - min;
      data.range = range.toFixed(2);

      const variance =
        values.reduce((acc, val) => acc + Math.pow(val - average, 2), 0) /
        values.length;
      data.variance = variance.toFixed(2);

      const stdDeviation = Math.sqrt(variance).toFixed(2);
      data.stdDeviation = stdDeviation;

      const sortedValues = values.sort();
      const median =
        sortedValues.length % 2 === 0
          ? (sortedValues[sortedValues.length / 2 - 1] +
              sortedValues[sortedValues.length / 2]) /
            2
          : sortedValues[(sortedValues.length - 1) / 2];
      data.median = median.toFixed(2);

      const countMap = {};
      let mode = null;
      let maxCount = 0;

      values.forEach((value) => {
        if (countMap[value]) {
          countMap[value]++;
        } else {
          countMap[value] = 1;
        }

        if (countMap[value] > maxCount) {
          maxCount = countMap[value];
          mode = value;
        }
      });

      if (mode !== null) {
        data.mode = mode.toFixed(2);
      }
    }

    setStatistics(data);
  };

  useEffect(() => {
    validationParam();
    fetchStudentScores();
  }, [fetchStudentScores, validationParam]);

  return (
    <div className="app-container row-container">
      <NavBar></NavBar>
      <div className="content-container column-container">
        <div className="body-header-container row-container">
          <h1>
            <span className="uppercase">
              {courseCode} (SEC {courseSection})
            </span>{' '}
            {courseName}
          </h1>
        </div>
        <VerticleBarGraph
          dataset={students.map((student) => {
            return {
              title: `${student.first_name} ${student.last_name}`,
              value: student.total
            };
          })}
        ></VerticleBarGraph>
        <div className="stat-details column-container">
          <div className="row-container">
            <div className="stat-text">Average Score</div>
            <div className="stat-text">:</div>
            <div className="stat-text">{statistics.average}</div>
          </div>
          <div className="row-container">
            <div className="stat-text">Max Score</div>
            <div className="stat-text">:</div>
            <div className="stat-text">{statistics.max}</div>
          </div>
          <div className="row-container">
            <div className="stat-text">Min Score</div>
            <div className="stat-text">:</div>
            <div className="stat-text">{statistics.min}</div>
          </div>
          <div className="row-container">
            <div className="stat-text">Range</div>
            <div className="stat-text">:</div>
            <div className="stat-text">{statistics.range}</div>
          </div>
          <div className="row-container">
            <div className="stat-text">Median Score</div>
            <div className="stat-text">:</div>
            <div className="stat-text">{statistics.median}</div>
          </div>
          <div className="row-container">
            <div className="stat-text">Mode</div>
            <div className="stat-text">:</div>
            <div className="stat-text">{statistics.mode}</div>
          </div>
          <div className="row-container">
            <div className="stat-text">Variance</div>
            <div className="stat-text">:</div>
            <div className="stat-text">{statistics.variance}</div>
          </div>
          <div className="row-container">
            <div className="stat-text">Standard Deviation</div>
            <div className="stat-text">:</div>
            <div className="stat-text">{statistics.stdDeviation}</div>
          </div>
          <div className="row-container">
            <div className="stat-text">Total Student</div>
            <div className="stat-text">:</div>
            <div className="stat-text">{statistics.count}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
