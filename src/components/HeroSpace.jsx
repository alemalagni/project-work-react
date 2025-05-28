
export default function HeroSpace() {

    return (
        <>
            <div id="carouselExampleInterval" class="carousel slide" data-bs-ride="carousel">
                <div className="carusel-inner ">
                    <div className="carousel-item active" data-bs-interval="10000">
                        <img src="" alt="foto-1" />
                    </div>
                    <div className="carousel-item active" data-bs-interval="10000">
                        <img src="" alt="foto-2" />
                    </div>
                    <div className="carousel-item active" data-bs-interval="10000">
                        <img src="" alt="foto-3" />
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
        </>
    )
}