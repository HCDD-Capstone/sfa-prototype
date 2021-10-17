import React, { useState, useRef, useEffect } from 'react';
import TransactionDetailBox, { getTransactionData } from '../components/TransactionDetailBox';
import DatePicker from "react-datepicker";
import '../styles/Transactions.css';
import "react-datepicker/dist/react-datepicker.css";
import { Bar } from 'react-chartjs-2';

const data = {
    labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
    datasets: [
        {
        label: 'Month',
        data: [12, 19, 3, 5, 2, 3],
        backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)',
        ],
        borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)',
        ],
        borderWidth: 1,
        },
    ],
};

const options = {
    maintainAspectRatio: false,
    scales: {
        yAxes: [
        {
            ticks: {
                beginAtZero: true,
            },
        },
        ],
    },
    layout: {
      padding: {
        top: 5,
        right: 100,
        left: 5,
        bottom: 5
      }
    },
};


function Transactions() {
  const [startDate, setStartDate] = useState(new Date('August 19, 2021 23:15:30'));
  const [endDate, setEndDate] = useState(new Date('December 19, 2021 23:15:30'));
  var transactionData = getTransactionData();
  var barGraphData = [];
  const bar = useRef();
  
  
  useEffect(() => {
    updateChart();
  }, [startDate, endDate]);
  
  const getMonthlySpending = () => {
    let months = (endDate.getFullYear() - startDate.getFullYear()) * 12;
    months -= startDate.getMonth();
    months += endDate.getMonth();
    var monthsList = [];
    var newMonth;
    for (var i = 0; i < months + 1; i++) {
      newMonth = new Date(startDate.getFullYear(), startDate.getMonth() + i);
      monthsList.push(newMonth);
    }
    var fakeDate;
    transactionData.forEach((transaction) => {
      fakeDate = new Date(transaction.date.getFullYear(), transaction.date.getMonth());
      if (!!monthsList.find(item => {return item.getTime() == fakeDate.getTime()})) {
        if (!!barGraphData.some(item => new Date(item.date.getFullYear(), item.date.getMonth()).getTime() === fakeDate.getTime())) {
            barGraphData.forEach((data) => {
              if (new Date(data.date.getFullYear(), data.date.getMonth()).getTime() === fakeDate.getTime()) {
                data.total += transaction.price;
              }
            });
        } else {
          barGraphData.push({
            'date': transaction.date,
            'total': transaction.price
          });
        }
      }
    });
    var counter = 0;
    var monthlySpending = [];
    monthsList.forEach((month) => {
      if (!!barGraphData.some(item => new Date(item.date.getFullYear(), item.date.getMonth()).getTime() === month.getTime())) {
        barGraphData.forEach((data) => {
          if (new Date(data.date.getFullYear(), data.date.getMonth()).getTime() === month.getTime())
          monthlySpending.push({
            'date': month,
            'total': data.total
          });
        });
        
      } else {
        monthlySpending.push({
          'date': month,
          'total': 0
        });
      }
      counter++
    });
    console.log(monthlySpending);
    return monthlySpending;
  }

  const updateChart = () => {
    var spending = getMonthlySpending();
    var labels = [];
    var totals = [];
    spending.forEach((item) => {
      labels.push(new Intl.DateTimeFormat('en-US', { month: 'short'}).format(item.date));
      totals.push(item.total);
    });
    try {
      bar.current.data.labels = labels;
      bar.current.data.datasets[0].data = totals;
      bar.current.update();
    }
    catch (e) {
      console.error(e);
    } 
  }

  return (
    <div className="transactions-wrapper">
      <h2>Transactions</h2>
      <div className="dates">
        <div className="start-date">
          Start Date:
          <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} />
        </div>
        <div className="end-date">
          End Date:
          <DatePicker selected={endDate} onChange={(date) => setEndDate(date)} />
        </div>
      </div>
      <div className="main-content">
        <TransactionDetailBox start={startDate} end={endDate}></TransactionDetailBox>
        <div>
          <Bar data={data} ref={bar} options={options} height={200} width={1000} />
        </div>
        
      </div>
    </div>   
  );
}

export default Transactions;
