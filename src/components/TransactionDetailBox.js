import React from 'react';
import TransactionDetail from './TransactionDetail';
import '../styles/TransactionDetailBox.css';

var trans = [
    {
        "name": "Irving's Bagels",
        "date": new Date('2021-08-03'),
        "price": 43.23
    },
    {
        "name": "McLanahan's",
        "date": new Date('2021-09-09'),
        "price": 22.43
    },
    {
        "name": "Champ's",
        "date": new Date('2021-10-30'),
        "price": 59.33
    },
    {
        "name": "Irving's Bagels",
        "date": new Date('2021-08-03'),
        "price": 43.23
    },
    {
        "name": "McLanahan's",
        "date": new Date('2021-09-09'),
        "price": 22.43
    },
    {
        "name": "Champ's",
        "date": new Date('2021-10-30'),
        "price": 59.33
    },
    {
        "name": "Irving's Bagels",
        "date": new Date('2021-08-03'),
        "price": 43.23
    },
    {
        "name": "McLanahan's",
        "date": new Date('2021-09-09'),
        "price": 22.43
    },
    {
        "name": "Champ's",
        "date": new Date('2021-10-30'),
        "price": 59.33
    },
    {
        "name": "McLanahan's",
        "date": new Date('2020-09-09'),
        "price": 22.43
    },
    {
        "name": "Champ's",
        "date": new Date('2020-10-30'),
        "price": 59.33
    },
];

export const getTransactionData = () => {
    return trans;
}

const TransactionDetailBox = (props) => {

    return (
        <div id="details-wrapper">
            {trans.map(function(item) {
            if (props.start < item.date && props.end > item.date) {
                return <TransactionDetail name={item.name} date={item.date} price={item.price}></TransactionDetail>          
            }}    
        )}
        </div>
    )   
}

export default TransactionDetailBox;