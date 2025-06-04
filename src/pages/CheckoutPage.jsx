import { useState, useEffect } from "react";
import { useCart } from "../contexts/CartContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function CheckoutPage() {
  const { cartItems, cartTotal, totalItemsInCart, clearCart } = useCart(); // Aggiunto clearCart qui
  const [promoDiscountPercent, setPromoDiscountPercent] = useState(0);
  // const { clearCart } = useCart(); // Rimosso duplicato

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [formData, setFormData] = useState({
    name: '',
    surname: '',
    email: '',
    address: '',
    address2: '',
    city: '',
    state: '',
    payment_method: '',
    promo_code: ''
  });

  const navigate = useNavigate();

  function handleFormData(e) {
    const { name, value, type, checked } = e.target;
    setFormData(prevFormData => ({
      ...prevFormData,
      [name]: type === "checkbox" ? checked : value
    }));
  }

  const formatPrice = (price) => {
    if (typeof price !== 'number' || isNaN(price)) {
      return 'N/A';
    }
    return '€ ' + price.toFixed(2).replace('.', ',');
  };

  const today = new Date();
  const estimatedShippingDate = new Date(today);
  estimatedShippingDate.setDate(today.getDate() + 7);

  const estimatedShippingDateFormatted = estimatedShippingDate.toLocaleDateString('it-IT', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  // Calcoli per la visualizzazione nel riepilogo (usano lo stato promoDiscountPercent)
  const discountAmountFromState = cartTotal * (promoDiscountPercent / 100);
  const discountedTotalFromState = cartTotal - discountAmountFromState;
  const shippingCostFromState = discountedTotalFromState > 50 || discountedTotalFromState === 0 ? 0 : 5.99; // Aggiunto controllo per discountedTotalFromState === 0
  const finalOrderTotalFromState = discountedTotalFromState + shippingCostFromState;

  function sendForm(e) {
    e.preventDefault();

    if (
      !formData.name ||
      !formData.surname ||
      !formData.email ||
      !formData.address ||
      !formData.city ||
      !formData.state ||
      !formData.payment_method
    ) {
      alert("Per favore compila tutti i campi obbligatori.");
      return;
    }

    const submitOrder = (promoCodeIdForSubmit, currentPercent, currentDiscountAmount) => {
      // Ricalcola i totali CON I VALORI DELLO SCONTO AGGIORNATI E CONFERMATI
      const actualDiscountedTotal = cartTotal - currentDiscountAmount;
      const actualShippingCost = actualDiscountedTotal > 50 || actualDiscountedTotal === 0 ? 0 : 5.99; // Aggiunto controllo per actualDiscountedTotal === 0
      const actualFinalOrderTotal = actualDiscountedTotal + actualShippingCost;

      const orderData = {
        // Dati principali del form
        name: formData.name,
        surname: formData.surname,
        email: formData.email,
        address: `${formData.address}${formData.address2 ? `, ${formData.address2}` : ''}, ${formData.city}, ${formData.state}`, // Indirizzo più completo
        // city: formData.city, // Se il backend li vuole separati
        // state: formData.state, // Se il backend li vuole separati
        payment_method: formData.payment_method,

        // Dati calcolati dell'ordine
        total_amount: actualFinalOrderTotal,
        shipping_price: actualShippingCost,

        // Articoli del carrello - FONDAMENTALE per il backend!
        cartItems: cartItems,
      };

      if (promoCodeIdForSubmit) {
        orderData.promo_code_id = promoCodeIdForSubmit;
      }

      axios.post(`${import.meta.env.VITE_PUBLIC_PATH}manga/order`, orderData)
        .then((response) => { // Aggiunto response per poter accedere a orderId se il backend lo restituisce nel corpo
          clearCart();
          // alert("Ordine completato con successo!"); // Potrebbe non essere necessario se la pagina di riepilogo è chiara
          navigate("/order-summary", {
            state: {
              formData, // Passa il formData originale per visualizzazione
              cartItems, // Passa i cartItems originali
              cartTotal, // Subtotale originale prima dello sconto
              shippingCost: actualShippingCost, // Costo di spedizione calcolato
              finalOrderTotal: actualFinalOrderTotal, // Totale finale calcolato
              estimatedShippingDate: estimatedShippingDate.toISOString(),
              payment_method: formData.payment_method,
              promo_code: formData.promo_code, // Codice promo inserito
              promoDiscountPercent: currentPercent, // Percentuale di sconto effettivamente applicata
              discountAmount: currentDiscountAmount, // Ammontare dello sconto effettivamente applicato
              orderId: response.data?.orderId // Passa l'ID dell'ordine se il backend lo restituisce
            }
          });
        })
        .catch((err) => {
          console.error("Errore durante l'invio dell'ordine:", err.response ? err.response.data : err.message);
          alert(err.response?.data?.error || "Errore durante l'invio dell'ordine. Riprova o contatta l'assistenza.");
        });
    };

    if (formData.promo_code.trim()) { // Controlla se promo_code non è vuoto
      axios.get(`${import.meta.env.VITE_PUBLIC_PATH}manga/promo_code?code=${encodeURIComponent(formData.promo_code.trim())}`)
        .then(res => {
          if (res.data && res.data.id && typeof res.data.value_promo === 'number') {
            const percent = res.data.value_promo;
            const discount = cartTotal * (percent / 100);
            setPromoDiscountPercent(percent); // Aggiorna lo stato per la UI
            submitOrder(res.data.id, percent, discount); // Passa i valori corretti a submitOrder
          } else {
            setPromoDiscountPercent(0); // Resetta lo sconto nella UI
            alert("Codice promo non valido o scaduto.");
            // Non procedere con submitOrder se il codice promo è invalido e l'utente si aspettava uno sconto
          }
        })
        .catch(err => {
          setPromoDiscountPercent(0); // Resetta lo sconto nella UI
          console.error("Errore verifica codice promo:", err.response ? err.response.data : err.message);
          alert(err.response?.data?.error || "Errore nella verifica del codice promo. Prova a inviare l'ordine senza codice o contatta l'assistenza.");
          // Non procedere con submitOrder
        });
    } else {
      setPromoDiscountPercent(0); // Assicura che non ci sia sconto se non c'è codice
      submitOrder(null, 0, 0); // Procedi senza sconto
    }
  }

  return (
    <div className="container-fluid gradient-bg py-5">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-8 col-md-10">
            <div className="border rounded p-4 p-md-5 shadow-sm bg-light">

              <h2 className="mb-4">Riepilogo Ordine</h2>
              {cartItems.length === 0 ? (
                <div className="text-center py-5">
                  <p className="fs-5 text-muted">Il tuo carrello è vuoto.</p>
                  <Link to="/" className="btn btn-primary mt-3">Continua lo Shopping</Link>
                </div>
              ) : (
                <>
                  <ul className="list-group list-group-flush mb-4" style={{ maxHeight: '450px', overflowY: 'auto' }}>
                    {cartItems.map(item => (
                      <li key={item.slug} className="list-group-item d-flex align-items-center py-3 px-0 px-md-3"> {/* Ajustato padding per consistenza */}
                        {item.imagePath && (
                          <img
                            src={item.imagePath}
                            alt={item.title}
                            style={{
                              width: '100px', // Leggermente più piccolo per mobile e più item
                              height: '150px',
                              objectFit: 'contain',
                              marginRight: '15px',
                              borderRadius: '4px',
                              flexShrink: 0
                            }}
                          />
                        )}
                        <div className="flex-grow-1">
                          <h5 className="mb-1 fw-semibold" style={{ fontSize: '1.1rem' }}>{item.title}</h5> {/* Leggermente più piccolo se molti item */}
                          <div className="mb-1">
                            <small className="text-muted">Prezzo: </small>
                            <small className="text-dark">{formatPrice(item.effective_price)}</small>
                          </div>
                          <div>
                            <small className="text-muted">Qtà: </small>
                            <small className="text-dark fw-bold">{item.quantity}</small>
                          </div>
                        </div>
                        <div className="text-end ps-2" style={{ minWidth: '100px' }}>
                          <h6 className="mb-0 text-dark fw-bold">
                            {formatPrice(item.effective_price * item.quantity)}
                          </h6>
                        </div>
                      </li>
                    ))}
                  </ul>

                  <div className="pt-3">
                    <div className="d-flex justify-content-between align-items-center mb-2">
                      <span className="text-muted">Subtotale ({totalItemsInCart} articoli):</span>
                      <strong>{formatPrice(cartTotal)}</strong>
                    </div>
                    {/* Mostra lo sconto basato sullo stato, che si aggiorna dopo la verifica del codice */}
                    {promoDiscountPercent > 0 && (
                      <div className="d-flex justify-content-between align-items-center mb-2 text-success">
                        <span>Sconto promo ({promoDiscountPercent}%):</span>
                        <strong>-{formatPrice(discountAmountFromState)}</strong>
                      </div>
                    )}
                    {/* Mostra le spese di spedizione basate sullo stato, che si aggiorna con lo sconto */}
                    <div className="d-flex justify-content-between align-items-center mb-2">
                      <span className="text-muted">Spedizione:</span>
                      <strong>{shippingCostFromState === 0 ? 'Gratuita' : formatPrice(shippingCostFromState)}</strong>
                    </div>
                    <div className="d-flex justify-content-between align-items-center mb-3">
                      <span className="text-muted">Spedizione stimata il:</span>
                      <strong>{estimatedShippingDateFormatted}</strong>
                    </div>
                    <hr className="my-3" />
                    <div className="d-flex justify-content-between align-items-center mt-2">
                      <h4 className="mb-0 fw-bold">Totale Ordine:</h4>
                      <h4 className="mb-0 fw-bold text-primary">{formatPrice(finalOrderTotalFromState)}</h4>
                    </div>
                  </div>
                </>
              )}

              {cartItems.length > 0 && (
                <>
                  <hr className="my-4" />
                  <h3 className="mb-4">Dati di Spedizione e Pagamento</h3>
                  <form className="row g-3" onSubmit={sendForm}>
                    {/* ... tutti i tuoi campi del form ... */}
                    <div className="col-md-6">
                      <label htmlFor="nameInput" className="form-label">Nome</label>
                      <input type="text" className="form-control" id="nameInput" name="name" value={formData.name} onChange={handleFormData} required />
                    </div>
                    <div className="col-md-6">
                      <label htmlFor="surnameInput" className="form-label">Cognome</label>
                      <input type="text" className="form-control" id="surnameInput" name="surname" value={formData.surname} onChange={handleFormData} required />
                    </div>
                    <div className="col-md-7"> {/* Leggermente più largo per l'email */}
                      <label htmlFor="emailInput" className="form-label">Email</label>
                      <input type="email" className="form-control" id="emailInput" name="email" value={formData.email} onChange={handleFormData} required />
                    </div>
                    <div className="col-md-5"> {/* Leggermente più stretto per il promo */}
                      <label htmlFor="promoCodeInput" className="form-label">Codice Promo</label>
                      <input type="text" className="form-control" id="promoCodeInput" name="promo_code" value={formData.promo_code} onChange={handleFormData} placeholder="Opzionale" />
                    </div>
                    <div className="col-12">
                      <label htmlFor="addressInput" className="form-label">Indirizzo</label>
                      <input type="text" className="form-control" id="addressInput" name="address" value={formData.address} onChange={handleFormData} placeholder="Via, Piazza, ecc." required />
                    </div>
                    <div className="col-12">
                      <label htmlFor="address2Input" className="form-label">Dettagli indirizzo <small className="text-muted">(opzionale)</small></label>
                      <input type="text" className="form-control" id="address2Input" name="address2" value={formData.address2} onChange={handleFormData} placeholder="Appartamento, scala, piano, interno" />
                    </div>
                    <div className="col-md-8">
                      <label htmlFor="cityInput" className="form-label">Città</label>
                      <input type="text" className="form-control" id="cityInput" name="city" value={formData.city} onChange={handleFormData} required />
                    </div>
                    <div className="col-md-4">
                      <label htmlFor="stateInput" className="form-label">Regione</label>
                      <select id="stateInput" name="state" className="form-select" value={formData.state} onChange={handleFormData} required >
                        <option value="">Seleziona...</option>
                        {/* ... opzioni regioni ... */}
                        <option value="ABR">Abruzzo</option><option value="BAS">Basilicata</option><option value="CAL">Calabria</option><option value="CAM">Campania</option><option value="EMR">Emilia-Romagna</option><option value="FVG">Friuli-Venezia Giulia</option><option value="LAZ">Lazio</option><option value="LIG">Liguria</option><option value="LOM">Lombardia</option><option value="MAR">Marche</option><option value="MOL">Molise</option><option value="PMN">Piemonte</option><option value="PUG">Puglia</option><option value="SAR">Sardegna</option><option value="SIC">Sicilia</option><option value="TOS">Toscana</option><option value="TAA">Trentino-Alto Adige</option><option value="UMB">Umbria</option><option value="VDA">Valle d'Aosta</option><option value="VEN">Veneto</option>
                      </select>
                    </div>

                    <div className="col-12">
                      <label htmlFor="paymentMethod" className="form-label">Metodo di pagamento</label>
                      <select id="paymentMethod" name="payment_method" className="form-select" value={formData.payment_method} onChange={handleFormData} required >
                        <option value="">Seleziona...</option>
                        <option value="paypal">PayPal</option>
                        <option value="carta">Carta di credito</option>
                      </select>
                    </div>

                    <div className="col-12 mt-4 d-grid">
                      <button type="submit" className="btn btn-primary btn-lg py-2 fw-semibold">
                        Completa Ordine e Paga
                      </button>
                    </div>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CheckoutPage;