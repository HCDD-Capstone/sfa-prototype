import React, { useState, useEffect, useRef } from 'react';
import LoanCard from '../components/LoanCard';
import Scenarios  from './Scenarios.js';
import axios from 'axios';
import '../styles/Loan.css';
import { Line } from 'react-chartjs-2';
import { Dropdown } from 'react-bootstrap';
import DropdownButton from 'react-bootstrap/DropdownButton';
import "react-grid-layout/css/styles.css"
import "react-resizable/css/styles.css"
import GridLayout from 'react-grid-layout'
import { evaluate } from 'mathjs';

const data = {
  labels: [],
  datasets: [
    {
      label: 'Balance',
      fill: false,
      data: [],
      backgroundColor: 'rgb(0, 0, 255)',
      borderColor: 'rgba(0, 0, 255)',
    },
    {
      label: 'Interest',
      fill: true,
      data: [],
      backgroundColor: 'rgb(255, 0, 0)',
      borderColor: 'rgba(255, 0, 0)',
    },
    {
      label: 'Principal',
      data: [],
      fill: true,
      backgroundColor: 'rgb(0, 255, 0)',
      borderColor: 'rgba(0, 255, 0)',
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
        text: 'Loan Amount'
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
        text: 'Months'
      }
    }
  },
  plugins: {
    title: {
      display: true,
      text: "Loan Payment over Time"
    }
  }
};

function Loan() {
  const [balance, setBalance] = useState(0);
  const [remainingTerm, setRemainingTerm] = useState(0)
  const [interestRate, setInterestRate] = useState(0);
  const [interestPayment, setInterestPayment] = useState(0);
  const [totalInterest, setTotalInterest] = useState(0);
  const [loanTitle, setLoanTitle] = useState('');
  const [payment, setPayment] = useState(0);
  const [amountPaid, setAmountPaid] = useState(0);
  const [totalPrincipal, setTotalPrincipal] = useState(0);
  const line = useRef();
  const [count, setCount] = useState(1);
  const [interestData, setInterestData] = useState([]);
  const [balanceData, setBalanceData] = useState([]);
  const [principalData, setPrincipalData] = useState([]);
  const [defaultLoanPayment, setDefaultLoanPayment] = useState(0);
  const [scenario, setScenario] = useState('each-month');
  // v = present value, p = payment
  const remainingBal = "(v * (1 + r)^n) - (p * (((1 + r)^n) - 1) / r)";
  // p = principal
  const defaultPayment = "(p * (r * (1 + r)^n)) / (((1 + r)^n) - 1)";

  useEffect(() => {
    axios.get(`/loans`)
      .then(res => {
        let loan = res.data[0];
        setBalance(loan.balance);
        setRemainingTerm(loan.remainingTerm);
        setInterestRate(loan.interestRate);
        setLoanTitle(loan.title);
        let monthlyRate = loan.interestRate / 12 / 100;
        let defPayment = evaluate(defaultPayment, {p: loan.balance, r: monthlyRate, n: loan.remainingTerm});
        setDefaultLoanPayment(defPayment.toFixed(2));
      })
  }, []); 

  useEffect(() => {
    try {
      line.current.data.labels = count;
      setTimeout(() => {
        line.current.data.datasets[1].data = interestData;
        line.current.data.datasets[0].data = balanceData;
        line.current.data.datasets[2].data = principalData;
        line.current.update();
      }, 100)
    } catch (e) {
      console.log(e);
    }
  }, [interestData, balanceData]);

  const calculateLoanPayments = () => {
    let localBal = balance;
    let totalInterest = 0;
    let totalPrincipal = 0;
    let totalInterestData = [0];
    let totalBalanceData = [localBal];
    let totalPrincipalData = [0];
    let localCount = [0];
    let currentCount = 0;
    let monthlyRate = interestRate / 12 / 100;
    while (localBal > 0) {
      localBal = evaluate(remainingBal, {v: localBal, r: monthlyRate, n: 1, p: payment});
      totalBalanceData.push(localBal);
      totalInterest += monthlyRate * localBal;
      totalInterestData.push(totalInterest);
      totalPrincipal += payment - (monthlyRate * localBal);
      totalPrincipalData.push(totalPrincipal);
      currentCount++;
      localCount.push(currentCount);
    }
    setRemainingTerm(remainingTerm - currentCount);
    setTotalInterest(totalInterest);
    setAmountPaid(totalInterest + totalPrincipal);
    setCount(localCount);
    setInterestData(totalInterestData);
    setBalanceData(totalBalanceData);
    setPrincipalData(totalPrincipalData);
  }

  const handleSelect=(eventKey, e)=>{
    console.log(eventKey + " " + e);
  }
  return (
    <GridLayout className="layout" cols={12} rowHeight={30} width={1500}>
      <div key="e" data-grid={{x: 1, y: 2, w: 4, h: 1, static: true}}>
      <div className="balance">
        Loan Total
        <h1>${balance.toFixed(2)}</h1>
      </div>
      </div>
      <div key="p" data-grid={{x: 7.3, y: 7, w: 3.2, h: 1, static: true}}>
        <div className ="balanceDes">
          Balance - Amount of money currently owed
        </div>
      </div>
      <div key="y" data-grid={{x: 7.3, y: 8, w: 3.2, h: 1, static: true}}>
        <div className ="interestDes">
          Interest - Cost of borrowing money
        </div>
      </div>
      <div key="o" data-grid={{x: 7.3, y: 9, w: 3.2, h: 1, static: true}}>
        <div className ="principleDes">
          Principle - (total amount paid - amount paid in interest)
        </div>
      </div>
      <div key="d" data-grid={{x: 1, y: 4, w: 5, h: 2, static: true}}>
      <div className="loan-info">
        <div>
          <h4>Total Loans</h4>
          <div>1</div>
        </div>
        <div>
          <h3>Remaining Term</h3>
          <div>{remainingTerm} months</div>
        </div>
        <div>
          <h3>Current APR</h3>
          <div>{interestRate}%</div>
        </div>
      </div>
      </div>
      <div key="b" data-grid={{x: 1, y: 6, w: 2, h: 2, static: true}}>
      <div className="card1">
        <LoanCard 
          value={'$' + defaultLoanPayment} 
          title="Your Minimum Monthly Payment" 
          description="You need to at least pay this much each month.">
        </LoanCard>
      </div>
      </div>
      <div key="c" data-grid={{x: 3, y: 6, w: 2, h: 2, static: true}}>
        <div className="card2">
          <LoanCard 
            value={'$' + amountPaid.toFixed(2)} 
            title="Amount Paid" 
            description="This is how much you have paid so far.">
          </LoanCard>
        </div>
      </div>
      <div key="f" data-grid={{x: 5, y: 6, w: 2, h: 2, static: true}}>
        <div className="card4">
          <LoanCard 
            value={'$' + totalInterest.toFixed(2)} 
            title="Amount in Interest" 
            description="This is how much you have paid in interest so far.">
          </LoanCard>
        </div>
      </div>
      <div key="a" data-grid={{x: 1, y: 9.5, w: 2, h: 1, static: true}}>
        <div className="card3">
          <label>
            Monthly Payment: $
            <input value={payment} onInput={(payment) => setPayment(payment.target.value)} />
          </label>
          <button onClick={calculateLoanPayments}>Simulate</button>
        </div>
      </div>
      <div key="z" data-grid={{x: 7, y: 1, w: 4, h: 1, static: true}}>
        <Line ref={line} data={data} options={options} />
      </div>
      <div key="x" data-grid={{x: 1, y: 15, w: 12, h: 1, static: true}}>
        <DropdownButton className= "scenario-button" variant="primary" id="dropdown-basic-button" title="Choose a scenario" onSelect={(event) => {setScenario(event)}}>
          <Dropdown.Item className='scenario-item' eventKey="each-month">What if I pay a certain amount each month?</Dropdown.Item>
          <Dropdown.Item className='scenario-item' eventKey="lump-sum">What if I pay a lump sum amount right now?</Dropdown.Item>
          <Dropdown.Item className='scenario-item' eventKey="by-time">What if I want to pay off a loan in a certain amount of time?</Dropdown.Item>
          <Dropdown.Item className='scenario-item' eventKey="less-than">What if I need to pay off less than normal this month?</Dropdown.Item>
        </DropdownButton>
        <Scenarios type={scenario} />
      </div>
      <div key="t" data-grid={{x: 1, y: 13, w: 12, h: 1, static: true}}>
      <h2 className ="bottom-title">
          Try our "What-If" tool below
        </h2>
      </div>
    </GridLayout>
    
  );
}

export default Loan;
