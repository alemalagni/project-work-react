import { NavLink } from "react-router-dom";
import logo from "../public/Gemini_Generated_Image_qf26rqf26rqf26rq.png"

export default function Navbar() {

    return (
        <>
            <nav className="navbar navbar-expand-lg bg-body-tertiary px-5 shadow fixed-top">
                <div className="container-fluid space ">
                    <NavLink to="/" className="navbar-brand" href="#"><img src={logo} style={{ width: "150px" }} alt="logo" /></NavLink>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav mb-2 mb-lg-0 ms-auto">
                            <li className="nav-item">
                                <NavLink to='/' end className="nav-link">Home page</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink to='/manga' end className="nav-link">Manga</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink to='/about' end className="nav-link">About</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink to='/contacts' className="nav-link">Contacts</NavLink>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </>
    )
}