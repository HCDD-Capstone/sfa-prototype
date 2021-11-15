import React from 'react';
import Welcome from '../components/Welcome.js';
import { Line } from 'react-chartjs-2';

const data = {
  labels: [1, 2, 3, 4],
  datasets: [
    {
      label: 'Net Worth',
      data: [0, 1, 5, 10],
      fill: false,
      backgroundColor: 'rgb(0, 0, 255)',
      borderColor: 'rgba(0, 0, 255)',
    },
  ],
};

const options = {
  scales: {
    y: {
      beginAtZero: true
    }
  }
};

function Home() {

  return (
    <div>  
      <Welcome name="User"></Welcome>
      <div>
        <h1>Total Net Worth</h1>
        <Line data={data} options={options} />
      </div>
      <div className="summary">
        <h2>Cash</h2>
        <p>Total: $10,000</p>
        <h2>Liabilities</h2>
        <p>Loan Total: $4,000</p>
      </div>
    </div>
    
  );
}

export default Home;
