import { NavLink } from "react-router-dom";
import logo from "../public/Gemini_Generated_Image_17anvi17anvi17an.jpg"

export default function Navbar() {

    return (
        <>
            <nav className="navbar navbar-expand-lg bg-body-tertiary shadow">
                <div className="container-fluid space ">
                    <a className="navbar-brand" href="#"><img src={logo} className="rounded-circle" style={{ width: "100px" }} alt="logo" /></a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav mb-2 mb-lg-0 ms-auto">
                            <li className="nav-item">
                                <NavLink to='/' end>Home page</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink to='/manga' end>Manga</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink to='/about' end>About</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink to='/contacts'>Contacts</NavLink>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </>
    )
}