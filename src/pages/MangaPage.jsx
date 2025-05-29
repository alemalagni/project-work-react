import axios from "axios";
import { useEffect, useState } from "react";
import MangaCard from "../components/MangaCard";

function MangaPage() {
    const [manga, setManga] = useState([]);
    const [search, setSearch] = useState('');
    const [order, setOrder] = useState(0)

    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(28);
    const [totalItems, setTotalItems] = useState(0);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const totalPages = Math.ceil(totalItems / itemsPerPage);

    function getManga() {
        setLoading(true);
        setError(null);

        axios.get(`${import.meta.env.VITE_PUBLIC_PATH}manga`, {
            params: {
                search: search,
                page: currentPage,
                limit: itemsPerPage
            }
        })
            .then(res => {
                console.log("Dati ricevuti dal backend:", res.data);
                setManga(res.data.items);
                setTotalItems(res.data.totalItems);
            })
            .catch(err => {
                console.error("Errore nel fetch dei manga:", err);
                setError("Impossibile caricare i manga. Riprova più tardi.");
            })
            .finally(() => {
                setLoading(false);
            });
    }

    function orderManga(e) {
        e.preventDefault();
        alert("Non ancora funzionante")
    }

    function searchManga(e) {
        e.preventDefault();
        if (currentPage === 1) {
            getManga();
        } else {
            setCurrentPage(1);
        }
    }

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(prevPage => prevPage + 1);
        }
    };

    const handlePrevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(prevPage => prevPage - 1);
        }
    };

    const handleFirstPage = () => {
        if (currentPage !== 1) {
            setCurrentPage(1);
        }
    };

    const handleLastPage = () => {
        if (currentPage !== totalPages) {
            setCurrentPage(totalPages);
        }
    };

    const handleNext5Page = () => {
        if (currentPage < (totalPages - 4)) {
            setCurrentPage(prevPage => prevPage + 5);
        }
    };

    const handlePrev5Page = () => {
        if (currentPage > 5) {
            setCurrentPage(prevPage => prevPage - 5);
        }
    };

    useEffect(() => {
        getManga();
    }, [currentPage, itemsPerPage]);

    if (loading) {
        return (
            <div className="container my-5 text-center">
                <p>Caricamento manga...</p>
                <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="container my-5 text-center">
                <p className="text-danger">{error}</p>
            </div>
        );
    }

    return (
        <>
            <div className="container my-5">
                <div className="d-flex justify-content-between align-items-center mt-4">
                    <h1>Lista di manga</h1>
                    <div className="d-flex">
                        <div className="p-3">
                            <select class="form-select" aria-label="Default select example" onChange={orderManga}>
                                <option value="0" selected>Ordina per...</option>
                                <option value="1">Prezzo crescente</option>
                                <option value="2">Prezzo decrescente</option>
                                <option value="3">Nome (da A a Z)</option>
                                <option value="4">Nome (da Z a A)</option>
                                <option value="5">Più recente</option>
                                <option value="6">Più vecchio</option>
                            </select>
                        </div>

                        {/* Form di ricerca */}
                        <form className="row g-3 align-items-center" onSubmit={searchManga}>

                            <div className="col-auto">
                                <label htmlFor="searchInput" className="visually-hidden">Cerca</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="searchInput"
                                    placeholder="Cerca"
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                />
                            </div>
                            <div className="col-auto">
                                <button type="submit" className="btn btn-primary">Cerca</button>
                            </div>
                        </form>
                    </div>
                </div>

                {/* Visualizzazione dei manga */}
                <div className="row mt-4">
                    {manga.length > 0 ? (
                        manga.map(mangaItem => (
                            <div key={mangaItem.id} className="col-12 col-md-4 col-lg-3 mt-3">
                                <MangaCard data={mangaItem} />
                            </div>
                        ))
                    ) : (
                        <div className="col-12 text-center mt-3">Nessun elemento trovato. Prova con una ricerca diversa o controlla i filtri.</div>
                    )}
                </div>

                {/* Controlli di paginazione */}
                {totalItems > 0 && totalPages > 1 && (
                    <div className="d-flex justify-content-center mt-5 mb-4">
                        {/* TASTO: Prima Pagina */}
                        <button
                            className="btn btn-outline-secondary me-2"
                            onClick={handleFirstPage}
                            disabled={currentPage === 1 || loading}
                        >
                            {currentPage > 1 ? `Prima Pagina` : '-'}
                        </button>

                        {/* TASTO: Pagina Precedente di 5 */}
                        <button
                            className="btn btn-outline-success me-2"
                            onClick={handlePrev5Page}
                            disabled={currentPage <= 5 || loading}
                        >
                            {currentPage > 5 ? `Pagina ${currentPage - 5}` : '-'}
                        </button>

                        {/* TASTO: Pagina Precedente */}
                        <button
                            className="btn btn-outline-primary me-2"
                            onClick={handlePrevPage}
                            disabled={currentPage === 1 || loading}
                        >
                            {currentPage > 1 ? `Pagina ${currentPage - 1}` : '-'}
                        </button>

                        {/* RIFERIMENTO PAGINA AL CENTRO */}
                        <span className="align-self-center fs-5 px-3">
                            Pagina {currentPage} di {totalPages}
                        </span>

                        {/* TASTO: Pagina Successiva */}
                        <button
                            className="btn btn-outline-primary ms-2"
                            onClick={handleNextPage}
                            disabled={currentPage === totalPages || loading}
                        >
                            {currentPage < totalPages ? `Pagina ${currentPage + 1}` : '-'}
                        </button>

                        {/* TASTO: Pagina Successiva di 5*/}
                        <button
                            className="btn btn-outline-success ms-2"
                            onClick={handleNext5Page}
                            disabled={currentPage >= (totalPages - 4) || loading}
                        >
                            {currentPage < (totalPages - 4) ? `Pagina ${currentPage + 5}` : '-'}
                        </button>

                        {/* TASTO: Ultima Pagina */}
                        <button
                            className="btn btn-outline-secondary ms-2"
                            onClick={handleLastPage}
                            disabled={currentPage === totalPages || loading}
                        >
                            {currentPage < totalPages ? `Ultima Pagina` : '-'}
                        </button>
                    </div>
                )}
            </div>
        </>
    );
}

export default MangaPage;