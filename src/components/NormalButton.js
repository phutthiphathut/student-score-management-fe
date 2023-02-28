import '../App.css';
import '../Component.css';

export default function NormalButton({ label = 'Click', onClick = ()=>{}  }) {
  const handleClick = (event) => {
    onClick();
  };

  return (
    <button
      className="base-component normal-button"
      type="button"
      onClick={handleClick}
    >
      {label}
    </button>
  );
}
