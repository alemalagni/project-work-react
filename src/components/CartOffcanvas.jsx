// src/components/CartOffcanvas.js (o il percorso corretto)
import { useEffect, useRef } from 'react';
import { useCart } from '../contexts/CartContext'; // Assicurati che il percorso sia corretto
import MangaCardOnCart from './MangaCardOnCart'; // Assicurati che il percorso sia corretto
import { Link } from 'react-router-dom';

const CartOffcanvas = ({ isOpen, onClose }) => {
    const offcanvasHtmlRef = useRef(null);
    const bsOffcanvasInstanceRef = useRef(null);
    // Prendi anche cartTotal e totalItemsInCart dal context
    const { cartItems, cartTotal, totalItemsInCart } = useCart();

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

    // Funzione per formattare il prezzo (puoi centralizzarla in un file utils se usata in più posti)
    const formatPrice = (price) => {
        if (typeof price !== 'number') {
            return 'N/A';
        }
        return price.toFixed(2).replace('.', ',') + ' €'; // Formato italiano
    };

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
            {/* Aggiunto d-flex flex-column per gestire lo spazio e posizionare il footer in basso */}
            <div className="offcanvas-body d-flex flex-column">
                {cartItems.length === 0 ? (
                    // Messaggio per carrello vuoto, centrato verticalmente e orizzontalmente
                    <p className="text-center my-auto">Non hai ancora aggiunto articoli al carrello.</p>
                ) : (
                    <>
                        {/* Lista degli articoli con scroll interno se necessario */}
                        <ul className="list-group mb-3" style={{ flexGrow: 1, overflowY: 'auto' }}>
                            {cartItems.map(item => (
                                <MangaCardOnCart
                                    key={item.slug}
                                    item={item}
                                    closeCartOffcanvas={onClose}
                                />
                            ))}
                        </ul>
                        {/* Sezione Totale e Checkout (footer) */}
                        <div className="mt-auto pt-3 border-top">
                            <div className="d-flex justify-content-between align-items-center mb-2">
                                <h6 className="mb-0 text-muted">Articoli totali:</h6>
                                <span className="fw-bold">{totalItemsInCart}</span>
                            </div>
                            <div className="d-flex justify-content-between align-items-center mb-3">
                                <h5 className="mb-0">Totale:</h5>
                                <h5 className="mb-0 fw-bold text-success">
                                    {formatPrice(cartTotal)}
                                </h5>
                            </div>
                            <Link to={'/checkout'} >
                                <button
                                    type="button"
                                    className="btn btn-primary w-100 btn-lg"
                                >
                                    Vai al Pagamento
                                </button>
                            </Link>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default CartOffcanvas;