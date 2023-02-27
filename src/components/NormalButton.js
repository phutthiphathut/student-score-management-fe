import '../App.css';
import '../Component.css';

export default function NormalButton({ label = "Click" }) {
  return (
    <button className="base-component normal-button" type="button">{label} </button>
  );
}