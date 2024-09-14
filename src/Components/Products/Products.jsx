
import React, { useState } from 'react'

import { useNavigate } from 'react-router-dom'

const Products = ({ ProductList, CategoryList, cart, setCart }) => {

    const [selectedCategory, setSelectedCategory] = useState('') 

    const navigate  = useNavigate()

    const showproductbycategory = (category) => {
        if (!category) {
            return ProductList
        }

        return ProductList.filter(product => product.category === category)
    }

    const handleAddShoppingCart = (product) => {

        const productInCart = cart.find(item => item.id === product.id);

        if (productInCart) {

          setCart(cart.map(item => 
            item.id === product.id 
              ? { ...item, quantity: item.quantity + 1 } 
              : item
          ));
          navigate("/shoppingCart")
        } else {

          setCart([...cart, { ...product, quantity: 1 }]);
          navigate("/shoppingCart")
        }
    }

    return (
        <div className="bg-gray-100 py-10 m-4 w-[60%]">
            <div className="flex flex-row overflow-x-auto space-x-4 mb-6">
                <button
                    className={`capitalize px-4 py-2 rounded-lg font-semibold transition-all ${
                        selectedCategory === ''
                            ? 'bg-blue-500 text-white'
                            : 'bg-gray-200 text-gray-700'
                    }`}
                    onClick={() => setSelectedCategory('')} 
                >
                    All Products
                </button>
                {CategoryList.map((category) => (
                    <button 
                        key={category} 
                        className={`capitalize px-4 py-2 rounded-lg font-semibold transition-all ${
                            selectedCategory === category
                                ? 'bg-blue-500 text-white'
                                : 'bg-gray-200 text-gray-700'
                        }`}
                        onClick={() => setSelectedCategory(category)} 
                    >
                        {category}
                    </button>
                ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {showproductbycategory(selectedCategory).map((product) => (
                    <div key={product.id} className="relative flex flex-col text-gray-700 bg-white shadow-md bg-clip-border rounded-lg w-72">
                        <div className="relative mx-4 mt-4 overflow-hidden text-gray-700 bg-white bg-clip-border rounded-lg h-48">
                            <img
                                src={product.image}
                                alt={product.title} className="object-cover w-full h-full" />
                        </div>
                        <div className="p-4">
                            <div className="flex items-center justify-between mb-2">
                                <p className="block font-sans text-sm antialiased font-medium leading-relaxed text-blue-gray-900">
                                    {product.title.length > 20 ? `${product.title.substring(0, 20)}...` : product.title}
                                </p>
                                <p className="block font-sans text-sm antialiased font-medium leading-relaxed text-blue-gray-900">
                                    ${product.price}
                                </p>
                            </div>
                            <p className="block font-sans text-xs antialiased font-normal leading-normal text-gray-700 opacity-75">
                                {product.description.length > 50 ? `${product.description.substring(0, 50)}...` : product.description}
                            </p>
                        </div>
                        <div className="p-4 pt-0">
                            <button
                            onClick={() => handleAddShoppingCart(product)}
                                className="bg-blue-600 align-middle select-none font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-2 px-4 rounded-lg shadow-gray-900/10 hover:shadow-gray-900/20 focus:opacity-[0.85] active:opacity-[0.85] active:shadow-none block w-full bg-blue-gray-900/10 text-blue-gray-900 shadow-none hover:scale-105 hover:shadow-none focus:scale-105 focus:shadow-none active:scale-100"
                                type="button">
                                Add to Cart
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Products
