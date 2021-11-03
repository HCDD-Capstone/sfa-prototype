import React, { useState, useEffect } from 'react';
import LoanCard from '../components/LoanCard';
import '../styles/Loan.css';

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
        <h1>${balance.toFixed(2)}</h1>
      </div>
      <div className="loan-info">
        <div>
          <h4>Total Loans</h4>
          <div>1</div>
        </div>
        <div>
          <h4>Remaining Term</h4>
          <div>{remainingTerm} months</div>
        </div>
        <div>
          <h4>Current APR</h4>
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
      <label>
        Monthly Payment: $
        <input value={payment} onInput={(payment) => setPayment(payment.target.value)} />
      </label>
      <button onClick={simulatePayment}>Simulate 1 Month</button>
    </div>
    
  );
}

export default Loan;
