
import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

function SerieDetailsPage() {
    const { slug } = useParams();
    const [volumi, setVolumi] = useState([]);

    useEffect(() => {
        axios.get(import.meta.env.VITE_PUBLIC_PATH + `manga/series/${slug}`)
            .then(res => {
                setVolumi(res.data);
            })
            .catch(err => console.error(err));
    }, [slug]);

    return (
        <div className="container mt-5">
            <h2 className="mb-4">Volumi della serie: <span className="text-capitalize">{slug}</span></h2>
            <div className="row">
                {volumi.length ? volumi.map(volume => (
                    <div key={volume.id} className="col-md-3 mb-4">
                        <div className="card h-100">
                            <Link to={`/manga/${slug}`}>
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
