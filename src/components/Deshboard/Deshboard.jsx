import React, { useContext } from 'react';
import { Store, Clock, BarChart, ShoppingBag, Users} from 'lucide-react';
import { AuthContext } from '../../provider/AuthProvider';
import useUsers from '../Hook/useUsers';
import { NavLink } from 'react-router-dom';

const Dashboard = () => {
    const { user } = useContext(AuthContext);
    const [users] = useUsers();
    // Only find the user if 'user' exists and has an email property
    const userExist = user && user.email ? users.find((userEmail) => userEmail.email === user.email) : null;
    
    const getRoleBadge = (role) => {
        const badges = {
            admin: "bg-amber-100 text-amber-800 border-amber-200",
            seller: "bg-green-100 text-green-800 border-green-200",
            pending_seller: "bg-yellow-100 text-yellow-800 border-yellow-200",
            pending_admin: "bg-orange-100 text-orange-800 border-orange-200",
            customer: "bg-blue-100 text-blue-800 border-blue-200"
        };

        const roleLabels = {
            admin: "Admin",
            seller: "Seller",
            pending_seller: "Pending Seller Approval",
            pending_admin: "Pending Admin Approval",
            customer: "Customer"
        };

        return (
            <div className={`px-4 py-2 rounded-full border ${badges[role] || badges.customer}`}>
                {roleLabels[role] || "Customer"}
            </div>
        );
    };

    // Dashboard card component for reusability
    const DashboardCard = ({ icon, title, value, color }) => (
        <div className="bg-white rounded-lg shadow-md p-6 flex items-center space-x-4 hover:shadow-lg transition-shadow">
            <div className={`p-3 rounded-full ${color}`}>
                {icon}
            </div>
            <div>
                <p className="text-gray-500 text-sm">{title}</p>
                <p className="text-xl font-semibold">{value}</p>
            </div>
        </div>
    );

    // If user is not loaded yet, show a loading state
    if (!user) {
        return (
            <div className="min-h-screen bg-gradient-to-r from-amber-50 to-amber-100 py-12 flex items-center justify-center">
                <div className="text-center">
                    <div className="w-16 h-16 border-4 border-amber-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-xl text-amber-800">Loading your bakery dashboard...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-r from-amber-50 to-amber-100 py-8">
            <div className="max-w-6xl mx-auto px-4">
                {/* Header section */}
                <div className="bg-white rounded-xl shadow-xl p-6 mb-8 ">
                    <div className="flex flex-col items-center justify-center text-center">
                        <div className="flex flex-col items-center space-y-4">
                            <div className="relative">
                                <img
                                    className="w-24 h-24 rounded-full object-cover border-4 border-amber-100 shadow-lg"
                                    src={user.photoURL || 'https://via.placeholder.com/128'}
                                    alt="User Profile"
                                />
                                <div className="absolute bottom-0 right-0 bg-green-500 w-5 h-5 rounded-full border-2 border-white"></div>
                            </div>
                            <div className="text-center">
                                <h1 className="text-2xl font-bold text-amber-800">
                                     {user.displayName || 'Baker'}
                                </h1>
                                <p className="font-medium text-amber-800">Email: {user.email}</p>
                                
                                {userExist && (
                                    <div className="mt-2 flex justify-center">
                                        {getRoleBadge(userExist.role)}
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className="mt-6">
                            <NavLink to="/myBakery" className="bg-amber-600 hover:bg-amber-700 text-white px-4 py-2 rounded-lg transition-colors">
                                <Store className="inline-block mr-1 w-4 h-4" /> My Bakery
                            </NavLink>
                        </div>
                    </div>
                </div>

                {/* Dashboard stats - centered */}
                <h2 className="text-2xl font-semibold text-amber-800 mb-4 text-center">Dashboard Overview</h2>
                <div className="flex justify-center mb-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-4xl">
                        <DashboardCard 
                            icon={<ShoppingBag className="w-6 h-6 text-purple-500" />} 
                            title="Total Orders" 
                            value="128" 
                            color="bg-purple-100"
                        />
                        <DashboardCard 
                            icon={<Users className="w-6 h-6 text-blue-500" />} 
                            title="Customers" 
                            value="85" 
                            color="bg-blue-100"
                        />
                        <DashboardCard 
                            icon={<BarChart className="w-6 h-6 text-green-500" />} 
                            title="Revenue" 
                            value="$3,240" 
                            color="bg-green-100"
                        />
                        <DashboardCard 
                            icon={<Clock className="w-6 h-6 text-amber-500" />} 
                            title="Pending Orders" 
                            value="12" 
                            color="bg-amber-100"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;