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
    const [manga, setManga] = useState([]); // Gli elementi della pagina corrente
    const [search, setSearch] = useState(''); // Stato per il campo di ricerca

    // Stati per la paginazione
    const [currentPage, setCurrentPage] = useState(1); // Pagina corrente, inizia da 1
    const [itemsPerPage] = useState(28); // Elementi per pagina (deve corrispondere al backend default)
    const [totalItems, setTotalItems] = useState(0); // Totale degli elementi filtrati (dal backend)

    // Stati per UI/UX
    const [loading, setLoading] = useState(true); // Stato di caricamento
    const [error, setError] = useState(null); // Stato per gli errori

    // Calcola il numero totale di pagine
    const totalPages = Math.ceil(totalItems / itemsPerPage);

    function getManga() {
        setLoading(true); // Inizia il caricamento
        setError(null);    // Resetta errori precedenti

        // Modifica la chiamata Axios per includere i parametri di ricerca E paginazione
        axios.get(`${import.meta.env.VITE_PUBLIC_PATH}manga`, {
            params: {
                search: search,      // Parametro per la ricerca
                page: currentPage,   // Parametro per la pagina corrente
                limit: itemsPerPage  // Parametro per il limite di elementi per pagina
            }
        })
            .then(res => {
                console.log("Dati ricevuti dal backend:", res.data);
                // Il backend dovrebbe restituire { items: [...], totalItems: N, currentPage: X, ... }
                setManga(res.data.items);
                setTotalItems(res.data.totalItems);
            })
            .catch(err => {
                console.error("Errore nel fetch dei manga:", err);
                setError("Impossibile caricare i manga. Riprova più tardi.");
            })
            .finally(() => {
                setLoading(false); // Fine caricamento
            });
    }

    // Gestore per la sottomissione del form di ricerca
    function searchManga(e) {
        e.preventDefault();
        setCurrentPage(1); // Quando si effettua una nuova ricerca, resetta alla prima pagina
        // getManga() verrà chiamato dall'useEffect grazie alla dipendenza 'search'
    };

    // Gestori per i pulsanti di paginazione
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

    // Effetto per chiamare l'API quando la pagina corrente o il termine di ricerca cambiano
    useEffect(() => {
        getManga();
    }, [currentPage, itemsPerPage, search]); // Dipendenze: ricarica quando cambia la pagina, il limite o il termine di ricerca

    // Messaggi di stato UI
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
                        manga.map(mangaItem => ( // Ho rinominato la variabile di iterazione per evitare conflitti
                            <div key={mangaItem.id} className="col-12 col-md-4 col-lg-3 mt-3"> {/* Aggiunto col-lg-3 per 4 colonne su schermi grandi */}
                                <MangaCard data={mangaItem} />
                            </div>
                        ))
                    ) : (
                        <div className="col-12 text-center mt-3">Nessun elemento trovato. Prova con una ricerca diversa o controlla i filtri.</div>
                    )}
                </div>

                {/* Controlli di paginazione */}
                {totalItems > 0 && totalPages > 1 && ( // Mostra i controlli solo se ci sono elementi e più di una pagina
                    <div className="d-flex justify-content-center mt-5 mb-4">
                        <button
                            className="btn btn-outline-primary me-2" // Usato outline per minor enfasi
                            onClick={handlePrevPage}
                            disabled={currentPage === 1 || loading} // Disabilita anche durante il caricamento
                        >
                            Pagina Precedente
                        </button>
                        <span className="align-self-center fs-5 px-3"> {/* Aggiunto fs-5 per testo più grande, px-3 per padding */}
                            Pagina {currentPage} di {totalPages}
                        </span>
                        <button
                            className="btn btn-outline-primary ms-2" // Usato outline per minor enfasi
                            onClick={handleNextPage}
                            disabled={currentPage === totalPages || loading} // Disabilita anche durante il caricamento
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