import React from 'react';
import { Dropdown } from 'react-bootstrap';
import '../styles/Budget.css';

const BudgetDropdown = (props) => {

    const capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
      }

    return (
        <div className="menu">
        <Dropdown autoClose="outside">
            <Dropdown.Toggle variant="primary">
                {capitalizeFirstLetter(Object.keys(props.category)[0])}
            </Dropdown.Toggle>
            <Dropdown.Menu>
                {Object.keys(props.subcategories).map((subcategory, i) => { 
                    return <Dropdown.Item key={subcategory}><label>{capitalizeFirstLetter(subcategory)}: $<input name={subcategory} value={props.category[Object.keys(props.category)[0]][subcategory]} onChange={(e) => props.setters[i](e.target.value)}></input></label></Dropdown.Item>
                })}
            </Dropdown.Menu>
        </Dropdown>
        </div>
    )   
}

export default BudgetDropdown;