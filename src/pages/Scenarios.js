import React from 'react';
import { useLocation } from 'react-router-dom'

function Scenarios() {
    const location = useLocation();
    const { type } = location.state;

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
                    <div>icon here</div><div>You will make ____ fewer payments than current plan</div>
                </div>
                <div>
                    <div>icon here</div><div>You will complete paying off your loan in ____ months</div>
                </div>
                <div>
                    <div>icon here</div><div>You will save $____ in interest</div>
                </div>
            </div>
            <div>
                graph will go here on right
            </div>
        </div>
        
        
    );
}

export default Scenarios;
