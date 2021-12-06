import React, { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { evaluate } from 'mathjs';
import { Bar } from 'react-chartjs-2';
import '../styles/Scenarios.css';
import "react-grid-layout/css/styles.css"
import "react-resizable/css/styles.css"
import GridLayout from 'react-grid-layout'


function Scenarios() {
    const location = useLocation();
    const { type } = location.state;
    const [monthlyPayment, setMonthlyPayment] = useState(0);
    const [lumpSum, setLumpSum] = useState(0);
    const [months, setMonths] = useState(0);
    const [payLess, setPayLess] = useState(0);
    const [interestRate, setInterestRate] = useState(0);
    const [totalTerm, setTotalTerm] = useState(0);
    const [balance, setBalance] = useState(0);
    const [monthlyRate, setMonthlyRate] = useState(0);
    const [lessPayments, setLessPayments] = useState(0);
    const [monthsLeft, setMonthsLeft] = useState(0);
    const [savings, setSavings] = useState(0);
    const bar = useRef();
    const trueCost = "(r * p * n) / (1 - ((1 + r)^-n))";
    // v = present value, p = payment
    const remainingBal = "(v * (1 + r)^n) - (p * (((1 + r)^n) - 1) / r)";
    // p = principal
    const defaultPayment = "(p * (r * (1 + r)^n)) / (((1 + r)^n) - 1)";

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
              ticks: {
                  // Include a dollar sign in the ticks
                  callback: function(value, index, values) {
                      return '$' + value;
                  }
              }
          }
        },
      };
    
      const barData = {
        labels: ["Current Plan", "New Scenario"],
        datasets: [
            {
            label: 'Total Cost of Loan',
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

    useEffect(() => {
        axios.get(`/loans`)
        .then(res => {
            setInterestRate(res.data[0].interestRate);
            setTotalTerm(res.data[0].totalTerm);
            setBalance(res.data[0].balance);
            setMonthlyRate(res.data[0].interestRate / 12 / 100);
        })
    }, []); 

    const renderHeader = () => {
        if (type === "each-month") {
            return <h2>Monthly Payment</h2>
        }
        if (type === "lump-sum") {
            return <h2>Lump Sum</h2>
        }
        if (type === "by-time") {
            return <h2>Set Duration</h2>
        }
        if (type === "less-than") {
            return <h2>Pay Less</h2>
        }
    }

    const renderInput = () => {
        if (type === "each-month") {
            return <div class="inputValue">Enter Desired Monthly Payment: $<input value={monthlyPayment} onInput={(monthlyPayment) => setMonthlyPayment(monthlyPayment.target.value)}></input></div>
        }
        if (type === "lump-sum") {
            return <div class="inputValue">Enter Desired Lump Sum Payment: $<input value={lumpSum} onInput={(lumpSum) => setLumpSum(lumpSum.target.value)}></input></div>
        }
        if (type === "by-time") {
            return <div class="inputValue">Enter Desired Months to Complete: <input value={months} onInput={(months) => setMonths(months.target.value)}></input> months</div>
        }
        if (type === "less-than") {
            return <div class="inputValue">Enter Desired Monthly Payment: $<input value={payLess} onInput={(payLess) => setPayLess(payLess.target.value)}></input></div>
        }
    }

    const calculateScenario = () => {
        if (type === "each-month") {
            calculateDesiredMonthlyPayment();
        }
        if (type === "lump-sum") {
            calculateLumpSumPayment();
        }
        if (type === "by-time") {
            calculateByTotalsMonth();
        }
        if (type === "less-than") {
            calculateLessPayment();
        }
    }

    const calculateDesiredMonthlyPayment = () => {
        let totalMonths = 0;
        let loanBalance = balance;
        while (loanBalance > 0) {
            loanBalance = evaluate(remainingBal, {v: loanBalance, r: monthlyRate, n: 1, p: monthlyPayment});
            totalMonths++;
        }
        setMonthsLeft(totalMonths);
        setLessPayments(totalTerm - totalMonths);
        let normalTotal = evaluate(trueCost, {r: monthlyRate, p: balance, n: totalTerm});
        let totalSavings = evaluate(trueCost, {r: monthlyRate, p: balance, n: totalMonths});
        setSavings(normalTotal - totalSavings);
        try {
            setTimeout(() => {
                bar.current.data.datasets[0].data = [normalTotal, totalSavings];
                bar.current.update();
            }, 1000);
        }
        catch (e) {
            console.error(e);
        } 
    }

    const calculateLumpSumPayment = () => {
        let defaultLoanPayment = evaluate(defaultPayment, {p: balance, r: monthlyRate, n: totalTerm});
        console.log(defaultLoanPayment);
        let totalMonths = 0;
        let loanBalance = balance - lumpSum;
        while (loanBalance > 0) {
            loanBalance = evaluate(remainingBal, {v: loanBalance, r: monthlyRate, n: 1, p: defaultLoanPayment});
            totalMonths++;
        }
        setMonthsLeft(totalMonths);
        setLessPayments(totalTerm - totalMonths);
        let normalTotal = evaluate(trueCost, {r: monthlyRate, p: balance, n: totalTerm});
        let totalSavings = evaluate(trueCost, {r: monthlyRate, p: balance, n: totalMonths});
        setSavings(normalTotal - totalSavings);
        try {
            setTimeout(() => {
                bar.current.data.datasets[0].data = [normalTotal, totalSavings];
                bar.current.update();
            }, 1000);
        }
        catch (e) {
            console.error(e);
        } 
    }

    const calculateByTotalsMonth = () => {
        setMonthsLeft(months);
        setLessPayments(totalTerm - months);
        let normalTotal = evaluate(trueCost, {r: monthlyRate, p: balance, n: totalTerm});
        let totalSavings = evaluate(trueCost, {r: monthlyRate, p: balance, n: months});
        setSavings(normalTotal - totalSavings);
        try {
            setTimeout(() => {
                bar.current.data.datasets[0].data = [normalTotal, totalSavings];
                bar.current.update();
            }, 1000);
        }
        catch (e) {
            console.error(e);
        } 
    }

    const calculateLessPayment = () => {
        let defaultLoanPayment = evaluate(defaultPayment, {p: balance, r: monthlyRate, n: totalTerm});
        let totalMonths = 0;
        let loanBalance = balance;
        loanBalance = evaluate(remainingBal, {v: loanBalance, r: monthlyRate, n: 1, p: payLess});
        totalMonths++;
        while (loanBalance > 0) {
            loanBalance = evaluate(remainingBal, {v: loanBalance, r: monthlyRate, n: 1, p: defaultLoanPayment});
            totalMonths++;
        }
        setMonthsLeft(totalMonths);
        setLessPayments(totalTerm - totalMonths);
        let normalTotal = evaluate(trueCost, {r: monthlyRate, p: balance, n: totalTerm});
        let totalSavings = evaluate(trueCost, {r: monthlyRate, p: balance, n: totalMonths});
        setSavings(normalTotal - totalSavings);
        try {
            setTimeout(() => {
                bar.current.data.datasets[0].data = [normalTotal, totalSavings];
                bar.current.update();
            }, 1000);
        }
        catch (e) {
            console.error(e);
        } 
    }

    const renderLessPayments = () => {
        if (lessPayments < 0) {
            return <div class="outputData">You will make {Math.abs(lessPayments)} more payments than current plan.</div>
        } else {
            return <div class="outputData">You will make {lessPayments} fewer payments than current plan.</div>
        }
    }

    const renderSavings = () => {
        if (savings < 0) {
            return <div class="outputData">You will pay ${Math.abs(savings).toFixed(2)} extra in interest.</div>
        } else {
            return <div class="outputData">You will save ${savings.toFixed(2)} in interest.</div>
        }
    }

    return (
        <div class="body">
        <GridLayout className="layout" cols={12} rowHeight={30} width={1500}>
        
            <div key="a" data-grid={{x: 5, y: 0, w: 4, h: 3, static: true}}>
            <div className="heading">
                {renderHeader()}
            </div>
            </div>
            <div key="b" data-grid={{x: 1, y: 3, w: 5, h: 1, static: true}}>
            <div className="input">
                {renderInput()}
            </div>
            </div>
            <div key="c" data-grid={{x: 1, y: 6, w: 5, h: 3, static: true}}>
            <div>
                <div>
                    <div>icon here</div>{renderLessPayments()}
                </div>
                <div>
                    <div>icon here</div><div class="outputData">You will complete paying off your loan in {monthsLeft} months.</div>
                </div>
                <div>
                    <div>icon here</div>{renderSavings()}
                </div>
            </div>
            </div>
            <div key="d" data-grid={{x: 1, y: 4, w: 2, h: 1, static: true}}>
            <div>
                <button onClick={calculateScenario}>Calculate</button>
            </div>
            </div>
            <div key="e" data-grid={{x: 7, y: 3, w: 4, h: 11, static: true}}>
            <div>
                <Bar data={barData} ref={bar} options={barOptions} />
            </div>
            </div>

        </GridLayout>
        
        </div>
    );
}

export default Scenarios;
