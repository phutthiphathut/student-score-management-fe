import React, { useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import NavBar from '../components/NavBar';
import IconButton from '../components/IconButton';

import '../App.css';
import '../Component.css';

import commenticon from '../assets/images/commenticon.png';
import pendingicon from '../assets/images/pendingicon.png';
import accepticon from '../assets/images/accepticon.png';
import denyicon from '../assets/images/denyicon.png';

const Status = {
  Pending: 'Pending',
  Accepted: 'Accepted',
  Denied: 'Denied'
};

export default function ProgramDirectorAppealListPage() {
  const navigate = useNavigate();

  const [appeals, setAppeals] = useState([]);

  const fetchAppeals = useCallback(() => {
    axios
      .get(process.env.REACT_APP_API_URL + '/api/pd/appeals')
      .then((response) => {
        if (response.data != null && response.data.length) {
          setAppeals(response.data);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    fetchAppeals();
  }, [fetchAppeals]);

  const getStatusIcon = (status) => {
    switch (status) {
      case Status.Pending:
        return pendingicon;
      case Status.Accepted:
        return accepticon;
      case Status.Denied:
        return denyicon;
      default:
        return pendingicon;
    }
  };

  const onAppealRemark = (studentId, evaluationId) => {
    navigate(
      `/programdirector/appeals/student/${studentId}/evaluation/${evaluationId}`
    );
  };

  return (
    <div className="app-container row-container">
      <NavBar></NavBar>
      <div className="content-container column-container">
        <div className="body-header-container row-container">
          <h1>Appeal List</h1>
        </div>
        <div className="table-container">
          <table id="data-table">
            <thead>
              <tr>
                <th>Student ID</th>
                <th>Course Code</th>
                <th>Evaluation</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {appeals.map((appeal) => (
                <tr key={`${appeal.student_id}${appeal.evaluation_id}`}>
                  <td>{appeal.student_id}</td>
                  <td>{appeal.course_id}</td>
                  <td>{appeal.evaluation_title}</td>
                  <td>
                    <div className="action-container row-container">
                      <IconButton
                        src={commenticon}
                        onClick={() =>
                          onAppealRemark(
                            appeal.student_id,
                            appeal.evaluation_id
                          )
                        }
                      ></IconButton>
                      <IconButton
                        src={getStatusIcon(appeal.status)}
                      ></IconButton>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
