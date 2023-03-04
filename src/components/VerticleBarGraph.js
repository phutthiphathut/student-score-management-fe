import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

import '../App.css';
import '../Component.css';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export default function VerticleBarGraph({ dataset = [] }) {
  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false
      },
      title: {
        display: false
      }
    }
  };

  const data = {
    labels: dataset.map((data) => data.title),
    datasets: [
      {
        data: dataset.map((data) => data.value),
        backgroundColor: '#76D77A'
      }
    ]
  };

  return (
    <div className="stat-graph-container column-container">
      <Bar options={options} data={data} />
    </div>
  );
}
