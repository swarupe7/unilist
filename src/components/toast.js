
import React, { useState } from 'react';

import Row from 'react-bootstrap/Row';
import Toast from 'react-bootstrap/Toast';

const InfoToast = ({highestCount,lowestCount}) => {
    const [showA, setShowA] = useState(true);
    
  
    const toggleShowA = () => setShowA(!showA);
   

  return (
    <Row >
     
        <Toast show={showA} onClose={toggleShowA}>
          <Toast.Header>
            <img
              src="holder.js/20x20?text=%20"
              className="rounded me-2"
              alt=""
            />
            <strong className="me-auto">STATSTICS</strong>
            
          </Toast.Header>
          <Toast.Body>         
          Lowest NO of universities: {lowestCount.count} in {lowestCount.country} , {"         "}
          Highest NO of universities: {highestCount.count} in {highestCount.country}
          </Toast.Body>
        </Toast>
      
      
    </Row>
  )
}

export default InfoToast;