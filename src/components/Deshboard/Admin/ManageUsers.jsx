import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import useUsers from '../../Hook/useUsers';


const ManageUsers = () => {
    const [users, setUsers] = useUsers();
    const [loading, setLoading] = useState(false);

    // Filter out admin users
    const filteredUsers = users.filter(user => user.role !== 'admin');

    const handleRoleUpdateAdmin = async (userId, newRole) => {
        setLoading(true);
        try {
            const response = await fetch('http://localhost/BuyBuddiesBackend/api/index.php/users/update-role', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    userId: userId,
                    role: newRole
                })
            });

            const data = await response.json();
            
            if (response.ok) {
                // Update local state to reflect the change
                setUsers(users.map(u => 
                    u.id === userId ? {...u, role: newRole } : u
                ));
                
                toast.success('User role updated successfully!');
            } else {
                toast.error(data.error || 'Failed to update user role');
            }
        } catch (error) {
            toast.error('Error updating user role');
            console.error('Error:', error);
        } finally {
            setLoading(false);
        }
    };
    
    const getRoleActions = (userData) => {
        switch (userData.role) {
            case 'pending_seller':
                return (
                    <div className="flex gap-2">
                        <button
                            onClick={() => handleRoleUpdateAdmin(userData.id, 'seller')}
                            disabled={loading}
                            className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded"
                        >
                            Approve
                        </button>
                        <button
                            onClick={() => handleRoleUpdateAdmin(userData.id, 'customer')}
                            disabled={loading}
                            className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                        >
                            Reject
                        </button>
                    </div>
                );
            case 'seller':
                return (
                    <button
                        onClick={() => handleRoleUpdateAdmin(userData.id, 'customer')}
                        disabled={loading}
                        className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                    >
                        Remove Seller
                    </button>
                );
            default:
                return null;
        }
    };

    const roleSet = (role) => {
        switch (role) {
            case 'pending_seller':
                return <span className="text-yellow-600 font-medium">Pending Approval</span>;
            case 'seller':
                return <span className="text-green-500 font-medium">Verified Seller</span>;
            case 'customer':
                return <span className="text-blue-600 font-medium">Customer</span>;
            default:
                return <span className="text-gray-600 font-medium">{role}</span>;
        }
    };

    return (
        <div className="max-w-[80%] mx-auto">
            <ToastContainer position="top-center" autoClose={3000} />
            
            <div className="shadow-md rounded-lg overflow-hidden my-6">
                <table className="min-w-full divide-y">
                    <thead className="bg-[linear-gradient(90deg,_#e7ffd9_0%,_#d9d3ff_100%)]">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Email
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Name
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Role
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Status
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredUsers.map((userData) => (
                            <tr key={userData.id}>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    {userData.email}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    {userData.name}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    {userData.role}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    {roleSet(userData.role)}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    {getRoleActions(userData)}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ManageUsers;