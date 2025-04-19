import React from 'react';
import Header from '../Header/Header';
import { Outlet } from 'react-router-dom';
import Footer from '../CustomerOrder/Footer/Footer';

const Root = () => {
    return (
        <div >
            <Header></Header>
            <div className='mx-auto'><Outlet></Outlet></div>
            <Footer></Footer>
            
        </div>
    );
};

export default Root;