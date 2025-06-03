import { useCart } from "../contexts/CartContext";
import { useLocation } from "react-router-dom";

function OrderSummaryPage() {
    const { state } = useLocation();

    const formatPrice = (price) => {
        if (typeof price !== 'number' || isNaN(price)) {
            return 'N/A';
        }
        return '€ ' + price.toFixed(2).replace('.', ',');
    };

    const {
        formData,
        cartItems,
        cartTotal,
        shippingCost,
        finalOrderTotal,
        estimatedShippingDate
    } = state || {};

    return (
        <div className="container-fluid gradient-bg py-5">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-lg-8 col-md-10">
                        <div className="border rounded p-4 p-md-5 shadow-sm bg-light">
                            <h2 className="p-2">Grazie per l'acquisto!</h2>

                            <ul className="list-group list-group-flush mb-4" style={{ maxHeight: '450px', overflowY: 'auto' }}>
                                {cartItems.map(item => (
                                    <li key={item.slug} className="list-group-item d-flex align-items-center py-3 px-4"> {/* Rimosso lh-sm, aggiunto align-items-center */}
                                        {item.imagePath && (
                                            <img
                                                src={item.imagePath}
                                                alt={item.title}
                                                style={{
                                                    width: '140px',
                                                    height: '210px',
                                                    objectFit: 'contain',
                                                    marginRight: '25px',
                                                    borderRadius: '4px',
                                                    flexShrink: 0
                                                }}
                                            />
                                        )}
                                        {/* Contenitore per i dettagli del prodotto, cresce per riempire lo spazio */}
                                        <div className="flex-grow-1">
                                            <h4 className="mb-2 fw-semibold">{item.title}</h4> {/* Titolo più grande e semibold */}

                                            <div className="mb-1">
                                                <small className="text-muted">Prezzo unitario: </small>
                                                <small className="text-dark">{formatPrice(item.effective_price)}</small>
                                            </div>

                                            <div className="mb-1">
                                                <small className="text-muted">Quantità: </small>
                                                <small className="text-dark fw-bold">{item.quantity}</small>
                                            </div>
                                        </div>

                                        {/* Contenitore per il prezzo totale dell'item, allineato a destra */}
                                        <div className="text-end ps-3" style={{ minWidth: '110px' }}> {/* Aggiunto padding a sinistra e minWidth */}
                                            <h5 className="mb-0 text-dark fw-bold"> {/* Prezzo totale item più grande e bold */}
                                                {formatPrice(item.effective_price * item.quantity)}
                                            </h5>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default OrderSummaryPage;