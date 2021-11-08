import React from 'react';
import BudgetDropdown from '../components/BudgetDropdown.js';
import '../styles/Budget.css';

const categories = ["food", "rent", "entertainment", "utilities", "car", "loans", "other"];

const subcategories = [
  {
    "grocery store": 0, 
    "fast food": 0, 
    "bar": 0
  },
  {
    "payment": 0,
    "renter's insurance": 0
  },
  {
    "TV Subscriptions": 0,
    "Live Events": 0,
    "Other": 0
  },
  {
    "Gas": 0,
    "water": 0,
    "Electricity": 0
  },
  {
    "insurance": 0,
    "gas": 0,
    "repairs": 0
  },
  {
    "home": 0,
    "Student Loans": 0,
    "car": 0
  },
  {
    "Health Insurance": 0,
    "Children's Needs": 0,
    "Clothes": 0
  }
];

function Budget() {

  return (
    <div className="title">
      <h2>Budget</h2>
      <div className="drop-down">
        {categories.map((category, i) => {
          return <BudgetDropdown category={category} subcategories={subcategories[i]} key={category}></BudgetDropdown>
        })}
      </div>
      <div className="graph">Doughnut Graph on the Right here</div>
    </div>
    
    
  );
}

export default Budget;
