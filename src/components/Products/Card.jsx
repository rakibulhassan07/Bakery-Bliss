import React from 'react';

const Card = ({ name, description, price, image }) => {
    return (
        <div className="bg-white rounded-xl shadow-lg overflow-hidden transition transform hover:-translate-y-1 hover:shadow-xl">
            <div className="h-48 bg-amber-100 relative overflow-hidden">
                {/* If you have images, replace this div with: */}
                {/* <img src={image} alt={name} className="w-full h-full object-cover" /> */}
                
                {/* Placeholder bakery icon */}
                <div className="absolute inset-0 flex items-center justify-center text-5xl text-amber-400">
                    <span role="img" aria-label="Bakery Icon">🍰</span>
                </div>
            </div>
            <div className="p-6">
                <h3 className="text-xl font-bold text-amber-900 mb-2">{name}</h3>
                <p className="text-gray-600 mb-4">{description}</p>
                <div className="flex justify-between items-center">
                    <span className="text-xl font-bold text-amber-700">${price}</span>
                    <button className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600 transition">
                        Add to Cart
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Card;