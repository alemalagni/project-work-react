// src/components/AddToCartButton.js (Nessuna modifica necessaria)
import { useCart } from '../contexts/CartContext'; // Assicurati che il percorso sia corretto
import React, { useState } from 'react';

function AddToCartButton({ manga }) {
  const { addToCart } = useCart();

  const [clicked, setClicked] = useState(false);
  const handleClick = () => {

    setClicked(true);

    setTimeout(() => setClicked(false), 200);
  };

  return (
    <button
      className={`btn btn-warning text-primary-emphasis mt-1 fade-button ${clicked ? "clicked" : ""}`}
      onClick={() => {
        addToCart(manga); // 'manga' deve avere una proprietà 'slug'
        handleClick();
      }}
    >
      <i className="fas fa-shopping-cart me-2"></i>Aggiungi al carrello
    </button >
  );
}

export default AddToCartButton;