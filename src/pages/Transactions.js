import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import GridLayout from 'react-grid-layout'
import TransactionDetailBox from '../components/TransactionDetailBox';
import DatePicker from "react-datepicker";
import '../styles/Transactions.css';
import "react-datepicker/dist/react-datepicker.css";
import { Bar, Doughnut } from 'react-chartjs-2';
import { Link } from "react-router-dom";
import "react-grid-layout/css/styles.css"
import "react-resizable/css/styles.css"

function Transactions() {
  const [startDate, setStartDate] = useState(new Date('January 1, 2021 23:15:30'));
  const [endDate, setEndDate] = useState(new Date('Novemeber 1, 2021 23:15:30'));
  const [transactions, setTransactions] = useState([]);
  const [doughnutMonth, setDoughnutMonth] = useState(new Intl.DateTimeFormat('en-US', { month: 'long'}).format(new Date('January 1, 2021 23:15:30')));
  var doughnutTypes = {};
  var barGraphData = [];
  const bar = useRef();
  const doughnut = useRef();

  const barOptions = {
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
    scales: {
      y: {
        title: {
          display: true,
          align: "center",
          text: 'Total Spent'
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
          text: 'Month'
        }
      }
    },
    plugins: {
      legend: {
        display: false
      }
    },
    layout: {
      padding: {
        top: 20,
        right: 30,
        left: 20,
        bottom: 0
      },
    },
    onClick: (e) => {
      console.log(e);
      let month = e.chart.scales.x.getValueForPixel(e.x);
      let newDate = new Date(startDate.getFullYear(), (startDate.getMonth() + month));
      let doughnutData = getDoughnutData(newDate);
      let labels = Object.getOwnPropertyNames(doughnutData);
      let totals = Object.values(doughnutData)
      try {
        doughnut.current.data.labels = labels;
        doughnut.current.data.datasets[0].data = totals;
        doughnut.current.update();
        console.log(bar.current.data);
        //setDoughnutMonth(new Intl.DateTimeFormat('en-US', { month: 'long'}).format(newDate));
      } catch(e) {
        console.error(e);
      }

    },
  };

  const barData = {
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

  const doughnutData = {
  labels: ['Food', 'Rent', 'Entertainment', 'Utilities', 'Loans', 'Gas'],
    datasets: [
      {
        label: 'Monthly Cost Breakdown',
        data: [0, 1450, 45, 120, 600, 115],
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

  const doughnutOptions = {};

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

  const getDoughnutData = (transactionDate) => {
    doughnutTypes = {};
    transactions.forEach((transaction) => {
      let date = new Date(transaction.date);
      if (date.getMonth() == transactionDate.getMonth() && date.getFullYear() === transactionDate.getFullYear()) {
        if (doughnutTypes.hasOwnProperty(transaction.type)) {
          doughnutTypes[transaction.type] += transaction.price;
        } else {
          doughnutTypes[transaction.type] = transaction.price;
        }
      }
    });
    return doughnutTypes;
  }

  const updateChart = () => {
    var spending = getMonthlySpending();
    var labels = [];
    var totals = [];
    spending.forEach((item) => {
      labels.push(new Intl.DateTimeFormat('en-US', { month: 'long'}).format(item.date));
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
    <GridLayout className="layout" cols={12} rowHeight={30} width={1500}>
        <div key="a" data-grid={{x: 0, y: 0, w: 1, h: 1, static: true}}><h1>Transactions</h1></div>
        <div key="b" data-grid={{x: 0, y: 1, w: 12, h: 2, static: true}}>
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
        </div>
        <div key="detail-grid" data-grid={{x: 0, y: 4, w: 3, h: 15}}>
          <TransactionDetailBox className='details' transactions={transactions} start={startDate} end={endDate}></TransactionDetailBox>
        </div>
        <div key="d" className="bar-grid" data-grid={{x: 3, y: 4, w: 6, h: 15}}>
          <div className="bar">
            <h3 className="graph-title">Monthly Spending</h3>
            <Bar data={barData} ref={bar} options={barOptions} />
          </div>
        </div>
        <div key="e" data-grid={{x: 9, y: 4, w: 3, h: 15}}>
          <div className="doughnut">
            <h3 className="doughnut-title">Breakdown for {doughnutMonth}</h3>
            <Doughnut data={doughnutData} ref={doughnut} options={doughnutOptions} />
          </div>
        </div>
      </GridLayout>
  );
}

export default Transactions;