import { useCart } from '../contexts/CartContext';
import { useState } from 'react';


function AddToCartButton({ manga, viewMode, btnLg }) {
  const { addToCart } = useCart();

  const [clicked, setClicked] = useState(false);
  const handleClick = () => {
    setClicked(true);
    setTimeout(() => setClicked(false), 200);
  };

  const buttonClasses = `btn btn-warning text-primary-emphasis mt-1 fade-button ${clicked ? "clicked" : ""} ${viewMode === "list" ? "btn-list-mode" : ""}`;


  return (
    <button
      className={`${buttonClasses} ${btnLg === true ? 'btn-lg px-5 me-4' : ''}`}
      onClick={() => {
        addToCart(manga);
        handleClick();
      }}
    >
      <i className="fas fa-shopping-cart me-2"></i>Aggiungi al carrello
    </button >
  );
}

export default AddToCartButton;