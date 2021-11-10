import React, { useState, useEffect } from 'react';
import LoanCard from '../components/LoanCard';
import axios from 'axios';
import '../styles/Loan.css';
import { Line } from 'react-chartjs-2';

const data = {
  labels: [1, 2, 3, 4],
  datasets: [
    {
      label: 'Principal',
      data: [0, 1, 5, 10],
      fill: false,
      backgroundColor: 'rgb(0, 0, 255)',
      borderColor: 'rgba(0, 0, 255)',
    },
    {
      label: 'Interest',
      data: [0, 0.5, 1, 1.12],
      fill: false,
      backgroundColor: 'rgb(255, 0, 0)',
      borderColor: 'rgba(255, 0, 0)',
    },
    {
      label: 'Balance',
      data: [10, 9, 5, 0],
      fill: false,
      backgroundColor: 'rgb(0, 255, 0)',
      borderColor: 'rgba(0, 255, 0)',
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

function Loan() {
  const [balance, setBalance] = useState(0);
  const [remainingTerm, setRemainingTerm] = useState(0)
  const [interestRate, setInterestRate] = useState(0);
  const [interestPayment, setInterestPayment] = useState(0);
  const [totalInterest, setTotalInterest] = useState(0);
  const [loanTitle, setLoanTitle] = useState('');
  const [payment, setPayment] = useState(0);
  const [amountPaid, setAmountPaid] = useState(0);

  useEffect(() => {
    axios.get(`/loans`)
      .then(res => {
        let loan = res.data[0];
        setBalance(loan.balance);
        setRemainingTerm(loan.remainingTerm);
        setInterestRate(loan.interestRate);
        setLoanTitle(loan.title);
      })
  }, []); 

  const calculateDefaultPayment = () => {
    let monthlyRate = interestRate / 12 / 100;
    let calc = balance * (monthlyRate * Math.pow((1 + monthlyRate), remainingTerm)) / (Math.pow((1 + monthlyRate), remainingTerm) - 1);
    return parseFloat(calc.toFixed(2));
  }

  const simulatePayment = () => {
    calculateOnePayment();
  }

  const calculateOnePayment = () => {
    let monthlyRate = interestRate / 12 / 100;
    setInterestPayment(monthlyRate * balance);
    setTotalInterest(totalInterest + (monthlyRate * balance));
    let calc = (balance * Math.pow((1 + monthlyRate), 1)) - (payment * ((Math.pow((1 + monthlyRate), 1) - 1) / (monthlyRate)));
    setBalance(calc);
    setRemainingTerm(remainingTerm - 1);
    setAmountPaid(parseFloat(amountPaid) + parseFloat(payment));
    return parseFloat(calc.toFixed(2));
  }

  return (
    <div className="loan-wrapper">
      <div className="balance">
        Loan Balance
        <h1>${balance.toFixed(2)}</h1>
      </div>
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
      <div className="card1">
        <LoanCard 
          value={'$' + calculateDefaultPayment()} 
          title="Your Minimum Monthly Payment" 
          description="You need to at least pay this much each month.">
        </LoanCard>
      </div>
      <div className="card2">
        <LoanCard 
          value={'$' + amountPaid.toFixed(2)} 
          title="Amount Paid" 
          description="This is how much you have paid so far.">
        </LoanCard>
      </div>
      <div className="card4">
        <LoanCard 
          value={'$' + totalInterest.toFixed(2)} 
          title="Amount in Interest" 
          description="This is how much you have paid in interest so far.">
        </LoanCard>
      </div>
      <div className="card3">
      <label>
        Monthly Payment: $
        <input value={payment} onInput={(payment) => setPayment(payment.target.value)} />
      </label>
      <button onClick={simulatePayment}>Simulate 1 Month</button>
      </div>
      <div className="graph">
        <Line data={data} options={options} />
      </div>
    </div>
    
  );
}

export default Loan;
