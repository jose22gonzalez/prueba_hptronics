import React from 'react'
import CartItem from './CarItem'

const ShoppingCart = ({ cartItems, setCartItems }) => {

    const updateQuantity = (id, quantity) => {
        setCartItems((prevItems) =>
            prevItems.map((item) =>
                item.id === id ? { ...item, quantity: Math.max(1, quantity) } : item
            )
        );
    };

    const removeItem = (id) => {
        setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
    };

    const calculateSubtotal = () => {
        return cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    };

    const shippingCost = 4.99;

    const handleCheckout = async () => {
        const date = new Date();
        const formattedDate = date.getFullYear() + '-' +
            String(date.getMonth() + 1).padStart(2, '0') + '-' +
            String(date.getDate()).padStart(2, '0') + ' ' +
            String(date.getHours()).padStart(2, '0') + ':' +
            String(date.getMinutes()).padStart(2, '0') + ':' +
            String(date.getSeconds()).padStart(2, '0');
        const order = {
            date: formattedDate,
            total: calculateSubtotal() + shippingCost,
            items: cartItems.map(item => ({
                code: item.id,
                quantity: item.quantity,
                price: item.price
            }))
        };

        console.log(order)


        try {
            const response = await fetch('http://localhost:5000/checkout', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(order),
            });

            if (response.ok) {

                setCartItems([]);
                alert('Compra realizada con éxito');
            } else {
                alert('Error al realizar la compra');
            }
        } catch (error) {
            console.error('Error al realizar la compra:', error);
            alert('Error al realizar la compra');
        }
    };

    return (
        <div className="h-full bg-gray-100 pt-20">
            <h1 className="mb-10 text-center text-2xl font-bold">Shopping Cart</h1>
            <div className="mx-auto max-w-5xl justify-center px-6 md:flex md:space-x-6 xl:px-0">
                <div className="rounded-lg md:w-2/3">
                    {cartItems.map((item) => (
                        <CartItem
                            key={item.id}
                            product={item}
                            onUpdateQuantity={updateQuantity}
                            onRemoveItem={removeItem}
                        />
                    ))}
                </div>

                <div className="mt-6 h-full rounded-lg border bg-white p-6 shadow-md md:mt-0 md:w-1/3">
                    <div className="mb-2 flex justify-between">
                        <p className="text-gray-700">Subtotal</p>
                        <p className="text-gray-700">{calculateSubtotal().toFixed(2)} $</p>
                    </div>
                    <div className="flex justify-between">
                        <p className="text-gray-700">Shipping</p>
                        <p className="text-gray-700">{shippingCost.toFixed(2)} $</p>
                    </div>
                    <hr className="my-4" />
                    <div className="flex justify-between">
                        <p className="text-lg font-bold">Total</p>
                        <div>
                            <p className="mb-1 text-lg font-bold">
                                {(calculateSubtotal() + shippingCost).toFixed(2)} $
                            </p>
                        </div>
                    </div>
                    <button
                        onClick={handleCheckout}
                        className="mt-6 w-full rounded-md bg-blue-500 py-1.5 font-medium text-blue-50 hover:bg-blue-600"
                    >
                        Check out
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ShoppingCart;
