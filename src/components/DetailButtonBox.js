import IconButton from '../components/IconButton';

import '../App.css';
import '../Component.css';

import approveicon from '../assets/images/approveicon.png';
import rejecticon from '../assets/images/rejecticon.png';

export default function DetailButtonBox({
  title,
  detail,
  code,
  score,
  onApproved,
  onRejected
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
        <IconButton src={approveicon} onClick={onApproved}></IconButton>
        <IconButton src={rejecticon} onClick={onRejected}></IconButton>
      </div>
    </div>
  );
}
