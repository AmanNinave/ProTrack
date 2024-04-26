import React from 'react';
import { Navigate } from 'react-router-dom';

function PrivateRoute({ children }) {
    let dta = JSON.parse( localStorage.getItem("userDetails"))  || "";
    return (
        dta != "" ? children : < Navigate to= '/login'/>
    );
}

export default PrivateRoute;