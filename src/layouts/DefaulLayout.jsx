import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function DefaultLayout() {

    return (
        <div>
            <header className="m-bott">
                <Navbar />
            </header>
            <main>
                <Outlet />
            </main>
            <Footer />
        </div>
    )
};