import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function MangaDetailsPage() {

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const { slug } = useParams();

    const [manga, setManga] = useState([])

    function getManga() {
        axios.get(import.meta.env.VITE_PUBLIC_PATH + `manga/${slug}`)
            .then(res => {
                setManga(res.data)
            })
            .catch(err => console.log(err))
    }

    useEffect(() => {
        getManga()
    }, [])

    const prezzo = String(manga.price);
    let decimale = prezzo.slice(prezzo.indexOf(".") + 1);

    if (prezzo.slice(prezzo.indexOf(".") + 1).length === 1) {
        decimale = prezzo.slice(prezzo.indexOf(".") + 1) + "0";
    } else if (prezzo.slice(prezzo.indexOf(".") + 1).length === 0) {
        decimale = "00";
    } else if (prezzo.slice(prezzo.indexOf(".") + 1).length === 2) {
        decimale = prezzo.slice(prezzo.indexOf(".") + 1);
    }

    const prezzoNuovo = prezzo.slice(0, prezzo.indexOf(".")) + "," + decimale;

    // CALCOLO DELLO SCONTO
    const prezzoBaseNumerico = parseFloat(manga.price);
    // controllo che sia numero
    const discountPercentualeNumerico = Number(manga.discount);
    const discount = discountPercentualeNumerico / 100;
    const prezzoScontatoNumerico = prezzoBaseNumerico * (1 - discount);
    const prezzoScontatoFormattato = prezzoScontatoNumerico.toFixed(2).replace(".", ",");

    return (

        <>
            <div className="container pb-5 pt-5">
                <div className="row">
                    <div className="col-md-6 px-5 mb-4">
                        <img src={manga.imagePath} className="img-fluid rounded shadow" alt={manga.title} />
                    </div>

                    <div className="col-md-6">
                        <h1 className="mb-2">{manga.title}</h1>
                        <h5 className="text-muted">Serie: {manga.serie}</h5>

                        <button className="btn btn-warning text-primary-emphasis btn-lg px-5 mt-4">
                            <i className="fas fa-shopping-cart me-2"></i>Aggiungi al carrello
                        </button>

                        <p className="mt-4">
                            {manga.description}
                        </p>

                        <div className="row mt-4">
                            <div className="col-md-6">
                                <ul className="list-unstyled">
                                    <li>Autore: <strong>{manga.author}</strong></li>
                                    <li className="mt-1" >{Number(manga.discount) > 0 ? (
                                        <>
                                            <span>Prezzo: </span>
                                            <span className="text-decoration-line-through text-muted me-2">
                                                <strong>{` ${prezzoNuovo}€`}</strong>
                                            </span>
                                            <span className="text-danger">
                                                <strong>{` ${prezzoScontatoFormattato}€`}</strong>
                                            </span>
                                        </>
                                    ) : (
                                        <span>
                                            Prezzo: <strong>{` ${prezzoNuovo}€`}</strong>
                                        </span>
                                    )} </li>
                                    <li className="mt-1">ISBN: <strong>{manga.ISBN}</strong></li>
                                    <li className="mt-1">Numero di pagine: <strong>{manga.pages}</strong></li>
                                    <li className="mt-1">Data uscita: <strong>{manga.release_date ? manga.release_date.slice(0, 10) : <p></p>}</strong></li>
                                </ul>
                            </div>
                            <div className="col-md-6">
                                <p><strong>Genere:</strong></p>
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
                    </div>
                </div>
            </div>

        </>

    )
}

export default MangaDetailsPage;