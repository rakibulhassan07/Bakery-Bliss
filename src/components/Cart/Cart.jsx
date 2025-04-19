import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaTrash, FaMinus, FaPlus, FaArrowLeft } from "react-icons/fa";
import { MdOutlineBakeryDining } from "react-icons/md";

const Cart = () => {
  // Sample cart items - in a real app, this would come from context/state management
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: "Chocolate Croissant",
      price: 3.99,
      quantity: 2,
      image: "/api/placeholder/100/100",
    },
    {
      id: 2,
      name: "Sourdough Bread",
      price: 5.49,
      quantity: 1,
      image: "/api/placeholder/100/100",
    },
    {
      id: 3,
      name: "Cinnamon Roll",
      price: 4.25,
      quantity: 3,
      image: "/api/placeholder/100/100",
    },
  ]);

  // Calculate subtotal
  const subtotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  // Delivery fee
  const deliveryFee = 2.99;

  // Tax (assuming 8%)
  const tax = subtotal * 0.08;

  // Total
  const total = subtotal + deliveryFee + tax;

  // Update quantity
  const updateQuantity = (id, change) => {
    setCartItems(
      cartItems.map((item) => {
        if (item.id === id) {
          const newQuantity = Math.max(1, item.quantity + change);
          return { ...item, quantity: newQuantity };
        }
        return item;
      })
    );
  };

  // Remove item
  const removeItem = (id) => {
    setCartItems(cartItems.filter((item) => item.id !== id));
  };

  return (
    <div className="bg-[linear-gradient(to_right,_#fff3e0_0%,_#ffe0b2_50%,_#ffcc80_100%)] min-h-screen py-8">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-amber-800 flex items-center gap-2">
            <MdOutlineBakeryDining className="text-amber-700" />
            Your Cart
          </h1>
          <Link
            to="/products"
            className="flex items-center text-amber-700 hover:text-amber-900 transition"
          >
            <FaArrowLeft className="mr-2" />
            Continue Shopping
          </Link>
        </div>

        {cartItems.length === 0 ? (
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <div className="p-4 rounded-full bg-amber-50 border border-amber-300 w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <MdOutlineBakeryDining className="text-amber-700 text-3xl" />
            </div>
            <h2 className="text-2xl font-semibold text-amber-800 mb-4">
              Your cart is empty
            </h2>
            <p className="text-gray-600 mb-6">
              Looks like you haven't added any items to your cart yet.
            </p>
            <Link
              to="/products"
              className="btn bg-gradient-to-r from-amber-600 to-amber-700 text-white hover:from-amber-700 hover:to-amber-800 border-0 shadow-md px-8 py-3 rounded-md"
            >
              Continue Shopping
            </Link>
          </div>
        ) : (
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Cart Items */}
            <div className="lg:w-2/3">
              <div className="bg-white rounded-lg shadow-md p-6 mb-4">
                <div className="flex justify-between border-b pb-3 mb-3 text-amber-800 font-semibold">
                  <h2 className="text-xl">
                    Shopping Cart ({cartItems.length} items)
                  </h2>
                </div>

                {cartItems.map((item) => (
                  <div
                    key={item.id}
                    className="flex flex-col sm:flex-row items-center py-4 border-b last:border-0"
                  >
                    <div className="sm:w-1/4 mb-3 sm:mb-0">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-20 h-20 object-cover rounded-md"
                      />
                    </div>
                    <div className="sm:w-1/4 text-center sm:text-left mb-3 sm:mb-0">
                      <h3 className="text-lg font-medium text-amber-800">
                        {item.name}
                      </h3>
                      <p className="text-gray-500 text-sm">Fresh daily</p>
                    </div>
                    <div className="sm:w-1/4 flex items-center justify-center mb-3 sm:mb-0">
                      <button
                        onClick={() => updateQuantity(item.id, -1)}
                        className="bg-amber-100 text-amber-800 hover:bg-amber-200 rounded-full w-8 h-8 flex items-center justify-center"
                      >
                        <FaMinus size={12} />
                      </button>
                      <span className="mx-3 w-8 text-center">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.id, 1)}
                        className="bg-amber-100 text-amber-800 hover:bg-amber-200 rounded-full w-8 h-8 flex items-center justify-center"
                      >
                        <FaPlus size={12} />
                      </button>
                    </div>
                    <div className="sm:w-1/6 text-center mb-3 sm:mb-0">
                      <p className="font-medium text-amber-800">
                        ${(item.price * item.quantity).toFixed(2)}
                      </p>
                      <p className="text-gray-500 text-xs">
                        ${item.price.toFixed(2)} each
                      </p>
                    </div>
                    <div className="sm:w-1/12 text-right">
                      <button
                        onClick={() => removeItem(item.id)}
                        className="text-amber-600 hover:text-amber-800"
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:w-1/3">
              <div className="bg-white rounded-lg shadow-md p-6 sticky top-6">
                <h2 className="text-xl font-semibold text-amber-800 border-b pb-3 mb-4">
                  Order Summary
                </h2>
                <div className="space-y-3 mb-4">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="font-medium">${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Delivery Fee</span>
                    <span className="font-medium">
                      ${deliveryFee.toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Tax</span>
                    <span className="font-medium">${tax.toFixed(2)}</span>
                  </div>
                  <div className="border-t pt-3 mt-3">
                    <div className="flex justify-between font-semibold text-lg text-amber-800">
                      <span>Total</span>
                      <span>${total.toFixed(2)}</span>
                    </div>
                  </div>
                </div>

                {/* Promo code */}
                <div className="mb-6">
                  <label
                    htmlFor="promo"
                    className="block text-sm font-medium text-gray-600 mb-2"
                  >
                    Promo Code
                  </label>
                  <div className="flex">
                    <input
                      type="text"
                      id="promo"
                      placeholder="Enter promo code"
                      className="flex-grow px-4 py-2 border border-gray-300 rounded-l-md focus:ring-amber-500 focus:border-amber-500"
                    />
                    <button className="bg-amber-100 text-amber-800 hover:bg-amber-200 px-4 py-2 border border-amber-300 rounded-r-md">
                      Apply
                    </button>
                  </div>
                </div>

                {/* Checkout button */}
                <button className="w-full bg-gradient-to-r from-amber-600 to-amber-700 text-white hover:from-amber-700 hover:to-amber-800 border-0 shadow-md py-3 rounded-md font-medium">
                  Proceed to Checkout
                </button>

                {/* Payment methods */}
                <div className="mt-4 text-center">
                  <p className="text-xs text-gray-500 mb-2">We accept:</p>
                  <div className="flex justify-center gap-2">
                    <div className="w-10 h-6">
                      <img
                        className=" w-8"
                        src={`https://i.ibb.co.com/wNBDg03W/1656227753bkash-logo-png-download.png`}
                        alt=""
                      />
                    </div>
                    <div className="w-10 h-6">
                      <img
                        className=" w-8"
                        src={`https://i.ibb.co.com/XkS2mTJ4/1679248828-Nagad-Logo-PNG.png`}
                        alt=""
                      />
                    </div>
                    <div className="w-10 h-6">
                      <img
                        className=" w-8"
                        src={`https://i.ibb.co.com/s4rf7H7/dutch-bangla-rocket-logo-png-seeklogo-317692.png`}
                        alt=""
                      />
                    </div>
                  </div>
                </div>

                {/* Delivery note */}
                <div className="mt-6 bg-amber-50 border border-amber-200 rounded-md p-3">
                  <p className="text-sm text-amber-800">
                    <strong>Delivery Note:</strong> Fresh baked goods will be
                    delivered within 24 hours of your order.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
