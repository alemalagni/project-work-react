import { Outlet } from "react-router-dom";
import Navbar from "../components/NavBar";

export default function DefaultLayout() {

    return (
        <div>
            <Navbar />
            <main>
                <Outlet />
            </main>
        </div>
    )
};