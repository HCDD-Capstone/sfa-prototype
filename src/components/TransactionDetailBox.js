import React from 'react';
import TransactionDetail from './TransactionDetail';
import '../styles/TransactionDetailBox.css';

const TransactionDetailBox = (props) => {
    
    console.log(props);
    return (
        <div id="details-wrapper">
            {props.transactions.map(function(item) {
            if (props.start < new Date(item.date) && props.end > new Date(item.date)) {
                return <TransactionDetail name={item.name} date={new Date(item.date)} price={item.price}></TransactionDetail>          
            }}
        )}
        </div>
    )   
}

export default TransactionDetailBox;