import React, { useState } from 'react';
import Welcome from '../components/Welcome.js';
import { Line } from 'react-chartjs-2';
import "react-grid-layout/css/styles.css"
import "react-resizable/css/styles.css"
import GridLayout from 'react-grid-layout'
import '../styles/Home.css';

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
      beginAtZero: true,
      title: {
        display: true,
        align: "center",
        text: 'Networth'
      },
      ticks: {
        // Include a dollar sign in the ticks
        callback: function(value, index, values) {
            return '$' + value;
        }
      } 
    },
    x: {
      title: {
        display: true,
        align: 'center',
        text: 'Year'
      }
    }
  },
};

function Home() {
  const [totalCash, setTotalCash] = useState(10000);
  const [totalLoan, setTotalLoan] = useState(4000);

  return (
    <GridLayout className="layout" cols={12} rowHeight={30} width={1500}>  
    <div key="a" data-grid={{x: 1, y: 0, w: 4, h: 2, static: true}}>
      <div className="hello">
        <Welcome name="User"></Welcome>
      </div>
    </div>
    <div key="b" data-grid={{x: 1, y: 2, w: 7, h: 11, static: true}}>
      <div className="headings">
        <h1>$6000</h1>
        <h3>Total Net Worth</h3>
        <Line data={data} options={options} />
      </div>
    </div>
    <div key="c" data-grid={{x: 8.5, y: 7, w: 3, h: 11, static: true}}>
      <div className="summary">
        <h2><b>Cash</b></h2>
        <h3>Total: ${totalCash}</h3>
        <h2><b>Liabilities</b></h2>
        <h3>Loan Total: ${totalLoan}</h3>
      </div>
    </div>
    </GridLayout>
    
  );
}

export default Home;
