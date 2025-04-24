import React, { useState } from "react";
import { Link } from "react-router-dom";

const Card = ({ product }) => {
  const [isHovered, setIsHovered] = useState(false);
  const {
    product_photo,
    product_name,
    product_price,
    product_details,
    product_quantity,
    id,
  } = product;

  return (
    <div className="w-64 h-96">
      <div
        className="relative bg-white rounded-lg overflow-hidden h-full flex flex-col shadow-sm transition-all duration-300"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        style={{
          boxShadow: isHovered ? "0 10px 25px rgba(0, 0, 0, 0.1)" : "0 2px 10px rgba(0, 0, 0, 0.05)",
          transform: isHovered ? "translateY(-5px)" : "translateY(0)",
        }}
      >
        {/* Badge for stock */}
        {product_quantity <= 5 && (
          <div className="absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full z-10">
            Only {product_quantity} left
          </div>
        )}

        {/* Image container with gradient overlay on hover */}
        <div className="relative h-40 overflow-hidden">
          <img
            src={product_photo}
            alt={product_name}
            className="w-full h-full object-cover transition-transform duration-500"
            style={{
              transform: isHovered ? "scale(1.05)" : "scale(1)",
            }}
          />
          <div 
            className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 transition-opacity duration-300"
            style={{
              opacity: isHovered ? 1 : 0,
            }}
          />
        </div>

        {/* Content */}
        <div className="p-3 flex flex-col flex-grow">
          <div className="mb-2">
            <h2 className="text-sm font-semibold text-gray-800 line-clamp-2 h-10">
              {product_name}
            </h2>
            <div className="flex items-center justify-between mt-1">
              <p className="text-base font-bold text-gray-800">
                ${product_price}
              </p>
              <p className="text-xs text-gray-500">
                Stock: {product_quantity}
              </p>
            </div>
          </div>

          <p className="text-xs text-gray-600 line-clamp-3 mb-3 flex-grow">
            {product_details}
          </p>

          <div className="mt-auto">
            <Link
              to={`/productDetails/${id}`}
              className="block w-full text-center py-2 bg-gradient-to-r bg-orange-600 text-white text-sm font-medium rounded transition-all duration-300"
            >
              View Details
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;