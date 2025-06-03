import React, { createContext, useState, useEffect } from "react";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    const stored = localStorage.getItem("cartItems");
    return stored ? JSON.parse(stored) : [];
  });

  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (product) => {
    setCartItems((prevItems) => {
      // Check if product already exists in cart using _id or id
      const itemExists = prevItems.find((item) => 
        (item._id && product._id && item._id === product._id) || 
        (item.id && product.id && item.id === product.id) || 
        (item.title && product.title && item.title === product.title)
      );
      
      if (itemExists) {
        return prevItems.map((item) =>
          (item._id && product._id && item._id === product._id) || 
          (item.id && product.id && item.id === product.id) || 
          (item.title && product.title && item.title === product.title)
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        // Make sure we have a standard product structure
        const standardizedProduct = {
          _id: product._id || product.id || Date.now().toString(),
          title: product.title || product.name || 'Unknown Product',
          price: product.price || 0,
          image: product.image || product.img || null,
          quantity: 1
        };
        return [...prevItems, standardizedProduct];
      }
    });
  };

  const removeFromCart = (itemId) => {
    setCartItems(prevItems => {
      // Find the index of the item to remove
      const itemIndex = prevItems.findIndex(item => item.id === itemId);
      
      if (itemIndex === -1) return prevItems; // Item not found
      
      // Create a new array without the specific item
      const newItems = [...prevItems];
      newItems.splice(itemIndex, 1);
      return newItems;
    });
  };

  const updateQuantity = (id, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(id);
      return;
    }
    
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        (item._id === id) || (item.id === id) || (item.title === id)
          ? { ...item, quantity: newQuantity }
          : item
      )
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const getTotal = () => {
    return cartItems.reduce((acc, item) => {
      let price = 0;
      
      // Handle different price formats
      if (typeof item.price === 'number') {
        price = item.price;
      } else if (typeof item.price === 'string') {
        // Remove non-numeric characters except for decimal point
        price = parseFloat(item.price.replace(/[^\d.]/g, "")) || 0;
      }
      
      return acc + price * item.quantity;
    }, 0);
  };

  const getItemCount = () => {
    return cartItems.reduce((count, item) => count + item.quantity, 0);
  };

  return (
    <CartContext.Provider
      value={{ 
        cartItems, 
        addToCart, 
        removeFromCart, 
        updateQuantity, 
        clearCart, 
        getTotal,
        getItemCount
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
