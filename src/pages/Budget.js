import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { Doughnut } from 'react-chartjs-2';
import BudgetDropdown from '../components/BudgetDropdown.js';
import '../styles/Budget.css';

function Budget() {
  const [categories, setCategories] = useState([]);
  const [id, setId] = useState();
  const [grocery, setGrocery] = useState(0);
  const [fastfood, setFastFood] = useState(0);
  const [bar, setBar] = useState(0);
  const [rent, setRent] = useState(0);
  const [rentinsurance, setRentInsurance] = useState(0);
  const [tv, setTv] = useState(0);
  const [events, setEvents] = useState(0);
  const [otherentertainment, setOtherEnt] = useState(0);
  const [gasutils, setGasUtils] = useState(0);
  const [water, setWater] = useState(0);
  const [electricity, setElectricity] = useState(0);
  const [carinsurance, setCarIns] = useState(0);
  const [cargas, setCarGas] = useState(0);
  const [carrepairs, setCarRepairs] = useState(0);
  const [mortgage, setMortgage] = useState(0);
  const [studentloans, setStudentLoans] = useState(0);
  const [carloan, setCarLoan] = useState(0);
  const [health, setHealth] = useState(0);
  const [children, setChildren] = useState(0);
  const [clothes, setClothes] = useState(0);
  const [subcategories, setSubcategories] = useState([[grocery, fastfood, bar],[rent, rentinsurance],[tv, events, otherentertainment],[gasutils, water, electricity],[carinsurance,cargas,carrepairs],[mortgage, studentloans, carloan], [health, children, clothes]]);
  const [setters, setSetters] = useState([[setGrocery, setFastFood, setBar], [setRent, setRentInsurance],[setTv, setEvents, setOtherEnt], [setGasUtils, setWater, setElectricity], [setCarIns, setCarGas, setCarRepairs], [setMortgage, setStudentLoans, setCarLoan], [setHealth, setChildren, setClothes]]);
  var doughnut = useRef();
  const doughnutData = {
    labels: ['Food', 'Rent', 'Entertainment', 'Utilities', 'Loans', 'Gas'],
      datasets: [
        {
          label: 'Total',
          data: [0, 1450, 45, 120, 600, 115],
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
    axios.get(`/budgets`)
    .then(res => {
      setCategories(res.data[0].categories);
      setId(res.data[0]._id);
    })
  }, [])

  useEffect(() => {
    categories.map((category, i) => {
      subcategories[i].map((subcategory, j) => {
        setters[i][j](subcategories[i][j]);
      });
    });
  }, [categories]);

  const saveBudget = () => {
    axios.put(`/budgets/${id}`, 
    { 
      food: {
        grocery: grocery,
        fastfood: fastfood,
        bar: bar,
      },
      rent:
      {
          rent: rent,
          rentinsurance: rentinsurance
      },
      entertainment:
      {
          tv: tv,
          events: events,
          otherentertainment: otherentertainment
      },
      utilities:
      {
          gasutils: gasutils,
          water: water,
          electricity: electricity
      },
      car:
      {
          carinsurance: carinsurance,
          cargas: cargas,
          carrepairs: carrepairs
      },
      loans:
      {
          mortgage: mortgage,
          studentloans: studentloans,
          carloan: carloan
      },
      other:
      {
          health: health,
          children: children,
          clothes: clothes
      }
    });
  }

  return (
    <div className="title">
      <h2>Budget</h2>
      <div className="drop-down">
        {categories.map((category, i) => {
          let mainCategory = '';
          if (Object.getOwnPropertyNames(category)[0] === "_id") {
            mainCategory = Object.getOwnPropertyNames(category)[1]
          } else {
            mainCategory = Object.getOwnPropertyNames(category)[0];
          }
          return <BudgetDropdown setters={setters[i]} values={subcategories[i]} category={mainCategory} subcategories={category[mainCategory]} key={mainCategory}></BudgetDropdown>
        })}
      </div>
      <button>Save Budget</button>
      <div>
        <Doughnut data={doughnutData} ref={doughnut} />
      </div>
    </div>
    
    
  );
}

export default Budget;
