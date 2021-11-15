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
                {capitalizeFirstLetter(props.category)}
            </Dropdown.Toggle>
            <Dropdown.Menu>
                {Object.keys(props.subcategories).map((subcategory, i) => {
                    return <Dropdown.Item key={subcategory}>{capitalizeFirstLetter(subcategory)}: $<input onChange={(value) => props.setters[i](value.target.value)}></input></Dropdown.Item>
                })}
            </Dropdown.Menu>
        </Dropdown>
        </div>
    )   
}

export default BudgetDropdown;