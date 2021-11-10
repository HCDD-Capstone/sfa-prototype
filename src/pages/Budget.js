import React, { useEffect, useState } from 'react';
import axios from 'axios';
import BudgetDropdown from '../components/BudgetDropdown.js';

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
    <div>
      <h2>Budget</h2>
      <div>
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
      <div>Doughnut Graph on the Right here</div>
    </div>
    
    
  );
}

export default Budget;
