export default function SizedBox({ width = 0, height = 0 }) {
  const size = { width: width, height: height };
  return <div style={size}></div>;
}
