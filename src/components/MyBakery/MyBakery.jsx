import React, { useContext, useState } from "react";
import {
  Search,
  Plus,
  Edit,
  Trash2,
  Filter,
  ChevronDown,
  Package,
  Slice,
  Coffee,
  CakeSlice,
} from "lucide-react";
import { FaCloudUploadAlt } from "react-icons/fa";
import { AuthContext } from "../../provider/AuthProvider";
import useUsers from "../Hook/useUsers";
import { useForm } from "react-hook-form";
import { TbFidgetSpinner } from "react-icons/tb";
import { Link } from "react-router-dom";

const MyBakery = () => {
  const [activeTab, setActiveTab] = useState("all");
  
  // Sample inventory data
  const [inventory, setInventory] = useState([
    {
      id: 1,
      name: "French Baguette",
      category: "bread",
      quantity: 24,
      price: 3.5,
      status: "In Stock",
      image: "https://via.placeholder.com/80",
    },
    {
      id: 2,
      name: "Chocolate Croissant",
      category: "pastry",
      quantity: 18,
      price: 2.75,
      status: "Low Stock",
      image: "https://via.placeholder.com/80",
    },
    {
      id: 3,
      name: "Birthday Cake",
      category: "cake",
      quantity: 5,
      price: 28.99,
      status: "In Stock",
      image: "https://via.placeholder.com/80",
    },
    {
      id: 4,
      name: "Cinnamon Roll",
      category: "pastry",
      quantity: 12,
      price: 3.25,
      status: "In Stock",
      image: "https://via.placeholder.com/80",
    },
    {
      id: 5,
      name: "Sourdough Bread",
      category: "bread",
      quantity: 8,
      price: 5.5,
      status: "Low Stock",
      image: "https://via.placeholder.com/80",
    },
    {
      id: 6,
      name: "Espresso Coffee",
      category: "beverage",
      quantity: 40,
      price: 2.5,
      status: "In Stock",
      image: "https://via.placeholder.com/80",
    },
  ]);

  // Filter items based on active tab
  const filteredItems =
    activeTab === "all"
      ? inventory
      : inventory.filter((item) => item.category === activeTab);

  const getCategoryIcon = (category) => {
    switch (category) {
      case "bread":
        return <Slice className="w-5 h-5 text-amber-600" />;
      case "pastry":
        return <CakeSlice className="w-5 h-5 text-pink-500" />;
      case "cake":
        return <CakeSlice className="w-5 h-5 text-red-500" />;
      case "beverage":
        return <Coffee className="w-5 h-5 text-brown-500" />;
      default:
        return <Package className="w-5 h-5 text-gray-500" />;
    }
  };

  const getStatusBadge = (status) => {
    const badges = {
      "In Stock": "bg-green-100 text-green-800",
      "Out of Stock": "bg-red-100 text-red-800",
    };

    return (
      <span
        className={`px-2 py-1 rounded-full text-xs font-medium ${
          badges[status] || "bg-gray-100 text-gray-800"
        }`}
      >
        {status}
      </span>
    );
  };

  const handleAddItem = (e) => {
    e.preventDefault();
    // Add item logic would go here
    setShowAddForm(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-amber-50 to-amber-100 py-8">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="bg-white rounded-xl shadow-xl p-6 mb-8">
          <h1 className="text-3xl font-bold text-amber-800 text-center mb-2">
            My Bakery Inventory
          </h1>
          <p className="text-center text-amber-600 mb-6">
            Manage your bakery products and ingredients
          </p>

          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex space-x-3 w-full md:w-auto">
              <Link
                to='/addproduct'
                className="flex items-center justify-center px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors"
              >
                <Plus className="w-5 h-5 mr-2" />
                Add New Item
              </Link>
            </div>
          </div>
        </div>

        {/* Category Tabs */}
        <div className="flex overflow-x-auto mb-6 bg-white p-2 rounded-lg shadow-md">
          {["all", "bread", "pastry", "cake", "beverage"].map((tab) => (
            <button
              key={tab}
              className={`px-6 py-2 mx-1 rounded-lg font-medium whitespace-nowrap ${
                activeTab === tab
                  ? "bg-amber-600 text-white shadow-md"
                  : "text-amber-800 hover:bg-amber-100"
              }`}
              onClick={() => setActiveTab(tab)}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        {/* Inventory List */}
        <div className="bg-white rounded-xl shadow-xl p-6">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-amber-200">
              <thead>
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-amber-800 uppercase tracking-wider">
                    Item
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-amber-800 uppercase tracking-wider">
                    Category
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-amber-800 uppercase tracking-wider">
                    Quantity
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-amber-800 uppercase tracking-wider">
                    Price
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-amber-800 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-amber-800 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-amber-100">
                {filteredItems.map((item) => (
                  <tr key={item.id} className="hover:bg-amber-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="h-12 w-12 flex-shrink-0 rounded-md overflow-hidden mr-4">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="h-full w-full object-cover"
                          />
                        </div>
                        <div>
                          <div className="font-medium text-amber-900">
                            {item.name}
                          </div>
                          <div className="text-sm text-amber-500">
                            #{item.id}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        {getCategoryIcon(item.category)}
                        <span className="ml-2 text-amber-800 capitalize">
                          {item.category}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                      {item.quantity} units
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                      ${item.price.toFixed(2)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {getStatusBadge(item.status)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-2">
                        <button className="p-1 bg-blue-100 text-blue-600 rounded hover:bg-blue-200">
                          <Edit className="w-4 h-4" />
                        </button>
                        <button className="p-1 bg-red-100 text-red-600 rounded hover:bg-red-200">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Empty state */}
          {filteredItems.length === 0 && (
            <div className="text-center py-12">
              <Package className="w-16 h-16 text-amber-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-amber-800">
                No items found
              </h3>
              <p className="text-amber-600 mt-1">
                Try changing your filters or add new items
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Add Item Modal */}
  
    </div>
  );
};

export default MyBakery;
