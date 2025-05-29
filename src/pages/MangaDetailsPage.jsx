import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function MangaDetailsPage() {

    const { slug } = useParams();

    const [manga, setManga] = useState([])

    console.log(import.meta.env.VITE_PUBLIC_PATH)
    function getManga() {
        axios.get(import.meta.env.VITE_PUBLIC_PATH + `manga/${slug}`)
            .then(res => {
                console.log(res.data)
                setManga(res.data)
            })
            .catch(err => console.log(err))
    }

    useEffect(() => {
        getManga()
    }, [])

    return (

        <>
            <div className="container pb-5">
                <div className="row">
                    <div className="col-md-4 mb-4">
                        <img src={manga.imagePath} className="img-fluid rounded shadow" alt={manga.title} />
                    </div>

                    <div className="col-md-8">
                        <h2 className="mb-2">{manga.title}</h2>
                        <h5 className="text-muted">Serie: {manga.serie}</h5>
                        <p className="mt-3">
                            {manga.series_description}
                        </p>

                        <div className="row mt-4">
                            <div className="col-md-6">
                                <ul className="list-unstyled">
                                    <li>Author: <strong>{manga.author}</strong></li>
                                    <li>Price: <strong>{manga.price}</strong></li>
                                    <li>ISBN: <strong>{manga.ISBN}</strong></li>
                                    <li>Pages Number: <strong>{manga.pages}</strong></li>
                                    <li>Release Date: <strong>{manga.release_date}</strong></li>
                                </ul>
                            </div>
                            <div className="col-md-6">
                                <p><strong>Genres:</strong></p>
                                <div>
                                    {manga.genres_array &&
                                        manga.genres_array.map((genre) => (
                                            <span key={genre} className="badge bg-primary me-1">
                                                {genre}
                                            </span>
                                        ))}
                                </div>
                            </div>
                        </div>

                        <button className="btn btn-success mt-4">
                            <i className="fas fa-shopping-cart me-2"></i>Aggiungi al carrello
                        </button>
                    </div>
                </div>
            </div>

        </>

    )
}

export default MangaDetailsPage;