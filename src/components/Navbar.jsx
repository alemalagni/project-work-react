import { NavLink } from "react-router-dom";
import logo from "../public/Gemini_Generated_Image_qf26rqf26rqf26rq.png"
import { useState } from "react";
import CartOffcanvas from "./CartOffcanvas";

export default function Navbar() {

    const [isCartOpen, setIsCartOpen] = useState(false);


    return (
        <>
            <nav className="navbar navbar-expand-lg bg-body-tertiary px-5 shadow fixed-top">
                <div className="container-fluid d-flex justify-content-between align-items-center">

                    {/* Logo - Sinistra */}
                    <NavLink to="/" className="navbar-brand">
                        <img src={logo} style={{ width: "150px" }} alt="logo" />
                    </NavLink>

                    {/* Nav Links - Centro */}
                    <div className="d-none d-lg-flex justify-content-center flex-grow-1">
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
                        </ul>
                    </div>

                    {/* Cart - Destra */}
                    <button
                        type="button"
                        className="btn position-relative"
                        onClick={() => setIsCartOpen(true)}
                        aria-label="Apri carrello"
                    >
                        <i className="fa-solid fa-cart-shopping fs-4"></i>
                    </button>


                </div>
            </nav>
            <CartOffcanvas isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />

        </>
    );
}
