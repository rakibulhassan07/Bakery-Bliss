import React from 'react';

import { Outlet } from 'react-router-dom';
import Sidebar from '../Deshboard/Sidebar/Sidebar';

const DashboardLayout = () => {
    return (
        <div className="flex min-h-screen ">
            {/* Sidebar */}
            <div className="w-64 bg-white shadow-lg">
                <Sidebar />
            </div>
            
            {/* Main Content */}
            <div className="flex-1">
                <div className="p-8">
                    <Outlet />
                </div>
            </div>
        </div>
    );
};

export default DashboardLayout;