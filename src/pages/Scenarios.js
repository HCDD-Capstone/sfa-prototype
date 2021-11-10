import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import algebra from 'algebra.js';
import { evaluate } from 'mathjs';


function Scenarios() {
    const location = useLocation();
    const { type } = location.state;
    const [monthlyPayment, setMonthlyPayment] = useState(0);
    const [lumpSum, setLumpSum] = useState(0);
    const [months, setMonths] = useState(0);
    const [payLess, setPayLess] = useState(0);
    const [interestRate, setInterestRate] = useState(0);
    const [lessPayments, setLessPayments] = useState(0);
    const [monthsLeft, setMonthsLeft] = useState(0);
    const [savings, setSavings] = useState(0);
    const [loan, setLoan] = useState({});

    let trueCost = "(r * p * n) / (1 - ((1 + r)^-n))";
    // v = present value, p = payment
    let remainingBal = "(v * (1 + r)^n) - (p * (((1 + r)^n) - 1) / r)";

    useEffect(() => {
        axios.get(`/loans`)
        .then(res => {
            setLoan(res.data[0]);
            setInterestRate(loan.interestRate);
            var monthlyRate = interestRate / 12 / 100;
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
            return <div>Enter Desired Monthly Payment: $<input></input></div>
        }
        if (type === "lump-sum") {
            return <div>Enter Desired Lump Sum Payment: $<input></input></div>
        }
        if (type === "by-time") {
            return <div>Enter Desired Months to Complete: <input></input> months</div>
        }
        if (type === "less-than") {
            return <div>Enter Amount Less Than Current Plan: $<input></input></div>
        }
    }

    return (
        <div>
            <div className="heading">
                {renderHeader()}
            </div>
            <div className="input">
                {renderInput()}
            </div>
            <div>
                <div>
                    <div>icon here</div><div>You will make {lessPayments} fewer payments than current plan</div>
                </div>
                <div>
                    <div>icon here</div><div>You will complete paying off your loan in {monthsLeft} months</div>
                </div>
                <div>
                    <div>icon here</div><div>You will save ${savings} in interest</div>
                </div>
            </div>
            <button>Calculate</button>
            <div>
                graph will go here on right
            </div>
        </div>
        
        
    );
}

export default Scenarios;
