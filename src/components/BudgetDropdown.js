import React from 'react';
import { Dropdown } from 'react-bootstrap';
import '../styles/Budget.css';

const BudgetDropdown = (props) => {

    const capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
      }

    return (
        <Dropdown autoClose="outside">
            <Dropdown.Toggle class="dropmenu" variant="primary">
                {capitalizeFirstLetter(Object.keys(props.category)[0])}
            </Dropdown.Toggle>
            <Dropdown.Menu>
                {Object.keys(props.subcategories).map((subcategory, i) => { 
                    return <Dropdown.Item key={subcategory}><label>{capitalizeFirstLetter(subcategory)}: <div>$<input className='dropinput' name={subcategory} value={props.category[Object.keys(props.category)[0]][subcategory]} onChange={(e) => props.setters[i](e.target.value)}></input></div></label></Dropdown.Item>
                })}
            </Dropdown.Menu>
        </Dropdown>
    )   
}

export default BudgetDropdown;