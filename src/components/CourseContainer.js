import IconButton from './IconButton';

import '../App.css';
import '../Component.css';

import arrowrighticon from '../assets/images/arrowrighticon.png';

export default function CourseContainer({
  code,
  name,
  time,
  grade,
  onClick = () => {}
}) {
  const handleClick = (event) => {
    onClick();
  };
  
  return (
    <div
      className="base-component course-container row-container"
      onClick={handleClick}
    >
      <div className="column-container course-title">
        <h1>{code}</h1>
        <h2>{name}</h2>
      </div>

      <div className="column-container course-time">
        <h2>{time}</h2>
      </div>

      <div className="row-container course-arrow">
        <h1>{grade}</h1>
        <IconButton src={arrowrighticon}></IconButton>
      </div>
    </div>
  );
}
