import { NavLink } from "react-router-dom";
import logo from "../public/Gemini_Generated_Image_qf26rqf26rqf26rq.png"
import { useState } from "react";
import CartOffcanvas from "./CartOffcanvas";
import { useCart } from "../contexts/CartContext";

export default function Navbar() {

    const [isCartOpen, setIsCartOpen] = useState(false);
    const { totalItemsInCart } = useCart();
    console.log(totalItemsInCart)

    const cartItemCountBadgeStyle = {
        position: 'absolute',
        top: '-0.4em',          // Spostalo un po' più in alto per sovrapporlo al bordo del pulsante
        right: '-0.5em',         // Spostalo un po' più a destra per sovrapporlo al bordo del pulsante
        backgroundColor: '#dc3545', // Rosso (Bootstrap 'danger'), ottimo per le notifiche
        color: 'white',
        paddingLeft: '0.2em',    // Padding orizzontale
        paddingRight: '0.2em',   // Padding orizzontale
        paddingTop: '0.3em',     // Padding verticale (leggermente meno per bilanciare)
        paddingBottom: '0.3em',  // Padding verticale
        borderRadius: '10rem',   // Un valore alto per renderlo circolare se il contenuto è corto, o a pillola se più lungo
        fontSize: '0.75em',      // Dimensione del font più piccola per il badge
        fontWeight: 'bold',
        lineHeight: '1',         // Aiuta a centrare il testo verticalmente e assicura coerenza nell'altezza
        minWidth: '1.8em',       // Larghezza minima per far sì che appaia bene anche con una sola cifra (es. '1')
        // L'altezza sarà determinata dal lineHeight e dal padding verticale
        textAlign: 'center',     // Centra il numero all'interno del badge
        zIndex: 10,              // Assicura che sia sopra altri elementi
        // Per un badge perfettamente circolare con una sola cifra,
        // potresti dover aggiustare paddingLeft/Right e minWidth o impostare width e height uguali
        // e usare display: 'flex', alignItems: 'center', justifyContent: 'center'.
        // Questo approccio è flessibile per 1 o 2 cifre.
    };


    return (
        <>
            <nav className="navbar navbar-expand-lg bg-body-tertiary px-5 shadow fixed-top">
                <div className="container-fluid d-flex justify-content-between align-items-center">

                    {/* Logo - Sinistra */}
                    <NavLink to="/" className="navbar-brand">
                        <img src={logo} style={{ width: "150px" }} alt="logo" />
                    </NavLink>

                    {/* Nav Links - Centro */}
                    <div className="d-none d-lg-flex justify-content-end flex-grow-1">
                        <ul className="navbar-nav gap-3">
                            <li className="nav-item">
                                <NavLink to='/' end className="nav-link"><strong>Home page</strong></NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink to='/manga' end className="nav-link"><strong>Manga</strong></NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink to='/wishlist' className="nav-link"><strong>Wishlist</strong></NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink to='/about' end className="nav-link"><strong>About</strong></NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink to='/contacts' className="nav-link"><strong>Contacts</strong></NavLink>
                            </li>
                            <li className="nav-item">
                                <button
                                    type="button"
                                    className="btn position-relative"
                                    onClick={() => setIsCartOpen(true)}
                                    aria-label="Apri carrello"
                                >
                                    {totalItemsInCart > 0 ? <div style={cartItemCountBadgeStyle}>{totalItemsInCart > 99 ? '99+' : totalItemsInCart}</div> : null}
                                    <i className="fa-solid fa-cart-shopping fs-4"></i>
                                </button>
                            </li>
                        </ul>
                    </div>

                    {/* Cart - Destra */}



                </div>
            </nav>
            <CartOffcanvas isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />

        </>
    );
}
