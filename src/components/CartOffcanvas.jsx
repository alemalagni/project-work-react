// src/components/CartOffcanvas.js (Verifica questa parte)
import { useEffect, useRef } from 'react';
import { useCart } from '../contexts/CartContext';
import MangaCardOnCart from './MangaCardOnCart'; // Assicurati che il percorso sia corretto

const CartOffcanvas = ({ isOpen, onClose }) => {
    const offcanvasHtmlRef = useRef(null);
    const bsOffcanvasInstanceRef = useRef(null);
    // Rimuovi 'removeFromCart' da qui se MangaCardOnCart lo prende da useCart()
    const { cartItems /*, removeFromCart */ } = useCart();

    // ... resto del codice useEffect per gestire l'istanza offcanvas ...
    // (Il codice esistente per l'inizializzazione e la gestione open/close è corretto)

    useEffect(() => {
        if (offcanvasHtmlRef.current && window.bootstrap?.Offcanvas) {
            if (!bsOffcanvasInstanceRef.current) {
                bsOffcanvasInstanceRef.current = new window.bootstrap.Offcanvas(offcanvasHtmlRef.current);
            }
        }
    }, []);

    useEffect(() => {
        const htmlElement = offcanvasHtmlRef.current;
        const instance = bsOffcanvasInstanceRef.current;

        if (htmlElement && instance) {
            const handleClose = () => onClose();
            htmlElement.addEventListener('hidden.bs.offcanvas', handleClose);
            return () => htmlElement.removeEventListener('hidden.bs.offcanvas', handleClose);
        }
    }, [onClose]);

    useEffect(() => {
        const instance = bsOffcanvasInstanceRef.current;
        if (instance) {
            if (isOpen) instance.show();
            else instance.hide();
        }
    }, [isOpen]);

    return (
        <div
            className="offcanvas offcanvas-end"
            tabIndex="-1"
            id="cartOffcanvas"
            aria-labelledby="cartOffcanvasLabel"
            ref={offcanvasHtmlRef}
        >
            <div className="offcanvas-header">
                <h5 className="offcanvas-title" id="cartOffcanvasLabel">Il tuo carrello</h5>
                <button type="button" className="btn-close" aria-label="Close" onClick={onClose}></button>
            </div>
            <div className="offcanvas-body">
                {cartItems.length === 0 ? (
                    <p>Non hai ancora aggiunto articoli al carrello.</p>
                ) : (
                    <ul className="list-group">
                        {cartItems.map(item => (
                            <MangaCardOnCart
                                key={item.slug} // slug è un'ottima chiave
                                item={item}
                            // Non è più necessario passare onRemove se MangaCardOnCart usa useCart()
                            // onRemove={removeFromCart} // Rimuovi questa riga se MangaCardOnCart usa useCart()
                            />
                        ))}
                    </ul>
                )}
                {/* Potresti voler mostrare il totale qui */}
                {/* {cartItems.length > 0 && (
                    <div className="mt-3">
                        <p>Articoli totali: {totalItemsInCart}</p> // Esempio
                        <h4>Totale Carrello: {cartTotal.toFixed(2)} €</h4> // Esempio
                    </div>
                )} */}
            </div>
        </div>
    );
};

export default CartOffcanvas;