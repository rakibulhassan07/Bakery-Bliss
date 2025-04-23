import React, { useContext } from 'react';

import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../../provider/AuthProvider';

const PrivateRoute = ({children}) => {
    const {user,loading}=useContext(AuthContext);
    const location =useLocation();
    //console.log(location);
    if(loading){
        return (<div className="min-h-screen flex items-center justify-center">
            <span className="loading loading-spinner text-error loading-lg"></span>
          </div>);
    }

    if(user){
        return children;
    }
    return <Navigate state={location.pathname} to="/login"></Navigate>;
        

};

export default PrivateRoute;