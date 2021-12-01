import React from 'react';
import WhatIfButton from '../components/WhatIfButton.js';

function WhatIf() {

  return (
    <div>
        <h2>Choose your What-If Scenario</h2>
        <WhatIfButton title="What if I pay a certain amount each month?" type="each-month"></WhatIfButton>
        <WhatIfButton title="What if I pay a lump sum amount right now?" type="lump-sum"></WhatIfButton>
        <WhatIfButton title="What if I want to pay off a loan in a certain amount of time?" type="by-time"></WhatIfButton>
        <WhatIfButton title="What if I need to pay off less than normal this month?" type="less-than"></WhatIfButton>
    </div>
    
    
  );
}

export default WhatIf;
