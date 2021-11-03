import React, { useState, useEffect } from 'react';
import LoanCard from '../components/LoanCard';
import axios from 'axios';

const loan = {
  "balance": 4000,
  "remainingTerm": 120,
  "interestRate": 6.34
}

function Loan() {
  const [balance, setBalance] = useState(loan.balance);
  const [remainingTerm, setRemainingTerm] = useState(loan.remainingTerm)
  const [interestRate, setInterestRate] = useState(loan.interestRate);
  const [payment, setPayment] = useState(0);
  const [amountPaid, setAmountPaid] = useState(0);

  useEffect(() => {
    axios.get(`/loans`)
      .then(res => {
        console.log(res.data);
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
    <div className="loan-wrapper">
      <div className="balance">
        Loan Balance
        <h3>${balance.toFixed(2)}</h3>
      </div>
      <div className="loan-info">
        <div>
          <div>Total Loans</div>
          <div>1</div>
        </div>
        <div>
          <div>Remaining Term</div>
          <div>{remainingTerm} months</div>
        </div>
        <div>
          <div>Current APR</div>
          <div>{interestRate}%</div>
        </div>
      </div>
      <LoanCard 
        value={'$' + calculateDefaultPayment()} 
        title="Your Minimum Monthly Payment" 
        description="You need to at least pay this much each month.">
      </LoanCard>
      <LoanCard 
        value={'$' + amountPaid.toFixed(2)} 
        title="Amount Paid" 
        description="This is how much you have paid so far.">
      </LoanCard>
      <label>
        Monthly Payment: $
        <input value={payment} onInput={(payment) => setPayment(payment.target.value)} />
      </label>
      <button onClick={simulatePayment}>Simulate 1 Month</button>
      <div>This will be a graph</div>
    </div>
    
  );
}

export default Loan;
