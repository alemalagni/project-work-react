import axios from "axios";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import MangaCard from "../components/MangaCard";
import MangaListCard from "../components/MangaListCard";

function MangaPage() {
    const [manga, setManga] = useState([]);
    const [search, setSearch] = useState('');
    const [order, setOrder] = useState('')
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(20);
    const [totalItems, setTotalItems] = useState(0);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const totalPages = Math.ceil(totalItems / itemsPerPage);

    const [searchParams, setSearchParams] = useSearchParams();

    const [isInitialized, setIsInitialized] = useState(false);

    const [viewMode, setViewMode] = useState("grid")

    useEffect(() => {
        const urlOrder = searchParams.get('order') || '';
        const urlSearch = searchParams.get('search') || '';
        const urlPage = parseInt(searchParams.get('page')) || 1;

        setOrder(urlOrder);
        setSearch(urlSearch);
        setCurrentPage(urlPage);
        setIsInitialized(true);
    }, []);

    useEffect(() => {
        if (!isInitialized) return;
        getManga();
    }, [order, search, currentPage, isInitialized]);

    useEffect(() => {
        if (!isInitialized) return;
        const newParams = new URLSearchParams();

        if (order) newParams.set("order", order);
        if (search) newParams.set("search", search);
        if (currentPage !== 1) newParams.set("page", currentPage);

        setSearchParams(newParams);
    }, [order, search, currentPage]);

    function getManga() {
        // setLoading(true);
        setError(null);

        axios.get(`${import.meta.env.VITE_PUBLIC_PATH}manga`, {
            params: {
                search: search,
                page: currentPage,
                limit: itemsPerPage,
                order: order
            }
        })
            .then(res => {
                setManga(res.data.items);
                setTotalItems(res.data.totalItems);
            })
            .catch(err => {
                setError("Impossibile caricare i manga. Riprova più tardi.");
            })
    }

    function orderManga(e) {
        const selectedOrder = e.target.value;
        setOrder(selectedOrder);
        setCurrentPage(1);

        const newParams = new URLSearchParams(searchParams);
        if (selectedOrder) {
            newParams.set("order", selectedOrder);
        } else {
            newParams.delete("order");
        }
        setSearchParams(newParams);
    }

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

                        <div className="p-3">
                            <select
                                className="form-select"
                                aria-label="Default select example"
                                onChange={orderManga}
                                value={order}
                            >
                                <option value="">Ordina per...</option>
                                <option value="manga.price ASC">Prezzo crescente</option>
                                <option value="manga.price DESC">Prezzo decrescente</option>
                                <option value="manga.title ASC">Nome (da A a Z)</option>
                                <option value="manga.title DESC">Nome (da Z a A)</option>
                                <option value="manga.release_date DESC">Più recente</option>
                                <option value="manga.release_date ASC">Più vecchio</option>
                            </select>
                        </div>

                        {/* Form di ricerca */}
                        <div className="row g-3 align-items-center">
                            <div className="col-auto">
                                <label htmlFor="searchInput" className="visually-hidden">Cerca</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="searchInput"
                                    placeholder="Cerca"
                                    value={search}
                                    onChange={(e) => {
                                        setSearch(e.target.value);
                                        setCurrentPage(1);
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Visualizzazione dei manga */}
                {manga.length > 0 ? (
                    viewMode === "grid" ? (
                        <div className="row mt-4">
                            {manga.map(mangaItem => (
                                <div key={mangaItem.id} className="col-12 col-md-4 col-lg-3 mt-3">
                                    <MangaCard data={mangaItem} />
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="list-group mt-4">
                            {manga.map(mangaItem => (
                                <div key={mangaItem.id} className="list-group-item">
                                    <MangaListCard data={mangaItem} />
                                </div>
                            ))}
                        </div>
                    )
                ) : (
                    <div className="col-12 text-center mt-3">
                        Nessun elemento trovato. Prova con una ricerca diversa o controlla i filtri.
                    </div>
                )}

                {/* Controlli di paginazione */}
                {totalItems > 0 && totalPages > 1 && (
                    <div className="d-flex justify-content-center mt-5 mb-4 flex-wrap">
                        {Array.from({ length: totalPages }, (_, i) => i + 1)
                            .filter(pageNum =>
                                // Mostra sempre la prima, l'ultima, la corrente e le 2 vicine
                                pageNum === 1 ||
                                pageNum === totalPages ||
                                (pageNum >= currentPage - 2 && pageNum <= currentPage + 2)
                            )
                            .map((pageNum, idx, arr) => {
                                // Aggiungi "..." dove necessario
                                const prevPage = arr[idx - 1];
                                return (
                                    <span key={pageNum}>
                                        {prevPage && pageNum - prevPage > 1 && (
                                            <span className="mx-1">...</span>
                                        )}
                                        <button
                                            className={`btn mx-1 ${currentPage === pageNum ? "btn-primary" : "btn-outline-primary"}`}
                                            onClick={() => setCurrentPage(pageNum)}
                                            disabled={currentPage === pageNum}
                                        >
                                            {pageNum}
                                        </button>
                                    </span>
                                );
                            })}
                    </div>
                )}
            </div>
        </>
    );
}

export default MangaPage;