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
            <div className="container my-5">
                <div className="row align-items-center">
                    <div className="col-md-6 text-center mb-4 mb-md-0">
                        <img className="img-fluid rounded shadow" src={manga.imagePath}
                            alt={manga.title} style={{ maxHeight: "400px", objectFit: "cover" }} />
                    </div>
                    <div className="col-md-6 d-flex flex-column justify-content-center">
                        <h1 className="mb-3">{manga.title}</h1>
                        <p>Release Date: <strong>{manga.release_date}</strong></p>
                        <p>Genre: <strong>{manga.genre}</strong></p>
                        <p>Author: <strong>{manga.author}</strong></p>
                        <p>ISBN: <strong>{manga.ISBN}</strong></p>
                    </div>
                </div>
            </div>
        </>

    )
}

export default MangaDetailsPage;