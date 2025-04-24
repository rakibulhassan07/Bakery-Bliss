import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import useProducts from '../Hook/useProducts';
import useUsers from '../Hook/useUsers';
import PurchaseModal from './PurchaseModal';


const ProductDetails = () => {
    const { id } = useParams();
    const [products] = useProducts();
    
    const [users] = useUsers();
    const [isOpen, setIsOpen] = useState(false);
    
    const product = products.find((p) => p.id === id);
    
    if (!product) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="text-center p-6 bg-white rounded-lg shadow">
                    <h2 className="text-xl font-semibold text-gray-700">Product Not Found</h2>
                    <p className="mt-1 text-sm text-gray-500">The product you're looking for doesn't exist.</p>
                </div>
            </div>
        );
    }
    
   // const productReviews = reviews.filter(r => r.product_id === product.id);
    
    const StarRating = ({ rating }) => (
        <div className="flex">
            {[...Array(5)].map((_, i) => (
                <span key={i} className={`text-sm ${i < rating ? 'text-yellow-400' : 'text-gray-300'}`}>★</span>
            ))}
        </div>
    );
    
    return (
        <div className="py-6 px-4 bg-gray-50 min-h-screen">
            <div className="max-w-4xl mx-auto bg-white rounded-lg shadow overflow-hidden">
                <div className="md:flex">
                    <div className="md:w-1/3 relative">
                        <div className="h-48 md:h-full overflow-hidden bg-gray-100">
                            <img src={product.product_photo} className="w-full h-full object-cover" alt={product.product_name} />
                            {product.product_quantity <= 5 && product.product_quantity > 0 && (
                                <div className="absolute top-2 right-2 bg-orange-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                                    Only {product.product_quantity} left!
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="md:w-2/3 p-4 md:p-6">
                        <div className="mb-4">
                            <div className="flex justify-between items-start">
                                <h1 className="text-lg md:text-xl font-bold text-gray-800">{product.product_name}</h1>
                                <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${product.product_quantity > 0 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                                    {product.product_quantity > 0 ? 'In Stock' : 'Out of Stock'}
                                </span>
                            </div>
                            <div className="flex items-center mt-2">
                                <span className="text-xl font-bold text-blue-600">${product.product_price}</span>
                                {product.original_price && <span className="ml-2 text-sm text-gray-400 line-through">${product.original_price}</span>}
                            </div>
                        </div>

                        <div className="mb-4">
                            <h2 className="text-sm font-semibold mb-1 text-gray-700">Product Details</h2>
                            <p className="text-sm text-gray-600">{product.product_details}</p>
                        </div>

                        {product.product_quantity > 0 && (
                            <div className="mb-4">
                                <span className="text-xs font-medium text-gray-600">{product.product_quantity} items in stock</span>
                            </div>
                        )}

                        <button 
                            onClick={() => product.product_quantity > 0 && setIsOpen(true)}
                            className={`w-full py-2.5 rounded-lg font-medium text-sm ${
                                product.product_quantity > 0 
                                    ? 'bg-orange-600 text-white hover:bg-orange-600 transition duration-200' 
                                    : 'bg-gray-400 text-white cursor-not-allowed opacity-70'
                            }`}
                            disabled={product.product_quantity === 0}
                        >
                            {product.product_quantity > 0 ? 'ADD TO CART' : 'OUT OF STOCK'}
                        </button>
                    </div>
                </div>
                
           {/**
            *  <div className="px-4 py-4 bg-gray-50 border-t border-gray-100">
                    <div className="flex justify-between items-center mb-3">
                        <h2 className="text-base font-semibold text-gray-800">Reviews ({productReviews.length})</h2>
                    </div>
                    
                    {productReviews.length === 0 ? (
                        <p className="text-sm text-gray-500 italic">No reviews yet</p>
                    ) : (
                        <div className="grid gap-3">
                            {productReviews.map((review, i) => (
                                <div key={i} className="bg-white  rounded p-3 shadow-sm  border border-gray-100">
                                 
                                        <StarRating rating={review.rating} />
            
                                    <p className="text-xs text-gray-600">{review.comment}</p>
                                </div>
                            ))}
                        </div>
                    )}
               </div>
            * 
            * 
            */}   
            </div>

            <PurchaseModal 
                isOpen={isOpen} 
                setIsOpen={setIsOpen}
                product={product}
            />
        </div>
    );
};

export default ProductDetails;