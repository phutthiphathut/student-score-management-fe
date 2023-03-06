import React, { useState } from 'react';

import IconButton from './IconButton';

import '../App.css';
import '../Component.css';

import commenticon from '../assets/images/commenticon.png';
import editicon from '../assets/images/editicon.png';
import sendicon from '../assets/images/sendicon.png';

export default function EditableScoreRow({
  evaluation,
  onSaveScore,
  onViewFeedback
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [score, setScore] = useState(evaluation.eval_received_score);

  const onClickSaveScore = () => {
    setIsEditing(false);
    onSaveScore(evaluation.evaluation_id, score);
  };

  const onScoreChange = (event) => {
    setScore(Number(event.target.value));
  };

  return (
    <tr key={evaluation.evaluation_id}>
      <td>{evaluation.evaluation_title}</td>
      <td>{evaluation.full_score}</td>
      {!isEditing && <td>{evaluation.eval_received_score}</td>}
      {isEditing && (
        <td>
          <div className="action-container row-container">
            <input
              className="base-component score-input-box"
              type="number"
              value={score}
              onChange={onScoreChange}
            />
          </div>
        </td>
      )}
      <td>
        <div className="action-container row-container">
          {!isEditing && (
            <IconButton
              src={editicon}
              onClick={() => setIsEditing(true)}
            ></IconButton>
          )}
          {isEditing && (
            <IconButton src={sendicon} onClick={onClickSaveScore}></IconButton>
          )}
          <IconButton
            src={commenticon}
            onClick={() => onViewFeedback(evaluation.evaluation_id)}
          ></IconButton>
        </div>
      </td>
    </tr>
  );
}
