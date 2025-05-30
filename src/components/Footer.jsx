const Footer = () => {
    return <footer className="bg-dark text-light pt-5 px-5 pb-2">
        <div className="container">
            <div className="row">
                <div className="col-md-3 col-12 text-center text-md-start">
                    <h5>Founder</h5>
                    <ul className="list-unstyled fst-italic ">
                        <li>Alberto Cadorin</li>
                        <li>Alessandro Malagni</li>
                        <li>Edoardo Prostamo</li>
                        <li>Esteban Caponio</li>
                        <li>Gianluca Severo</li>
                        <li>Pierdomenico Pacilio</li>
                    </ul>
                </div>
                <div className="col-md-6 text-center col-sm-12">
                    <h5>Sede Legale</h5>
                    <p>Via Luca Signorelli, 12</p>
                    <p>00196 Roma RM</p>
                    <p>Italia</p>
                </div>
                <div className="col-md-3 text-md-end text-center col-12">
                    <h5>Seguici sui social</h5>
                    <div className="d-flex justify-content-md-end justify-content-center">
                        <a href="#" target="_blank" className="text-light me-2"><i className="fa-brands fa-facebook"></i></a>
                        <a href="#" target="_blank" className="text-light me-2"><i className="fa-brands fa-twitter"></i></a>
                        <a href="#" target="_blank" className="text-light me-2"><i className="fa-brands fa-instagram"></i></a>
                        <a href="#" target="_blank" className="text-light me-2"><i className="fa-brands fa-linkedin"></i></a>
                        <a href="#" target="_blank" className="text-light me-2"><i className="fa-brands fa-pinterest"></i></a>
                        <a href="#" target="_blank" className="text-light me-2"><i className="fa-brands fa-youtube"></i></a>
                        <a href="#" target="_blank" className="text-light"><i className="fa-brands fa-tiktok"></i></a>
                    </div>
                </div>
            </div>
            <div className="text-center mt-3">
                <p>© 2025 Tutti i diritti riservati.</p>
            </div>
        </div>
    </footer >
}

export default Footer;