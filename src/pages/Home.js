import React, { useState } from 'react';
import Welcome from '../components/Welcome.js';
import { Line } from 'react-chartjs-2';

const data = {
  labels: [2018, 2019, 2020, 2021],
  datasets: [
    {
      label: 'Net Worth',
      data: [3200, 3452, 4564, 6000],
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
  const [totalCash, setTotalCash] = useState(10000);
  const [totalLoan, setTotalLoan] = useState(4000);

  return (
    <div>  
      <Welcome name="User"></Welcome>
      <div>
        <h1>Total Net Worth</h1>
        <h3></h3>
        <Line data={data} options={options} />
      </div>
      <div className="summary">
        <h2>Cash</h2>
        <p>Total: ${totalCash}</p>
        <h2>Liabilities</h2>
        <p>Loan Total: ${totalLoan}</p>
      </div>
    </div>
    
  );
}

export default Home;
