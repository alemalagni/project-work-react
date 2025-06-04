import { useState, useEffect } from "react";
import { useCart } from "../contexts/CartContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function CheckoutPage() {
  const { cartItems, cartTotal, totalItemsInCart } = useCart();

  const { clearCart } = useCart();

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

  // Calcolo spese di spedizione
  const shippingCost = cartTotal > 50 ? 0 : 5.99;
  const finalOrderTotal = cartTotal + shippingCost;

  // Calcolo e formattazione data di spedizione stimata
  const today = new Date();
  const estimatedShippingDate = new Date(today);
  estimatedShippingDate.setDate(today.getDate() + 7);

  const estimatedShippingDateFormatted = estimatedShippingDate.toLocaleDateString('it-IT', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'

  });


  function sendForm(e) {
    e.preventDefault();

    navigate("/order-summary", {
      state: {
        formData,
        cartItems,
        cartTotal,
        shippingCost,
        finalOrderTotal,
        estimatedShippingDate: estimatedShippingDate.toISOString(),
        payment_method: formData.payment_method,
        promo_code: formData.promo_code
      }
    });

    // Validazione base
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

    // Funzione per inviare l'ordine dopo aver risolto l'ID promo
    const submitOrder = (promoCodeId) => {
      const orderData = {
        total_amount: finalOrderTotal,
        shipping_price: shippingCost,
        payment_method: formData.payment_method,
        address: formData.address,
        email: formData.email,
        name: formData.name,
        surname: formData.surname,
      };

      if (promoCodeId) {
        orderData.promo_code_id = promoCodeId;
      }


      axios.post(`${import.meta.env.VITE_PUBLIC_PATH}manga/order`, orderData)
        .then(() => {
          clearCart();
          alert("Ordine completato con successo!");
        })
        .catch(() => {
          alert("Errore durante l'invio dell'ordine.");
        });
    };

    // Se c'è un codice promo, cerca l'ID
    if (formData.promo_code) {
      axios.get(`${import.meta.env.VITE_PUBLIC_PATH}manga/promo_code?code=${encodeURIComponent(formData.promo_code)}`)
        .then(res => {
          // Codice valido
          if (res.data && res.data.id) {
            submitOrder(res.data.id);
          } else {
            alert("Codice promo non valido.");
          }
        })
        .catch(err => {
          // Gestione errori specifici
          if (err.response && err.response.data && err.response.data.error) {
            alert(err.response.data.error);
          } else {
            alert("Errore nella verifica del codice promo.");
          }
        });
    } else {
      // Nessun promo code, invia direttamente
      submitOrder(null);
    }
  }

  return (
    <div className="container-fluid gradient-bg py-5">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-8 col-md-10">
            <div className="border rounded p-4 p-md-5 shadow-sm bg-light">


              {/* --- INIZIO RIEPILOGO ORDINE --- */}
              <h2 className="mb-4">Riepilogo Ordine</h2> {/* Titolo principale del riepilogo più grande */}
              {cartItems.length === 0 ? (
                <p>Il tuo carrello è vuoto. Aggiungi qualcosa prima di procedere al checkout!</p>
              ) : (
                <>
                  <ul className="list-group list-group-flush mb-4" style={{ maxHeight: '450px', overflowY: 'auto' }}>
                    {cartItems.map(item => (
                      <li key={item.slug} className="list-group-item d-flex align-items-center py-3 px-4"> {/* Rimosso lh-sm, aggiunto align-items-center */}
                        {item.imagePath && (
                          <img
                            src={item.imagePath}
                            alt={item.title}
                            style={{
                              width: '140px',    // Come da tua richiesta
                              height: '210px',   // Come da tua richiesta
                              objectFit: 'contain',
                              marginRight: '25px', // Aumentato un po' il margine
                              borderRadius: '4px',
                              flexShrink: 0      // Impedisce all'immagine di restringersi
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

                  <div className="pt-3">
                    <div className="d-flex justify-content-between align-items-center mb-2 fs-6"> {/* fs-6 per testo leggermente più grande */}
                      <span className="text-muted">Subtotale articoli ({totalItemsInCart}):</span>
                      <strong>{formatPrice(cartTotal)}</strong>
                    </div>
                    <div className="d-flex justify-content-between align-items-center mb-2 fs-6">
                      <span className="text-muted">Spedizione:</span>
                      <strong>{shippingCost === 0 ? 'Gratuita' : formatPrice(shippingCost)}</strong>
                    </div>
                    {/* NUOVO: Data di spedizione stimata */}
                    <div className="d-flex justify-content-between align-items-center mb-3 fs-6">
                      <span className="text-muted">Spedizione stimata il:</span>
                      <strong>{estimatedShippingDateFormatted}</strong>
                    </div>
                    <hr className="my-3" />
                    <div className="d-flex justify-content-between align-items-center mt-2">
                      {/* Totale Ordine più grande */}
                      <h4 className="mb-0">Totale Ordine:</h4>
                      <h4 className="mb-0 fw-bold">{formatPrice(finalOrderTotal)}</h4>
                    </div>
                  </div>
                </>
              )}
              {/* --- FINE RIEPILOGO ORDINE --- */}

              {cartItems.length > 0 && <hr className="my-4" />}

              <h3 className="mb-4 mt-4">Dati di Spedizione e Pagamento</h3>
              <form className="row g-3" onSubmit={sendForm}>
                <div className="col-md-6">
                  <label htmlFor="nameInput" className="form-label">Nome</label>
                  <input
                    type="text"
                    className="form-control"
                    id="nameInput"
                    name="name"
                    value={formData.name}
                    onChange={handleFormData}
                    required
                  />
                </div>
                <div className="col-md-6">
                  <label htmlFor="surnameInput" className="form-label">Cognome</label>
                  <input
                    type="text"
                    className="form-control"
                    id="surnameInput"
                    name="surname"
                    value={formData.surname}
                    onChange={handleFormData}
                    required
                  />
                </div>
                <div className="col-md-6">
                  <label htmlFor="emailInput" className="form-label">Email</label>
                  <input
                    type="email"
                    className="form-control"
                    id="emailInput"
                    name="email"
                    value={formData.email}
                    onChange={handleFormData}
                    required
                  />
                </div>
                <div className="col-6">
                  <label htmlFor="promoCodeInput" className="form-label">Codice Promo (opzionale)</label>
                  <input
                    type="text"
                    className="form-control"
                    id="promoCodeInput"
                    name="promo_code"
                    value={formData.promo_code}
                    onChange={handleFormData}
                    placeholder="Inserisci il codice promo"
                  />
                </div>
                <div className="col-12">
                  <label htmlFor="addressInput" className="form-label">Indirizzo</label>
                  <input
                    type="text"
                    className="form-control"
                    id="addressInput"
                    name="address"
                    value={formData.address}
                    onChange={handleFormData}
                    placeholder="Via, Piazza, ecc."
                    required
                  />
                </div>
                <div className="col-12">
                  <label htmlFor="address2Input" className="form-label">Dettagli indirizzo (opzionale)</label>
                  <input
                    type="text"
                    className="form-control"
                    id="address2Input"
                    name="address2"
                    value={formData.address2}
                    onChange={handleFormData}
                    placeholder="Appartamento, scala, piano, interno"
                  />
                </div>
                <div className="col-md-8">
                  <label htmlFor="cityInput" className="form-label">Città</label>
                  <input
                    type="text"
                    className="form-control"
                    id="cityInput"
                    name="city"
                    value={formData.city}
                    onChange={handleFormData}
                    required
                  />
                </div>
                <div className="col-md-4">
                  <label htmlFor="stateInput" className="form-label">Regione</label>
                  <select
                    id="stateInput"
                    name="state"
                    className="form-select"
                    value={formData.state}
                    onChange={handleFormData}
                    required
                  >
                    <option value="">-- Seleziona --</option>
                    <option value="ABR">Abruzzo</option>
                    <option value="BAS">Basilicata</option>
                    <option value="CAL">Calabria</option>
                    <option value="CAM">Campania</option>
                    <option value="EMR">Emilia-Romagna</option>
                    <option value="FVG">Friuli-Venezia Giulia</option>
                    <option value="LAZ">Lazio</option>
                    <option value="LIG">Liguria</option>
                    <option value="LOM">Lombardia</option>
                    <option value="MAR">Marche</option>
                    <option value="MOL">Molise</option>
                    <option value="PMN">Piemonte</option>
                    <option value="PUG">Puglia</option>
                    <option value="SAR">Sardegna</option>
                    <option value="SIC">Sicilia</option>
                    <option value="TOS">Toscana</option>
                    <option value="TAA">Trentino-Alto Adige</option>
                    <option value="UMB">Umbria</option>
                    <option value="VDA">Valle d'Aosta</option>
                    <option value="VEN">Veneto</option>
                  </select>
                </div>

                <div className="col-12">
                  <label htmlFor="paymentMethod" className="form-label">Metodo di pagamento</label>
                  <select
                    id="paymentMethod"
                    name="payment_method"
                    className="form-select"
                    value={formData.payment_method}
                    onChange={handleFormData}
                    required
                  >
                    <option value="">-- Seleziona --</option>
                    <option value="paypal">PayPal</option>
                    <option value="carta">Carta di credito</option>
                  </select>
                </div>

                <div className="col-12 mt-4 d-grid">
                  <button
                    type="submit"
                    className="btn btn-primary"

                  >
                    Completa il Pagamento
                  </button>
                </div>
              </form>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default CheckoutPage;