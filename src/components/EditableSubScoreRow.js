import React, { useState } from 'react';

import EditableScoreRow from './EditableScoreRow';

import '../App.css';
import '../Component.css';

export default function EditableSubScoreRow({
  evaluation,
  onSaveScore,
  onViewFeedback,
  onRubricScoreChange
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  return (
    <>
      <EditableScoreRow
        key={evaluation.evaluation_id}
        evaluation={evaluation}
        isOpen={isOpen}
        onSaveScore={onSaveScore}
        onViewFeedback={onViewFeedback}
        onToggleChange={() => setIsOpen(!isOpen)}
        onToggleEditing={(value) => setIsEditing(value)}
      ></EditableScoreRow>
      {isOpen &&
        evaluation.rubrics.map((rubric) => (
          <EditableScoreRow
            key={rubric.rubric_id}
            evaluation={rubric}
            isSubRow={true}
            isSubRowEditing={isEditing}
            onSaveScore={onRubricScoreChange}
          ></EditableScoreRow>
        ))}
    </>
  );
}
