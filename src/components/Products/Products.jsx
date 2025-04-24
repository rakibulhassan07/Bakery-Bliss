import React from 'react';
import Card from "./Card";
import useProducts from '../Hook/useProducts';

const Products = () => {
    // Sample product data - replace with your actual data source
    const [products] = useProducts();

    return (
        <div className="min-h-screen bg-gradient-to-b from-[#f8e8d4] to-[#efdec1]">
            
            {/* Products Section */}
            <main className="container mx-auto px-4 max-w-6xl py-12">
                <div className="text-center mb-12">
                    <h2 className="text-4xl font-bold text-amber-900 mb-4">Our Products</h2>
                    <p className="text-amber-700">Discover our freshly baked treats</p>
                </div>

                {/* Products Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {products.map((product) => (
                        <Card 
                            key={product.id}
                           product={product}
                        />
                    ))}
                </div>
            </main> 
        </div>
    );
};

export default Products;