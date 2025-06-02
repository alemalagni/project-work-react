import { useCart } from '../contexts/CartContext';

function AddToCartButton({ manga }) {
  const { addToCart } = useCart();

  return (
    <button
      className="btn btn-warning text-primary-emphasis mt-1"
      onClick={() => addToCart(manga)}
    >
      <i className="fas fa-shopping-cart me-2"></i>Aggiungi al carrello
    </button>
  );
}

export default AddToCartButton;
