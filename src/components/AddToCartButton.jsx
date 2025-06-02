// src/components/AddToCartButton.js (Nessuna modifica necessaria)
import { useCart } from '../contexts/CartContext'; // Assicurati che il percorso sia corretto

function AddToCartButton({ manga }) {
  const { addToCart } = useCart();

  return (
    <button
      className="btn btn-warning text-primary-emphasis mt-1"
      onClick={() => addToCart(manga)} // 'manga' deve avere una proprietà 'slug'
    >
      <i className="fas fa-shopping-cart me-2"></i>Aggiungi al carrello
    </button>
  );
}

export default AddToCartButton;