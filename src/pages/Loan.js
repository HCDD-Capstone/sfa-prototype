import React, { useState, useEffect } from 'react';
import LoanCard from '../components/LoanCard';
import axios from 'axios';
import '../styles/Loan.css';
import "react-grid-layout/css/styles.css"
import "react-resizable/css/styles.css"
import GridLayout from 'react-grid-layout'

const loan = {
  "balance": 4000,
  "remainingTerm": 120,
  "interestRate": 6.34
}

function Loan() {
  const [balance, setBalance] = useState(0);
  const [remainingTerm, setRemainingTerm] = useState(0)
  const [interestRate, setInterestRate] = useState(0);
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
    let calc = (balance * Math.pow((1 + monthlyRate), 1)) - (payment * ((Math.pow((1 + monthlyRate), 1) - 1) / (monthlyRate)));
    setBalance(calc);
    setRemainingTerm(remainingTerm - 1);
    setAmountPaid(parseFloat(amountPaid) + parseFloat(payment));
    return parseFloat(calc.toFixed(2));
  }

  return (
    <GridLayout className="layout" cols={12} rowHeight={30} width={1500}>
      <div key="e" data-grid={{x: 1, y: 4, w: 4, h: 2, static: true}}>
      <div className="balance">
        Loan Balance
        <h1>${balance.toFixed(2)}</h1>
      </div>
      </div>
      <div key="d" data-grid={{x: 1, y: 6, w: 5, h: 3, static: true}}>
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
      <div key="b" data-grid={{x: 1, y: 9, w: 2, h: 2, static: true}}>
      <div className="card1">
      <LoanCard 
        value={'$' + calculateDefaultPayment()} 
        title="Your Minimum Monthly Payment" 
        description="You need to at least pay this much each month.">
      </LoanCard>
      </div>
      </div>
      <div key="c" data-grid={{x: 3, y: 9, w: 2, h: 2, static: true}}>
      <div className="card2">
      <LoanCard 
        value={'$' + amountPaid.toFixed(2)} 
        title="Amount Paid" 
        description="This is how much you have paid so far.">
      </LoanCard>
      </div>
      </div>
      <div key="a" data-grid={{x: 1, y: 13, w: 2, h: 2, static: true}}>
      <div className="card3">
      <label>
        Monthly Payment: $
        <input value={payment} onInput={(payment) => setPayment(payment.target.value)} />
      </label>
      <button onClick={simulatePayment}>Simulate 1 Month</button>
      </div>
      </div>
      <div key="z" data-grid={{x: 6, y: 1, w: 1, h: 6, static: true}}>
      <div className="graph">This will be a graph</div>
      </div>
    </GridLayout>
    
  );
}

export default Loan;
