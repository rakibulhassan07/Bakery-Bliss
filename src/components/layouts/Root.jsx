import React from 'react';
import Header from '../Header/Header';
import { Outlet } from 'react-router-dom';

const Root = () => {
    return (
        <div >
            <Header></Header>
            <div className='mx-auto'><Outlet></Outlet></div>
            
        </div>
    );
};

export default Root;