import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { Doughnut } from 'react-chartjs-2';
import BudgetDropdown from '../components/BudgetDropdown.js';
import '../styles/Budget.css';
import "react-grid-layout/css/styles.css"
import "react-resizable/css/styles.css"
import GridLayout from 'react-grid-layout'


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
  
  const [foodTotal, setFoodTotal] = useState(0);
  const [rentTotal, setRentTotal] = useState(0);
  const [loanTotal, setLoanTotal] = useState(0);
  const [entTotal, setEntTotal] = useState(0);
  const [utilTotal, setUtilTotal] = useState(0);
  const [carTotal, setCarTotal] = useState(0);
  const [otherTotal, setOtherTotal] = useState(0);
  var doughnut = useRef();
  const doughnutData = {
    labels: ['Food', 'Rent', 'Entertainment', 'Utilities', 'Loans', 'Car', 'Other'],
      datasets: [
        {
          label: 'Total',
          data: [foodTotal, rentTotal, entTotal, utilTotal, loanTotal, carTotal, otherTotal],
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)',
            'rgba(250, 112, 255, 0.2)',
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)',
            'rgba(250, 112, 255, 1)',
          ],
          borderWidth: 1,
        },
      ],
    };
  
  const doughnutOptions = {
    plugins: {
      labels: {
        render: "value"
      }
    }
    
  }  
  
  useEffect(() => {
    axios.get(`/budgets`)
    .then(res => {
      setGrocery(res.data[0]['grocery store']);
      setFastFood(res.data[0]['fast food']);
      setBar(res.data[0]['bar']);
      setRent(res.data[0]['payment']);
      setRentInsurance(res.data[0]["renter's insurance"]);
      setTv(res.data[0]['TV Subscriptions']);
      setEvents(res.data[0]['Live Events']);
      setOtherEnt(res.data[0]['Other']);
      setGasUtils(res.data[0]['Gas']);
      setWater(res.data[0]['water']);
      setElectricity(res.data[0]['Electricity']);
      setCarIns(res.data[0]['insurance']);
      setCarGas(res.data[0]['gas']);
      setCarRepairs(res.data[0]['repairs']);
      setMortgage(res.data[0]['mortgage']);
      setStudentLoans(res.data[0]['Student Loans']);
      setCarLoan(res.data[0]['car']);
      setHealth(res.data[0]['Health Insurance']);
      setChildren(res.data[0]["Children's Needs"]);
      setClothes(res.data[0]['Clothes']);
      setId(res.data[0]._id);
    })
  }, [])

  useEffect(() => {
    let temp = [
      {
        "food": 
        {
          "grocery store": grocery,
          "fast food": fastfood,
          "bar": bar
        }
      },
      {
        "rent":
        { 
          "payment": rent,
          "renter's insurance": rentinsurance,
        }
      },
      {
        "entertainment":
        {
          "TV Subscriptions": tv,
          "Live Events": events,
          "Other": otherentertainment
        }
      },
      {
        "utilities":
        {
          "Gas": gasutils,
          "water": water,
          "Electricity": electricity,
        }
      },
      {
        "car":
        {
          "insurance": carinsurance,
          "gas": cargas,
          "repairs": carrepairs
        }
      },
      {
        "loans":
        {
          "mortgage": mortgage,
          "Student Loans": studentloans,
          "car": carloan,
        }
      },
      {
        "other":
        {
          "Health Insurance": health,
          "Children's Needs": children,
          "Clothes": clothes
        }
      }];
      setCategories(temp);
      setFoodTotal(parseFloat(grocery) + parseFloat(fastfood) + parseFloat(bar));
      setRentTotal(parseFloat(rent) + parseFloat(rentinsurance));
      setEntTotal(parseFloat(tv) + parseFloat(events) + parseFloat(otherentertainment));
      setUtilTotal(parseFloat(gasutils) + parseFloat(water) + parseFloat(electricity));
      setCarTotal(parseFloat(carinsurance) + parseFloat(cargas) + parseFloat(carrepairs));
      setLoanTotal(parseFloat(mortgage) + parseFloat(studentloans) + parseFloat(carloan));
      setOtherTotal(parseFloat(health) + parseFloat(children) + parseFloat(clothes));
  }, [grocery, fastfood, bar, rent, rentinsurance, tv, events, otherentertainment, gasutils, water, electricity, carinsurance, cargas, carrepairs, mortgage, studentloans, carloan,health, children, clothes])

  const saveBudget = () => {
    axios.put(`/budgets/${id}`, 
    { 
      grocery: grocery,
      fastfood: parseFloat(fastfood),
      bar: parseFloat(bar),
      rent: parseFloat(rent),
      rentinsurance: parseFloat(rentinsurance),
      tv: parseFloat(tv),
      events: parseFloat(events),
      otherentertainment: parseFloat(otherentertainment),
      gasutils: parseFloat(gasutils),
      water: parseFloat(water),
      electricity: parseFloat(electricity),
      carinsurance: parseFloat(carinsurance),
      cargas: parseFloat(cargas),
      carrepairs: parseFloat(carrepairs),
      mortgage: parseFloat(mortgage),
      studentloans: parseFloat(studentloans),
      carloan: parseFloat(carloan),
      health: parseFloat(health),
      children: parseFloat(children),
      clothes: parseFloat(clothes)
    });
  }

  return (
    <GridLayout className="layout" cols={12} rowHeight={30} width={1500}>
      <div key="a" data-grid={{x: 5, y: 0, w: 4, h: 0, static: true}}>
        <div className ="title">
          <h1>Monthly Budget</h1>
        </div>
      </div>
      <div key="b" data-grid={{x: 2, y: 2.5, w: 4, h: 3, static: true}}>
        <div className="drop-down">
          {categories.map((category, i) => {
            return <BudgetDropdown setters={setters[i]} values={subcategories[i]} category={category} subcategories={category[`${Object.keys(category)[0]}`]} key={Object.keys(category)[0]}></BudgetDropdown>
          })}
        </div>
        <button className={'sfa-button top-margin'} onClick={saveBudget}>Save Budget</button>
      </div>
      <div key="d" data-grid={{x: 6, y: 1, w: 4, h: 3, static: true}}>
        <div>
          <Doughnut options={doughnutOptions} data={doughnutData} ref={doughnut} />
        </div>
      </div>
    
    </GridLayout>
    
    
  );
}

export default Budget;
