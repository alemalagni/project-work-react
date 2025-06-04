import img1 from '../public/l_arte_e_i_retroscena_1970_x_779_px_1_.webp';
import img2 from '../public/BANNER_E-COMMERCE_10__1.webp';
import img3 from '../public/Tavola_disegno_1_1.webp';
import code1 from '../public/banner-10.jpg';
import code2 from '../public/banner-20.jpeg';
import code3 from '../public/banner-30.jpeg';
import code4 from '../public/banner-40.jpg';


export default function HeroSpace() {

    return (
        <>
            <div className="container my-5">
                <div id="carouselExampleInterval" className="carousel slide" data-bs-ride="carousel">
                    <div className="carousel-inner " >
                        <div className="carousel-item active" data-bs-interval="10000">
                            <img src={img1} className="d-block mx-auto" style={{ width: "100%", objectFit: "cover" }} alt="foto-1" />
                        </div>
                        <div className="carousel-item " data-bs-interval="10000">
                            <img src={img2} className="d-block mx-auto" style={{ width: "100%", objectFit: "cover" }} alt="foto-2" />
                        </div>
                        <div className="carousel-item " data-bs-interval="10000">
                            <img src={img3} className="d-block mx-auto" style={{ width: "100%", objectFit: "cover" }} alt="foto-3" />
                        </div>
                        <div className="carousel-item " data-bs-interval="10000">
                            <img src={code1} className="d-block mx-auto" style={{ width: "100%", objectFit: "cover" }} alt="foto-3" />
                        </div>
                        <div className="carousel-item " data-bs-interval="10000">
                            <img src={code2} className="d-block mx-auto" style={{ width: "100%", objectFit: "cover" }} alt="foto-3" />
                        </div>
                        <div className="carousel-item " data-bs-interval="10000">
                            <img src={code3} className="d-block mx-auto" style={{ width: "100%", objectFit: "cover" }} alt="foto-3" />
                        </div>
                        <div className="carousel-item " data-bs-interval="10000">
                            <img src={code4} className="d-block mx-auto" style={{ width: "100%", objectFit: "cover" }} alt="foto-3" />
                        </div>
                    </div>
                    <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleInterval" data-bs-slide="prev">
                        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Previous</span>
                    </button>
                    <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleInterval" data-bs-slide="next">
                        <span className="carousel-control-next-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Next</span>
                    </button>
                </div>
            </div>

        </>
    )
}