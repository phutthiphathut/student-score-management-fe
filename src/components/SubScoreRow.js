import React, { useState } from 'react';

import IconButton from './IconButton';

import '../App.css';
import '../Component.css';

import commenticon from '../assets/images/commenticon.png';
import exclamationicon from '../assets/images/exclamationmarkicon.png';
import arrowrighticon from '../assets/images/arrowrighticon2.svg';
import arrowdownicon from '../assets/images/arrowdownicon.svg';

export default function SubScoreRow({
  evaluation,
  onViewFeedback,
  onCreateAppeal
}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <tr key={evaluation.evaluation_id}>
        <td>
          {evaluation.rubrics.length ? (
            <div
              className="icon-container row-container"
              onClick={() => setIsOpen(!isOpen)}
            >
              {!isOpen ? (
                <IconButton src={arrowrighticon} />
              ) : (
                <IconButton src={arrowdownicon} />
              )}
              <h3>{evaluation.evaluation_title}</h3>
            </div>
          ) : (
            <span>{evaluation.evaluation_title}</span>
          )}
        </td>
        <td>{evaluation.full_score}</td>
        <td>{evaluation.eval_received_score}</td>
        <td>
          <div className="action-container row-container">
            <IconButton
              src={commenticon}
              onClick={() => onViewFeedback(evaluation.evaluation_id)}
            ></IconButton>
            <IconButton
              src={exclamationicon}
              onClick={() => onCreateAppeal(evaluation.evaluation_id)}
            ></IconButton>
          </div>
        </td>
      </tr>
      {isOpen &&
        evaluation.rubrics.map((rubric) => (
          <tr key={rubric.rubric_id}>
            <td>{rubric.rubric_title}</td>
            <td>{rubric.full_score}</td>
            <td>{rubric.rubric_received_score}</td>
            <td></td>
          </tr>
        ))}
    </>
  );
}
