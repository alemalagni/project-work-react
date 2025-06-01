import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ShoppingCart from "../components/ShoppingCart";

export default function DefaultLayout() {
    return (
        <>
            <header className="m-bott">
                <Navbar />
            </header>
            <div className="main-content-wrapper">
                <Outlet />
                <ShoppingCart />
            </div>
            <Footer />
        </>
    );
}
