import React from 'react';

const LoanCard = (props) => {
    
    return (
        <div>
            <h3>{props.value}</h3>
            <div>{props.title}</div>
            <div>{props.description}</div>
        </div>
    )   
}

export default LoanCard;