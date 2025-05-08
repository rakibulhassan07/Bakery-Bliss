import React, { useContext } from 'react';
import { useLocation, Navigate } from 'react-router-dom'; // Added Navigate import
import useUsers from '../Hook/useUsers';
import { AuthContext } from '../../provider/AuthProvider';


const BakerRoute = ({children}) => {
    const { user } = useContext(AuthContext);
    const [users] = useUsers(); //current users login 
    const userExist = users.find((userEmail) => userEmail.email === user.email); //match email with current users 
    const location = useLocation();
    if(userExist?.role === 'seller'){
        return children;
    }

    // Changed the redirect path to root dashboard path
    return <Navigate to="/dashboard" state={location.pathname} replace />;
};

export default  BakerRoute;