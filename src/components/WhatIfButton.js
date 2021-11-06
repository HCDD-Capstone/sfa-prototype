import React from 'react';
import { Link } from "react-router-dom";

const WhatIfButton = (props) => {

    return (
        <div>
            <button>
                <Link 
                    to={{
                        pathname: '/scenarios',
                        state: {
                            type: props.type
                        }
                    }}
                >
                    {props.title}
                </Link>
            </button>
        </div>
    )   
}

export default WhatIfButton;