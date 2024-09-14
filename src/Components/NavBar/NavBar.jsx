import React from 'react'
import shoppingCarImg from '../../assets/shopping-cart.svg'
import { Link } from 'react-router-dom'
const NavBar = () => {

    return (
        <div className="flex  text-black top-0 py-3 flex-wrap justify-around bg-silver">
            <Link to='/' className="text-lg font-semibold cursor-pointer">Productos</Link>
            <ul className="flex gap-[40px] text-m">
                <li>
                    <Link to="/shoppingCart" className='cursor-pointer'>
                     <img className='w-8 h-8' src={shoppingCarImg} />
                    </Link>
                   
                </li>
            </ul>
        </div>
    )
}

export default NavBar