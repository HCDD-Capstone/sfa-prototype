import React, { useState, useEffect, useRef } from 'react';
import LoanCard from '../components/LoanCard';
import axios from 'axios';
import '../styles/Loan.css';
import { Line } from 'react-chartjs-2';
import "react-grid-layout/css/styles.css"
import "react-resizable/css/styles.css"
import GridLayout from 'react-grid-layout'

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
  const [totalPrincipal, setTotalPrincipal] = useState(0);
  const line = useRef();
  const [count, setCount] = useState(1);
  const [interestData, setInterestData] = useState([]);
  const [balanceData, setBalanceData] = useState([]);
  const [principalData, setPrincipalData] = useState([]);

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

  useEffect(() => {
    try {
      line.current.data.labels.push(count);
      setTimeout(() => {
        line.current.data.datasets[1].data = interestData;
        line.current.data.datasets[0].data = balanceData;
        line.current.data.datasets[2].data = principalData;
        line.current.update();
      }, 100)
      setCount(count + 1);
    } catch (e) {
      console.log(e);
    }
  }, [interestData, balanceData]);

  const calculateDefaultPayment = () => {
    let monthlyRate = interestRate / 12 / 100;
    let calc = balance * (monthlyRate * Math.pow((1 + monthlyRate), remainingTerm)) / (Math.pow((1 + monthlyRate), remainingTerm) - 1);
    return parseFloat(calc.toFixed(2));
  }

  const simulatePayment = () => {
    let monthlyRate = interestRate / 12 / 100;
    calculateOnePayment();
    setInterestData(prevValues => {
      const newValues = [...prevValues, (totalInterest + (monthlyRate * balance)).toFixed(2)];
      return newValues;
    });
    setBalanceData(prevValuess => {
      const newValues = [...prevValuess, balance.toFixed(2)];
      return newValues;
    });
    setPrincipalData(prevValuess => {
      const newValues = [...prevValuess, (totalPrincipal + (payment - (monthlyRate * balance))).toFixed(2)];
      return newValues;
    });
  }

  const calculateOnePayment = () => {
    let monthlyRate = interestRate / 12 / 100;
    setInterestPayment(monthlyRate * balance);
    setTotalInterest(totalInterest + (monthlyRate * balance));
    setTotalPrincipal(totalPrincipal + (payment - (monthlyRate * balance)));
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
      <div key="f" data-grid={{x: 5, y: 9, w: 2, h: 2, static: true}}>
        <div className="card4">
          <LoanCard 
            value={'$' + totalInterest.toFixed(2)} 
            title="Amount in Interest" 
            description="This is how much you have paid in interest so far.">
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
      <div key="z" data-grid={{x: 7, y: 3, w: 4, h: 5, static: true}}>
        <Line ref={line} data={data} options={options} />
      </div>
    </GridLayout>
    
  );
}

export default Loan;
