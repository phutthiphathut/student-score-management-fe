import React, { useState } from 'react';

import IconButton from './IconButton';

import '../App.css';
import '../Component.css';

import commenticon from '../assets/images/commenticon.png';
import editicon from '../assets/images/editicon.png';
import sendicon from '../assets/images/sendicon.png';
import arrowrighticon from '../assets/images/arrowrighticon2.svg';
import arrowdownicon from '../assets/images/arrowdownicon.svg';

export default function EditableScoreRow({
  evaluation,
  isOpen = false,
  isSubRow = false,
  isSubRowEditing = false,
  onSaveScore,
  onViewFeedback,
  onToggleChange,
  onToggleEditing
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [score, setScore] = useState(
    isSubRow ? evaluation.rubric_received_score : evaluation.eval_received_score
  );

  const onSetEditing = () => {
    setIsEditing(true);
    onToggleEditing(true);
  };

  const onClickSaveScore = () => {
    setIsEditing(false);
    onSaveScore(evaluation.evaluation_id, score);
    onToggleEditing(false);
  };

  const onScoreChange = (event) => {
    setScore(Number(event.target.value));
    if (isSubRow) onSaveScore(evaluation.rubric_id, event.target.value);
  };

  return (
    <tr key={isSubRow ? evaluation.rubric_id : evaluation.evaluation_id}>
      <td>
        {!isSubRow ? (
          <div
            className="icon-container row-container"
            onClick={onToggleChange}
          >
            {!isOpen ? (
              <IconButton src={arrowrighticon} />
            ) : (
              <IconButton src={arrowdownicon} />
            )}
            <h3>{evaluation.evaluation_title}</h3>
          </div>
        ) : (
          <span>
            {isSubRow ? evaluation.rubric_title : evaluation.evaluation_title}
          </span>
        )}
      </td>
      <td>{evaluation.full_score}</td>
      {isEditing || isSubRowEditing ? (
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
      ) : (
        <td>
          {isSubRow
            ? evaluation.rubric_received_score
            : evaluation.eval_received_score}
        </td>
      )}
      <td>
        {!isSubRow && (
          <div className="action-container row-container">
            {isEditing ? (
              <IconButton
                src={sendicon}
                onClick={onClickSaveScore}
              ></IconButton>
            ) : (
              <IconButton src={editicon} onClick={onSetEditing}></IconButton>
            )}
            <IconButton
              src={commenticon}
              onClick={() => onViewFeedback(evaluation.evaluation_id)}
            ></IconButton>
          </div>
        )}
      </td>
    </tr>
  );
}
