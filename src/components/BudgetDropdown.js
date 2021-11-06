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
                {Object.keys(props.subcategories).map((subcategory) => {
                    return <Dropdown.Item key={subcategory}>{capitalizeFirstLetter(subcategory)}<input value={props.subcategories[subcategory]}></input></Dropdown.Item>
                })}
            </Dropdown.Menu>
        </Dropdown>
    )   
}

export default BudgetDropdown;