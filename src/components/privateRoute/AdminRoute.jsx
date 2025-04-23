import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';

import useUsers from '../Hook/useUsers';
import { AuthContext } from '../../provider/AuthProvider';

const AdminRoute = ({children}) => {
    const { user } = useContext(AuthContext);
    const [users] = useUsers();
    const userExist = users.find((userEmail) => userEmail.email === user.email);
    const location =useLocation();
    //console.log(location);
    if(userExist?.role==='admin'){
        return children;
    }
    
    return <Navigate to="/dashboard" state={location.pathname} replace />;
};

export default AdminRoute;