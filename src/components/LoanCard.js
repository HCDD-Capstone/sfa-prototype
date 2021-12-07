import React from 'react';
import '../styles/LoanCard.css';

const LoanCard = (props) => {
    
    return (
        <div className= "cards"> 
            <h3>{props.value}</h3>
            <div className='loan-card-title'>{props.title}</div>
            <div className='loan-card-description'>{props.description}</div>
        </div>
    )   
}

export default LoanCard;