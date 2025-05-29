
import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

function SerieDetailsPage() {
    const { slug } = useParams();
    const [serie, setSerie] = useState(null);
    const [volumi, setVolumi] = useState([]);

    useEffect(() => {
        axios.get(import.meta.env.VITE_PUBLIC_PATH + `manga/series/${slug}`)
            .then(res => {
                setSerie(res.data.series);
                setVolumi(res.data.manga);
            })
            .catch(err => console.error(err));
    }, [slug]);

    if (!serie) {
        return <p>Caricamento...</p>;
    }

    return (
        <div className="container mt-5">
            <div>
                <img
                    className="card-img-top  rounded-top-4"
                    src={import.meta.env.VITE_PUBLIC_PATH + serie.image_series}
                    alt={serie.name}
                    style={{
                        height: "300px",
                        objectFit: "cover",
                        backgroundColor: "#f8f8f8", // per riempire eventuali spazi vuoti
                    }}
                />
            </div>
            <h2 className="mb-4">Volumi della serie: <span className="text-capitalize">{slug}</span></h2>
            <div className="row">
                {volumi.length ? volumi.map(volume => (
                    <div key={volume.id} className="col-md-3 mb-4">
                        <div className="card h-100">
                            <Link to={`/manga/${volume.slug}`}>
                                <img src={volume.imagePath} alt={volume.title} className="card-img-top" />

                            </Link>
                            <div className="card-body">
                                <h5 className="card-title">{volume.title}</h5>
                                <p className="card-text">Volume #{volume.volume_number}</p>
                            </div>
                        </div>
                    </div>
                )) : <p>Nessun volume trovato.</p>}
            </div>
        </div>
    );
}

export default SerieDetailsPage;
