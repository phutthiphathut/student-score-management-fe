import '../styles/NormalButton.css';

export default function NormalButton({ label = 'Click' }) {
  return (
    <button className="normal-btn" type="button">{label}</button>
  );
}