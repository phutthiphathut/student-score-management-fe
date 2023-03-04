import '../App.css';
import '../Component.css';

export default function CourseContainer({ title, detail, score }) {
  return (
    <div className="detail-box-container column-container">
      <div className="detail-title-container row-container">
        <h1>{title}</h1>
        <h1>{score}</h1>
      </div>
      <p>{detail}</p>
    </div>
  );
}
