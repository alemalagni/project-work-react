import { useEffect, useRef } from 'react';
import { useCart } from '../contexts/CartContext';
import MangaCardOnCart from './MangaCardOnCart';

const CartOffcanvas = ({ isOpen, onClose }) => {
    const offcanvasHtmlRef = useRef(null);
    const bsOffcanvasInstanceRef = useRef(null);
    const { cartItems, removeFromCart } = useCart(); // Prendo cartItems e funzione di rimozione

    // Inizializza l'istanza di Bootstrap Offcanvas
    useEffect(() => {
        if (offcanvasHtmlRef.current && window.bootstrap?.Offcanvas) {
            if (!bsOffcanvasInstanceRef.current) {
                bsOffcanvasInstanceRef.current = new window.bootstrap.Offcanvas(offcanvasHtmlRef.current);
            }
        }
    }, []);

    // Listener per chiusura offcanvas
    useEffect(() => {
        const htmlElement = offcanvasHtmlRef.current;
        const instance = bsOffcanvasInstanceRef.current;

        if (htmlElement && instance) {
            const handleClose = () => onClose();
            htmlElement.addEventListener('hidden.bs.offcanvas', handleClose);
            return () => htmlElement.removeEventListener('hidden.bs.offcanvas', handleClose);
        }
    }, [onClose]);

    // Apri o chiudi il pannello a seconda della prop `isOpen`
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
                                key={item.slug}
                                item={item}
                                onRemove={removeFromCart}
                            />
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
};

export default CartOffcanvas;
