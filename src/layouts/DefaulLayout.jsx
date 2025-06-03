import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function DefaultLayout() {
    return (
        <>
            <header className="m-bott">
                <Navbar />
            </header>
            <div className="main-content-wrapper">
                <Outlet />
            </div>
            <Footer />
        </>
    );
}
