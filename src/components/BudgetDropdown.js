import React from 'react';
import { Dropdown } from 'react-bootstrap';

const BudgetDropdown = (props) => {

    const capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
      }

    return (
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
    )   
}

export default BudgetDropdown;