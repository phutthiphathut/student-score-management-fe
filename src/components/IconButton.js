import '../App.css';
import '../Component.css';

export default function IconButton({ src = '', onClick = () => {} }) {
  const handleClick = (event) => {
    onClick();
  };

  return (
    <img className="icon-img" src={src} alt="icon" onClick={handleClick} />
  );
}
