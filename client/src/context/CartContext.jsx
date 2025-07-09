import React, { createContext, useState, useContext } from "react";

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (product, quantity) => {
    setCartItems(prev => {
      const existingItem = prev.find(item => item.id === product._id);
      if (existingItem) {
        // If already in cart, increase quantity
        return prev.map(item =>
          item.id === product._id
            ? { ...item, quantity: item.quantity + quantity }

            : item
        );
      } else {
        // Else, add new item
        return [...prev, { id: product._id, product, quantity }];
      }
    });
  };

  const removeFromCart = (id) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  const clearCart = () => setCartItems([]);

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};
