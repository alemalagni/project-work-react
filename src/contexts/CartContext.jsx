import React, { createContext, useContext, useState } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);

const addToCart = (item) => {
  setCartItems(prevItems => {
    // usa slug invece di id come identificatore
    const existing = prevItems.find(i => i.slug === item.slug);
    if (existing) {
      return prevItems.map(i =>
        i.slug === item.slug ? { ...i, quantity: i.quantity + 1 } : i
      );
    }
    return [...prevItems, { ...item, quantity: 1 }];
  });
};


  const removeFromCart = (id) => {
    setCartItems(prevItems => prevItems.filter(i => i.id !== id));
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}
