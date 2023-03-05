import React, { useState } from 'react';

import IconButton from './IconButton';
import InputBox from './InputBox';

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
  const [score, setScore] = useState(evaluation.score);

  const onClickSaveScore = () => {
    setIsEditing(false);
    onSaveScore(evaluation.id, score);
  };

  const onScoreChange = (event) => {
    setScore(Number(event.target.value));
  };

  return (
    <tr key={evaluation.id}>
      <td>{evaluation.name}</td>
      <td>{evaluation.fullScore}</td>
      {!isEditing && <td>{evaluation.score}</td>}
      {isEditing && (
        <div className="action-container row-container">
          <input
            className="base-component score-input-box"
            type="number"
            value={score}
            onChange={onScoreChange}
          />
        </div>
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
            onClick={() => onViewFeedback(evaluation.id)}
          ></IconButton>
        </div>
      </td>
    </tr>
  );
}
