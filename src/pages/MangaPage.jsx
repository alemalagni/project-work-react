import axios from "axios";
import { useEffect, useState } from "react";
import MangaCard from "../components/MangaCard";


// function MangaPage() {

//     const [manga, setManga] = useState([]);
//     const [search, setSearch] = useState('');

//     function getManga() {
//         axios.get(import.meta.env.VITE_PUBLIC_PATH + 'manga', {
//             params: {
//                 search
//             }
//         })
//             .then(res => {
//                 console.log(res.data)
//                 setManga(res.data)
//             })
//             .catch(err => console.log(err))
//     };

//     function searchManga(e) {
//         e.preventDefault();
//         getManga();
//     };

//     useEffect(() => {
//         getManga()
//     }, []);

//     return (

//         <>
//             <div className="container my-5">

//                 <div className="d-flex justify-content-between mt-4">
//                     <h1>Lista di manga</h1>
//                     <form className="row g-3" onSubmit={searchManga}>
//                         <div className="col-auto">
//                             <label className="visually-hidden">Cerca</label>
//                             <input type="text" className="form-control" placeholder="Cerca"
//                                 value={search} onChange={(e) => setSearch(e.target.value)} />
//                         </div>
//                         <div className="col-auto">
//                             <button type="submit" className="btn btn-primary mb-3">Cerca</button>
//                         </div>
//                     </form>
//                 </div>
//                 <div className="row">
//                     {manga.length ? manga.map(manga => (
//                         <div key={manga.id} className="col-12 col-md-4 mt-3">
//                             <MangaCard data={manga} />
//                         </div>
//                     )) : <div>Nessun elemento trovato</div>}

//                 </div>
//             </div>

//         </>

//     )
// }



function MangaPage() {
    const [manga, setManga] = useState([]);
    const [search, setSearch] = useState('');
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


    function searchManga(e) {
        e.preventDefault();
        setCurrentPage(1);
    };

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

    useEffect(() => {
        getManga();
    }, [currentPage, itemsPerPage, search]);

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
                            <button type="submit" className="btn btn-primary mb-3">Cerca</button>
                        </div>
                    </form>
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

                {totalItems > 0 && totalPages > 1 && (
                    <div className="d-flex justify-content-center mt-5 mb-4">
                        <button
                            className="btn btn-outline-primary me-2"
                            onClick={handlePrevPage}
                            disabled={currentPage === 1 || loading}
                        >
                            Pagina Precedente
                        </button>
                        <span className="align-self-center fs-5 px-3">
                            Pagina {currentPage} di {totalPages}
                        </span>
                        <button
                            className="btn btn-outline-primary ms-2"
                            onClick={handleNextPage}
                            disabled={currentPage === totalPages || loading}
                        >
                            Pagina Successiva
                        </button>
                    </div>
                )}
            </div>
        </>
    );
}

export default MangaPage;