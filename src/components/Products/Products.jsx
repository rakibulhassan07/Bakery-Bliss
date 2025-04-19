import React from 'react';
import Card from "./Card";

const Products = () => {
    // Sample product data - replace with your actual data source
    const products = [
        { id: 1, name: "Chocolate Croissant", description: "Buttery, flaky pastry filled with rich chocolate", price: "4.99" },
        { id: 2, name: "French Baguette", description: "Traditional crusty French bread, perfect for sandwiches", price: "3.99" },
        { id: 3, name: "Cinnamon Roll", description: "Soft, sweet roll with cinnamon swirl and cream cheese frosting", price: "3.49" },
        { id: 4, name: "Sourdough Loaf", description: "Artisanal sourdough with a crispy crust and tangy flavor", price: "6.99" },
        { id: 5, name: "Blueberry Muffin", description: "Moist muffin packed with fresh blueberries", price: "2.99" },
        { id: 6, name: "Apple Turnover", description: "Flaky pastry filled with spiced apple filling", price: "3.99" },
        { id: 7, name: "Raspberry Danish", description: "Buttery pastry with raspberry filling and vanilla glaze", price: "4.49" }
    ];

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
                            name={product.name}
                            description={product.description}
                            price={product.price}
                        />
                    ))}
                </div>
            </main> 
        </div>
    );
};

export default Products;