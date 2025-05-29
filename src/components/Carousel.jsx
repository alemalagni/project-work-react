import Slider from "react-slick";
import { useRef, useEffect, useState } from "react";
import axios from "axios";

export default function MangaCarousel() {
    const sliderRef = useRef(null);
    const [mangaList, setMangaList] = useState([]);

    useEffect(() => {
        axios.get(import.meta.env.VITE_PUBLIC_PATH + "manga/newRelease")
            .then(res => {
                console.log(res.data);
                if (Array.isArray(res.data)) {
                    setMangaList(res.data);
                } else if (Array.isArray(res.data.manga)) {
                    setMangaList(res.data.manga);
                } else {
                    setMangaList([]); // fallback vuoto
                }
            })
            .catch(err => console.error(err));
    }, []);

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1,
        responsive: [
            { breakpoint: 992, settings: { slidesToShow: 2 } },
            { breakpoint: 768, settings: { slidesToShow: 1 } }
        ],
        arrows: false // Disabilita le frecce di default
    };

    return (
        <div className="container my-5 position-relative">
            <h2 className="text-center mb-4">Nuovi Arrivi</h2>
            <button
                className="btn btn-secondary position-absolute top-50 start-0 translate-middle-y"
                style={{ zIndex: 2 }}
                onClick={() => sliderRef.current.slickPrev()}
            >
                &lt;
            </button>
            <button
                className="btn btn-secondary position-absolute top-50 end-0 translate-middle-y"
                style={{ zIndex: 2 }}
                onClick={() => sliderRef.current.slickNext()}
            >
                &gt;
            </button>
            <Slider ref={sliderRef} {...settings}>
                {Array.isArray(mangaList) && mangaList.map((manga) => (
                    <div key={manga.slug || manga.title} className="px-2">
                        <div className="card" style={{ width: "16rem" }}>
                            <img src={manga.imagePath} className="card-img-top " alt={manga.title} />
                            <div className="card-body">
                                <h5 className="card-title">{manga.title}</h5>
                            </div>
                        </div>
                    </div>
                ))}
            </Slider>
        </div>
    );
}