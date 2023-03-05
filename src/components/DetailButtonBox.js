import IconButton from './IconButton';

import '../App.css';
import '../Component.css';

import accepticon from '../assets/images/accepticon.png';
import denyicon from '../assets/images/denyicon.png';

export default function DetailButtonBox({
  title,
  detail,
  code,
  score,
  onAccepted,
  onDenied
}) {
  return (
    <div className="detail-box-container column-container">
      <div className="detail-button-title-container row-container">
        <h1>{code}</h1>
        <h1>{title}</h1>
        <h1>{score}</h1>
      </div>
      <p>{detail}</p>
      <div className="row-container space-evenly">
        <IconButton src={accepticon} onClick={onAccepted}></IconButton>
        <IconButton src={denyicon} onClick={onDenied}></IconButton>
      </div>
    </div>
  );
}
