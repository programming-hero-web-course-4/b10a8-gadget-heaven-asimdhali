import React, { createContext, useState } from "react";
import { Outlet } from "react-router-dom";
import Footer from './../Footer/Footer';
import Navbar from "../Navbar/Navbar";

// Create contexts
export const CartContext = createContext();
export const WishlistContext = createContext();

// Define CartProvider
export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  const addToCart = (item) => {
    setCart((prevCart) => [...prevCart, item]);
  };

  return (
    <CartContext.Provider value={{ cart, setCart, addToCart }}>
      {children}
    </CartContext.Provider>
  );
};

// Define WishlistProvider
export const WishlistProvider = ({ children }) => {
  const [wCart, setWCart] = useState([]);

  const addToWhishList = (item) => {
    setWCart((prevCart) => [...prevCart, item]);
  };

  return (
    <WishlistContext.Provider value={{ wCart, setWCart, addToWhishList }}>
      {children}
    </WishlistContext.Provider>
  );
};

export default function Root() {
  return (
    <WishlistProvider>
      <CartProvider>
        <div>
          <Navbar></Navbar>
          <Outlet></Outlet>
          <Footer></Footer>
        </div>
      </CartProvider>
    </WishlistProvider>
  );
}