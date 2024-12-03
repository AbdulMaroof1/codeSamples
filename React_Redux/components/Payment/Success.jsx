import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';


const Success = () => {
    const location = useLocation();
    const navigate = useNavigate();


  return (
    <div>Success</div>
  )
}

export default Success