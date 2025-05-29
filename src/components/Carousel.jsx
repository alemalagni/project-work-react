import Slider from "react-slick";

const mangaList = [
    { title: "Naruto", img: "/img/naruto.jpg", desc: "Un ninja determinato!" },
    { title: "One Piece", img: "/img/onepiece.jpg", desc: "Alla ricerca del tesoro!" },
    { title: "Bleach", img: "/img/bleach.jpg", desc: "Combattimenti tra anime!" },
    { title: "Dragon Ball", img: "/img/dragonball.jpg", desc: "Le avventure di Goku!" },
    { title: "Attack on Titan", img: "/img/aot.jpg", desc: "Titani e misteri!" }
];

export default function MangaCarousel() {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 4, // Quante card vuoi vedere per volta
        slidesToScroll: 1,
        responsive: [
            {
                breakpoint: 992,
                settings: { slidesToShow: 2 }
            },
            {
                breakpoint: 768,
                settings: { slidesToShow: 1 }
            }
        ]
    };

    return (
        <div className="container my-5">
            <Slider {...settings}>
                {mangaList.map((manga) => (
                    <div key={manga.title} className="px-2">
                        <div className="card" style={{ width: "16rem" }}>
                            <img src={manga.img} className="card-img-top" alt={manga.title} />
                            <div className="card-body">
                                <h5 className="card-title">{manga.title}</h5>
                                <p className="card-text">{manga.desc}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </Slider>
        </div>

    );
}