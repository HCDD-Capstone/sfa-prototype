import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import TransactionDetailBox from '../components/TransactionDetailBox';
import DatePicker from "react-datepicker";
import '../styles/Transactions.css';
import "react-datepicker/dist/react-datepicker.css";
import { Bar } from 'react-chartjs-2';

const data = {
    labels: [],
    datasets: [
        {
        label: 'Month',
        data: [],
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
    maintainAspectRatio: true,
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
        top: 20,
        right: 30,
        left: 20,
        bottom: 0
      },
    },
};


function Transactions() {
  const [startDate, setStartDate] = useState(new Date('January 1, 2021 23:15:30'));
  const [endDate, setEndDate] = useState(new Date('Novemeber 1, 2021 23:15:30'));
  const [transactions, setTransactions] = useState([]);
  var barGraphData = [];
  const bar = useRef();
  
  useEffect(() => {
    axios.get(`/transaction`)
      .then(res => {
        setTransactions(res.data);
      })
  }, []);  
  
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
    var fakeTransactionDate;
    transactions.forEach((transaction) => {
      fakeTransactionDate = new Date(transaction.date)
      fakeDate = new Date(fakeTransactionDate.getFullYear(), fakeTransactionDate.getMonth());
      if (!!monthsList.find(item => {return item.getTime() === fakeDate.getTime()})) {
        if (!!barGraphData.some(item => new Date(new Date(item.date).getFullYear(), new Date(item.date).getMonth()).getTime() === fakeDate.getTime())) {
            barGraphData.forEach((data) => {
              if (new Date(new Date(data.date).getFullYear(), new Date(data.date).getMonth()).getTime() === fakeDate.getTime()) {
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
    var monthlySpending = [];
    monthsList.forEach((month) => {
      if (!!barGraphData.some(item => new Date( new Date(item.date).getFullYear(), new Date(item.date).getMonth()).getTime() === month.getTime())) {
        barGraphData.forEach((data) => {
          if (new Date( new Date(data.date).getFullYear(), new Date(data.date).getMonth()).getTime() === month.getTime())
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
      console.log(bar);
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
        <TransactionDetailBox className='details' transactions={transactions} start={startDate} end={endDate}></TransactionDetailBox>
        <div className="bar">
          <h2 className="graph-title">Monthly Spending</h2>
          <Bar data={data} ref={bar} options={options} />
        </div>
      </div>
    </div>   
  );
}

export default Transactions;
