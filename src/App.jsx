import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Products from './Components/Products/Products'
import NavBar from './Components/NavBar/NavBar';
import ShoppingCart from './Components/ShoppingCart/ShoppingCart'

function App() {

  const [ProductList, setProductList] = useState([]);
  const [CategoryList, setCategoryList] = useState([]);
  const [CartShopping, setCartShopping] = useState([]);

  useEffect(() => {
    fetch('https://fakestoreapi.com/products')
      .then(res => res.json())
      .then(json => setProductList(json));

    fetch('https://fakestoreapi.com/products/categories')
      .then(res => res.json())
      .then(json => setCategoryList(json));
  }, []);

  return (
    <Router>

      <header>

        <NavBar />

      </header>

      <main className="bg-gray-100">

        <Routes>

          <Route
            path="/"
            element={
              <Products
                ProductList={ProductList}
                CategoryList={CategoryList}
                cart={CartShopping}
                setCart={setCartShopping}
              />

            }
          />

          <Route
            path="/shoppingCart"
            element={
              <ShoppingCart
                cartItems={CartShopping}
                setCartItems={setCartShopping}
              />
            }
          />

        </Routes>

      </main>

    </Router>
  )
}

export default App
