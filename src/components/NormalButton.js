import '../App.css';

export default function NormalButton({ label = "Click" }) {
  return (
    <button className="base-component" type="button">{label}</button>
  );
}