import React from 'react';
import '../styles/LoanCard.css';

const LoanCard = (props) => {
    
    return (
        <div className= "cards"> 
            <h3>{props.value}</h3>
            <div>{props.title}</div>
            <div>{props.description}</div>
        </div>
    )   
}

export default LoanCard;