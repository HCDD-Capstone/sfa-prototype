import React from 'react';

const BudgetDropdown = (props) => {
    
    return (
        <div>
            <div>{props.category}</div>
            <div>
                {props.subcategory.map((item) => {
                    return <div>{item}</div>
                })}
            </div>
        </div>
    )   
}

export default BudgetDropdown;