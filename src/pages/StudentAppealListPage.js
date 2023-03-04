import React, { useEffect, useState,useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

import NavBar from '../components/NavBar';
import IconButton from '../components/IconButton';

import '../App.css';
import '../Component.css';

import commenticon from '../assets/images/commenticon.png';
import pendingicon from '../assets/images/pendingicon.png';
import approveicon from '../assets/images/approveicon.png';
import rejecticon from '../assets/images/rejecticon.png';

const Status = {
  Pending: 'Pending',
  Approved: 'Approved',
  Rejected: 'Rejected'
};

export default function StudentAppealListPage() {
  const navigate = useNavigate();

  const [appeals, setAppeals] = useState([]);



  const fetchAppeals = useCallback( () => {
    let list = [];

    for (let index = 0; index < 5; index++) {
      list.push({
        id: index + 1,
        code: 'SUB10' + (index + 1),
        evaluation: 'Quiz',
        score: 7,
        fullScore: 10,
        status: Status.Pending
      });
    }

    setAppeals(list);
  }, []);

  useEffect(() => {
    fetchAppeals();
  }, [fetchAppeals]);

  const getStatusIcon = (status) => {
    switch (status) {
      case Status.Pending:
        return pendingicon;
      case Status.Approved:
        return approveicon;
      case Status.Rejected:
        return rejecticon;
      default:
        return pendingicon;
    }
  };

  const onAppealRemark = (id) => {
    navigate(`/student/appeals/${id}`);
  };

  return (
    <div className="app-container row-container">
      <NavBar></NavBar>
      <div className="content-container column-container">
        <div className="body-header-container row-container">
          <h1>Appeal Result</h1>
        </div>
        <div className="table-container">
          <table id="data-table">
            <thead>
              <tr>
                <th>Course Code</th>
                <th>Evaluation</th>
                <th>Score</th>
                <th>Result</th>
              </tr>
            </thead>
            <tbody>
              {appeals.map((appeal) => (
                <tr key={appeal.id}>
                  <td>{appeal.code}</td>
                  <td>{appeal.evaluation}</td>
                  <td>
                    {appeal.score}/{appeal.fullScore}
                  </td>
                  <td>
                    <div className="action-container row-container">
                      <IconButton
                        src={commenticon}
                        onClick={() => onAppealRemark(appeal.id)}
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
