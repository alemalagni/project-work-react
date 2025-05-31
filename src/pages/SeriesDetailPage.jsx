
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import MangaCard from "../components/MangaCard";
import MangaListCard from "../components/MangaListCard";

function prezzo(price) {

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const prezzo = String(price);
    let decimale = prezzo.slice(prezzo.indexOf(".") + 1);

    if (prezzo.slice(prezzo.indexOf(".") + 1).length === 1) {
        decimale = prezzo.slice(prezzo.indexOf(".") + 1) + "0";
    } else if (prezzo.slice(prezzo.indexOf(".") + 1).length === 0) {
        decimale = "00";
    } else if (prezzo.slice(prezzo.indexOf(".") + 1).length === 2) {
        decimale = prezzo.slice(prezzo.indexOf(".") + 1);
    }

    const newPrice = prezzo.slice(0, prezzo.indexOf(".")) + "," + decimale;
    return newPrice;
}

function SerieDetailsPage() {
    const { slug } = useParams();
    const [serie, setSerie] = useState(null);
    const [volumi, setVolumi] = useState([]);

    const [searchParams, setSearchParams] = useSearchParams();
    const [isInitialized, setIsInitialized] = useState(false);
    const [viewMode, setViewMode] = useState("grid")

    useEffect(() => {
        axios.get(import.meta.env.VITE_PUBLIC_PATH + `manga/series/${slug}`)
            .then(res => {
                setSerie(res.data.series);
                setVolumi(res.data.manga);
            })
            .catch(err => console.error(err));
    }, [slug]);



    useEffect(() => {
        const urlView = searchParams.get('view') || 'grid';

        if (['grid', 'list'].includes(urlView)) {
            setViewMode(urlView);
        } else {
            setViewMode('grid');
        }
        setIsInitialized(true);
    }, []);

    useEffect(() => {
        if (!isInitialized) return;
        const newParams = new URLSearchParams();

        if (viewMode && viewMode !== 'grid') {
            newParams.set("view", viewMode)
        }

        setSearchParams(newParams, { replace: true });
    }, [viewMode]);


    if (!serie) {
        return <p>Caricamento...</p>;
    }

    return (
        <div className="container mt-2">
            <div className="position-relative">
                <img
                    className="card-img-top  rounded-top-4"
                    src={import.meta.env.VITE_PUBLIC_PATH + serie.image_series}
                    alt={serie.name}
                    style={{
                        height: "400px",
                        objectFit: "cover",
                        objectPosition: "top",
                        backgroundColor: "#f8f8f8", // per riempire eventuali spazi vuoti
                    }}
                />
                <div className="fade-bottom" />
            </div>
            <div>
                <h1 className="mb-4" style={{ fontSize: "3rem" }}>{serie.name}</h1>
                <div className="d-flex gap-3">
                    <h4>Volumi: <strong>{serie.number_volumes}</strong></h4>
                    <h4>Autore: <strong>{serie.author}</strong></h4>
                </div>
                <div className="mt-2 mb-5">
                    <h5> {serie.description} </h5>
                </div>
            </div>

            {/* bottoni per paginazione griglia o lista */}
            <div className="d-flex align-items-center gap-2">
                <button
                    className={`btn btn-sm ${viewMode === "grid" ? "btn-primary" : "btn-outline-primary"}`}
                    onClick={() => setViewMode("grid")}
                    title="griglia"
                >
                    <i className="fas fa-th"></i>
                </button>
                <button
                    className={`btn btn-sm ${viewMode === "list" ? "btn-primary" : "btn-outline-primary"}`}
                    onClick={() => setViewMode("list")}
                    title="lista"
                >
                    <i className="fas fa-list"></i>
                </button>
            </div>

            {/* visualizzazione manga */}
            <div className="row mb-5">
                {volumi.length > 0 ? (
                    viewMode === "grid" ? (
                        <div className="row mt-4">
                            {volumi.map(volumiItem => (
                                <div key={volumiItem.id} className="col-12 col-md-4 col-lg-3 mt-3">
                                    <MangaCard data={volumiItem} />
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="list-group mt-4">
                            {volumi.map(volumiItem => (
                                <div key={volumiItem.id} className="list-group-item">
                                    <MangaListCard data={volumiItem} />
                                </div>
                            ))}
                        </div>
                    )
                ) : (
                    <p>Nessun volume trovato.</p>
                )}

            </div>
        </div>
    );
}

export default SerieDetailsPage;
