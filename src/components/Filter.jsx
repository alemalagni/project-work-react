// const Filter = ({
//     isOffcanvasOpen,
//     setIsOffcanvasOpen,
//     filterPriceRange,
//     setFilterPriceRange,
//     filterEditorialLine,
//     setFilterEditorialLine,
// }) => {
//     // Handler per applicare i filtri e chiudere l'offcanvas
//     const handleApplyFilters = () => {
//         const closeButton = document.querySelector('#filterOffcanvas .btn-close');
//         if (closeButton) {
//             closeButton.click();
//         }
//     };

//     return (
//         <div className="offcanvas offcanvas-end" tabIndex="-1" id="filterOffcanvas" aria-labelledby="filterOffcanvasLabel">
//             <div className="offcanvas-header">
//                 <h5 className="offcanvas-title" id="filterOffcanvasLabel">Filtri</h5>
//                 <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"
//                     onClick={() => setIsOffcanvasOpen(false)} // Aggiorna lo stato React alla chiusura
//                 ></button>
//             </div>
//             <div className="offcanvas-body">
//                 {/* Filtro per il prezzo (range) */}
//                 <div className="mb-3">
//                     <label htmlFor="priceRange" className="form-label">
//                         Prezzo Max: {filterPriceRange.toFixed(2)}€
//                     </label>
//                     <input
//                         type="range"
//                         className="form-range"
//                         id="priceRange"
//                         min="0.00"
//                         max="50.00"
//                         step="0.01"
//                         value={filterPriceRange}
//                         onChange={(e) => setFilterPriceRange(parseFloat(e.target.value))}
//                     />
//                 </div>

//                 {/* Filtro per Linea Editoriale (select) */}
//                 <div className="mb-3">
//                     <label htmlFor="editorialLine" className="form-label d-block">Genere:</label>
//                     <select
//                         className="form-select"
//                         id="editorialLine"
//                         value={filterEditorialLine}
//                         onChange={(e) => setFilterEditorialLine(e.target.value)}
//                     >
//                         <option value="">Tutti</option>
//                         <option value="Shonen">Shonen</option>
//                         <option value="Shojo">Shojo</option>
//                         <option value="Seinen">Seinen</option>
//                         <option value="Josei">Josei</option>
//                         <option value="Kodomo">Kodomo</option>
//                         <option value="Mecha">Mecha</option>
//                         <option value="Spokon">Spokon</option>
//                         <option value="Romakome">Romakome</option>
//                         <option value="Aniparo">Aniparo</option>
//                         <option value="Gekiga">Gekiga</option>
//                         <option value="Gore">Gore</option>
//                         <option value="Meitantei">Meitantei</option>
//                         <option value="Thriller">Thriller</option>
//                         <option value="Fantasy">Fantasy</option>
//                         <option value="Horror">Horror</option>
//                         <option value="Storico">Storico</option>
//                         <option value="Commedia">Commedia</option>
//                         <option value="Drammatico">Drammatico</option>
//                         <option value="Sci-fi">Sci-fi</option>
//                         <option value="Slice of Life">Slice of Life</option>
//                         <option value="Harem">Harem</option>
//                         <option value="Yuri">Yuri</option>
//                         <option value="Yaoi">Yaoi</option>
//                         <option value="Cyberpunk">Cyberpunk</option>
//                     </select>
//                 </div>

//                 <div className="d-grid mt-4">
//                     <button className="btn btn-primary" onClick={handleApplyFilters}>Applica Filtri</button>
//                 </div>
//             </div>
//         </div>
//     );
// }

// export default Filter;



// ------------------------verione pierdomenico---------------------



// import axios from 'axios';
// import React, { useEffect, useRef } from 'react';
// import { useParams } from 'react-router-dom';

// const Filter = ({
//     isOpen,
//     onClose, // Callback memoizzata da MangaPage per setIsOffcanvasOpen(false)
//     onApplyFilters, // Callback da MangaPage per applicare gli staged filters
//     stagedPriceRange,
//     setStagedPriceRange,
//     stagedEditorialLine,
//     setStagedEditorialLine,
//     stagedHasDiscount,
//     setStagedHasDiscount,
//     defaultMaxPrice
// }) => {
//     const offcanvasHtmlRef = useRef(null); // Riferimento all'elemento DOM dell'offcanvas
//     const bsOffcanvasInstanceRef = useRef(null); // Riferimento all'istanza JavaScript di Bootstrap Offcanvas

//     // Effetto 1: Inizializza l'istanza di Bootstrap Offcanvas al mount del componente
//     useEffect(() => {
//         if (offcanvasHtmlRef.current && window.bootstrap?.Offcanvas) {
//             if (!bsOffcanvasInstanceRef.current) {
//                 // console.log("Filter: Initializing Bootstrap Offcanvas JS instance");
//                 bsOffcanvasInstanceRef.current = new window.bootstrap.Offcanvas(offcanvasHtmlRef.current);
//             }
//         } else if (offcanvasHtmlRef.current && !window.bootstrap?.Offcanvas) {
//             console.warn(
//                 "Filter: Bootstrap (o bootstrap.Offcanvas) non trovato sull'oggetto 'window'. " +
//                 "Assicurati che lo script JS di Bootstrap dalla CDN sia caricato correttamente."
//             );
//         }

//         // Opzionale: Funzione di cleanup per distruggere l'istanza se il componente Filter viene smontato.
//         // Utile per prevenire memory leak in applicazioni più complesse o se Filter potesse essere rimosso dal DOM.
//         // const instanceToDispose = bsOffcanvasInstanceRef.current;
//         // return () => {
//         //     if (instanceToDispose && typeof instanceToDispose.dispose === 'function') {
//         //         console.log("Filter: Disposing Bootstrap Offcanvas JS instance");
//         //         instanceToDispose.dispose();
//         //     }
//         // };
//     }, []); // L'array di dipendenze vuoto assicura che questo effetto venga eseguito solo al mount e unmount.

//     // Effetto 2: Sincronizza lo stato React 'isOpen' con Bootstrap quando l'offcanvas
//     // viene chiuso da meccanismi esterni a React (es. tasto ESC, click sul backdrop).
//     useEffect(() => {
//         const htmlElement = offcanvasHtmlRef.current;
//         const offcanvasJsInstance = bsOffcanvasInstanceRef.current;

//         if (htmlElement && offcanvasJsInstance) {
//             const handleExternalClose = () => {
//                 // Se Bootstrap nasconde l'offcanvas, questo evento viene emesso.
//                 // Chiamiamo onClose() per assicurare che lo stato React 'isOffcanvasOpen'
//                 // in MangaPage sia aggiornato a false, mantenendo la sincronizzazione.
//                 // console.log("Filter: Bootstrap 'hidden.bs.offcanvas' event fired. Calling onClose().");
//                 onClose();
//             };

//             // 'hidden.bs.offcanvas' viene emesso dopo che l'offcanvas è completamente nascosto.
//             htmlElement.addEventListener('hidden.bs.offcanvas', handleExternalClose);

//             // Rimuovi l'event listener quando il componente viene smontato o 'onClose' cambia.
//             return () => {
//                 htmlElement.removeEventListener('hidden.bs.offcanvas', handleExternalClose);
//             };
//         }
//     }, [onClose]); // 'onClose' è memoizzata in MangaPage, quindi questo effetto si registra/deregistra in modo stabile.

//     // Effetto 3: Mostra o nasconde programmaticamente l'offcanvas
//     // in base alla prop 'isOpen' (controllata dallo stato React in MangaPage).
//     useEffect(() => {
//         const offcanvasJsInstance = bsOffcanvasInstanceRef.current;
//         if (offcanvasJsInstance) {
//             if (isOpen) {
//                 // console.log("Filter: React state 'isOpen' is true. Calling .show()");
//                 offcanvasJsInstance.show();
//             } else {
//                 // console.log("Filter: React state 'isOpen' is false. Calling .hide()");
//                 // È sicuro chiamare .hide() anche se Bootstrap potrebbe averlo già nascosto;
//                 // le API di Bootstrap sono generalmente idempotenti per queste azioni.
//                 offcanvasJsInstance.hide();
//             }
//         }
//     }, [isOpen]); // Questo effetto dipende solo dalla prop 'isOpen'.

//     // Funzione per resettare un singolo filtro (nello stato staging)
//     const handleResetIndividualFilter = (setterFunction, defaultValue) => {
//         setterFunction(defaultValue);
//     };

//     // Funzione per sottomettere i filtri (chiama la callback da MangaPage)
//     const handleSubmitFilters = () => {
//         onApplyFilters(); // onApplyFilters in MangaPage aggiornerà i filtri attivi e chiuderà l'offcanvas.
//     };

//     return (
//         <div
//             className="offcanvas offcanvas-end"
//             tabIndex="-1"
//             id="filterOffcanvas" // Assicurati che questo ID sia univoco se hai più offcanvas.
//             aria-labelledby="filterOffcanvasLabel"
//             ref={offcanvasHtmlRef} // Ref all'elemento DOM per l'istanza Bootstrap.
//         // Considera data-bs-backdrop="static" e data-bs-keyboard="false"
//         // se vuoi disabilitare la chiusura tramite backdrop click o ESC,
//         // il che semplificherebbe la gestione dello stato (non servirebbe l'event listener 'hidden.bs.offcanvas').
//         // Tuttavia, l'approccio con l'event listener è più user-friendly.
//         >
//             <div className="offcanvas-header">
//                 <h5 className="offcanvas-title" id="filterOffcanvasLabel">Filtri</h5>
//                 <button
//                     type="button"
//                     className="btn-close"
//                     aria-label="Close"
//                     onClick={onClose} // Chiamata diretta a onClose per aggiornare lo stato React in MangaPage.
//                 ></button>
//             </div>
//             <div className="offcanvas-body">
//                 {/* Filtro per il Prezzo (Range) */}
//                 <div className="mb-3">
//                     <div className="d-flex justify-content-between align-items-center mb-1">
//                         <label htmlFor="priceRangeFilterInput" className="form-label">
//                             Prezzo Max: {typeof stagedPriceRange === 'number' ? stagedPriceRange.toFixed(2) : parseFloat(stagedPriceRange || defaultMaxPrice).toFixed(2)}€
//                         </label>
//                         {/* Mostra il pulsante di reset solo se il valore non è quello di default */}
//                         {(typeof stagedPriceRange === 'number' && stagedPriceRange !== defaultMaxPrice) && (
//                             <button
//                                 type="button"
//                                 className="btn btn-sm btn-link text-decoration-none p-0"
//                                 onClick={() => handleResetIndividualFilter(setStagedPriceRange, defaultMaxPrice)}
//                                 title="Resetta prezzo"
//                                 style={{ lineHeight: 1 }}
//                             > x </button>
//                         )}
//                     </div>
//                     <input
//                         type="range"
//                         className="form-range"
//                         id="priceRangeFilterInput"
//                         min="0.00"
//                         max={typeof defaultMaxPrice === 'number' ? defaultMaxPrice.toFixed(2) : "50.00"}
//                         step="0.50" // Regola lo step se necessario (es. 1 per euro interi)
//                         value={typeof stagedPriceRange === 'number' ? stagedPriceRange : defaultMaxPrice}
//                         onChange={(e) => setStagedPriceRange(parseFloat(e.target.value))}
//                     />
//                 </div>

//                 {/* Filtro per Genere/Linea Editoriale (Select) */}
//                 <div className="mb-3">
//                     <div className="d-flex justify-content-between align-items-center mb-1">
//                         <label htmlFor="editorialLineFilterSelect" className="form-label d-block">Genere:</label>
//                         {stagedEditorialLine && ( // Mostra reset solo se un genere è selezionato
//                             <button
//                                 type="button"
//                                 className="btn btn-sm btn-link text-decoration-none p-0"
//                                 onClick={() => handleResetIndividualFilter(setStagedEditorialLine, '')}
//                                 title="Resetta genere"
//                                 style={{ lineHeight: 1 }}
//                             > x </button>
//                         )}
//                     </div>
//                     <select
//                         className="form-select"
//                         id="editorialLineFilterSelect"
//                         value={stagedEditorialLine}
//                         onChange={(e) => setStagedEditorialLine(e.target.value)}
//                     >
//                         <option value="">Tutti i generi</option>
//                         <option value="Shonen">Shonen</option>
//                         <option value="Seinen">Seinen</option>
//                         <option value="Thriller">Thriller</option>
//                         <option value="Fantasy">Fantasy</option>
//                         <option value="Horror">Horror</option>
//                         {/* Aggiungi altre opzioni di genere se necessario */}
//                     </select>
//                 </div>

//                 {/* Filtro per Sconto (Select) */}
//                 <div className="mb-3">
//                     <div className="d-flex justify-content-between align-items-center mb-1">
//                         <label htmlFor="discountStatusFilterSelect" className="form-label d-block">Stato Sconto:</label>
//                         {stagedHasDiscount !== null && ( // Mostra reset solo se non è "Qualsiasi"
//                             <button
//                                 type="button"
//                                 className="btn btn-sm btn-link text-decoration-none p-0"
//                                 onClick={() => handleResetIndividualFilter(setStagedHasDiscount, null)}
//                                 title="Resetta stato sconto"
//                                 style={{ lineHeight: 1 }}
//                             > x </button>
//                         )}
//                     </div>
//                     <select
//                         className="form-select"
//                         id="discountStatusFilterSelect"
//                         value={stagedHasDiscount === null ? "any" : (stagedHasDiscount ? "yes" : "no")}
//                         onChange={(e) => {
//                             if (e.target.value === "yes") setStagedHasDiscount(true);
//                             else if (e.target.value === "no") setStagedHasDiscount(false);
//                             else setStagedHasDiscount(null); // "any"
//                         }}
//                     >
//                         <option value="any">Qualsiasi</option>
//                         <option value="yes">In Sconto</option>
//                         <option value="no">Non in Sconto</option>
//                     </select>
//                 </div>

//                 {/* Pulsante per Applicare i Filtri */}
//                 <div className="d-grid mt-4">
//                     <button type="button" className="btn btn-primary" onClick={handleSubmitFilters}>
//                         Applica Filtri
//                     </button>
//                 </div>
//             </div>
//         </div>
//     );
// }

// export default Filter;



import axios from 'axios';
import { useEffect, useRef, useState } from 'react';

const Filter = ({
    isOpen,
    onClose,
    onApplyFilters,
    stagedPriceRange,
    setStagedPriceRange,
    stagedEditorialLine,
    setStagedEditorialLine,
    stagedHasDiscount,
    setStagedHasDiscount,
    defaultMaxPrice
}) => {
    const offcanvasHtmlRef = useRef(null);
    const bsOffcanvasInstanceRef = useRef(null);

    const [availableGenres, setAvailableGenres] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        axios.get(`${import.meta.env.VITE_PUBLIC_PATH}manga/genre`)
            .then(res => {
                if (res.status === 200) {
                    setAvailableGenres(res.data);
                    setError(null);
                } else {
                    setError("Errore nel caricamento dei generi.");
                }
            })
            .catch(err => {
                console.error("Errore nel caricamento dei generi:", err);
                setError("Impossibile caricare i generi. Riprova più tardi.");
            });
    }, []);


    // Effetto 1: Inizializza l'istanza di Bootstrap Offcanvas al mount del componente
    useEffect(() => {
        if (offcanvasHtmlRef.current && window.bootstrap?.Offcanvas) {
            if (!bsOffcanvasInstanceRef.current) {
                bsOffcanvasInstanceRef.current = new window.bootstrap.Offcanvas(offcanvasHtmlRef.current);
            }
        } else if (offcanvasHtmlRef.current && !window.bootstrap?.Offcanvas) {
            console.warn(
                "Filter: Bootstrap (o bootstrap.Offcanvas) non trovato sull'oggetto 'window'. " +
                "Assicurati che lo script JS di Bootstrap dalla CDN sia caricato correttamente."
            );
        }
    }, []);

    // Effetto 2: Sincronizza lo stato React 'isOpen' con Bootstrap quando l'offcanvas
    useEffect(() => {
        const htmlElement = offcanvasHtmlRef.current;
        const offcanvasJsInstance = bsOffcanvasInstanceRef.current;

        if (htmlElement && offcanvasJsInstance) {
            const handleExternalClose = () => {
                onClose();
            };

            htmlElement.addEventListener('hidden.bs.offcanvas', handleExternalClose);

            return () => {
                htmlElement.removeEventListener('hidden.bs.offcanvas', handleExternalClose);
            };
        }
    }, [onClose]);

    // Effetto 3: Mostra o nasconde programmaticamente l'offcanvas
    // in base alla prop 'isOpen' (controllata dallo stato React in MangaPage).
    useEffect(() => {
        const offcanvasJsInstance = bsOffcanvasInstanceRef.current;
        if (offcanvasJsInstance) {
            if (isOpen) {
                offcanvasJsInstance.show();
            } else {
                offcanvasJsInstance.hide();
            }
        }
    }, [isOpen]);

    // Funzione per resettare un singolo filtro (nello stato staging)
    const handleResetIndividualFilter = (setterFunction, defaultValue) => {
        setterFunction(defaultValue);
    };

    // Funzione per sottomettere i filtri (chiama la callback da MangaPage)
    const handleSubmitFilters = () => {
        onApplyFilters();
    };

    return (
        <div
            className="offcanvas offcanvas-end"
            tabIndex="-1"
            id="filterOffcanvas"
            aria-labelledby="filterOffcanvasLabel"
            ref={offcanvasHtmlRef}
        >
            <div className="offcanvas-header">
                <h5 className="offcanvas-title" id="filterOffcanvasLabel">Filtri</h5>
                <button
                    type="button"
                    className="btn-close"
                    aria-label="Close"
                    onClick={onClose}
                ></button>
            </div>
            <div className="offcanvas-body">
                {/* Filtro per il Prezzo (Range) */}
                <div className="mb-3">
                    <div className="d-flex justify-content-between align-items-center mb-1">
                        <label htmlFor="priceRangeFilterInput" className="form-label">
                            Prezzo Max: {typeof stagedPriceRange === 'number' ? stagedPriceRange.toFixed(2) : parseFloat(stagedPriceRange || defaultMaxPrice).toFixed(2)}€
                        </label>
                        {/* Mostra il pulsante di reset solo se il valore non è quello di default */}
                        {(typeof stagedPriceRange === 'number' && stagedPriceRange !== defaultMaxPrice) && (
                            <button
                                type="button"
                                className="btn btn-sm btn-link text-decoration-none p-0"
                                onClick={() => handleResetIndividualFilter(setStagedPriceRange, defaultMaxPrice)}
                                title="Resetta prezzo"
                                style={{ lineHeight: 1 }}
                            > x </button>
                        )}
                    </div>
                    <input
                        type="range"
                        className="form-range"
                        id="priceRangeFilterInput"
                        min="0.00"
                        max={typeof defaultMaxPrice === 'number' ? defaultMaxPrice.toFixed(2) : "50.00"}
                        step="0.50"
                        value={typeof stagedPriceRange === 'number' ? stagedPriceRange : defaultMaxPrice}
                        onChange={(e) => setStagedPriceRange(parseFloat(e.target.value))}
                    />
                </div>

                {/* Filtro per Genere/Linea Editoriale (Select) */}
                <div className="mb-3">
                    <div className="d-flex justify-content-between align-items-center mb-1">
                        <label htmlFor="editorialLineFilterSelect" className="form-label d-block">Genere:</label>
                        {stagedEditorialLine && (
                            <button
                                type="button"
                                className="btn btn-sm btn-link text-decoration-none p-0"
                                onClick={() => handleResetIndividualFilter(setStagedEditorialLine, '')}
                                title="Resetta genere"
                                style={{ lineHeight: 1 }}
                            > x </button>
                        )}
                    </div>
                    {error && <p className="text-danger">{error}</p>}
                    <select
                        className="form-select"
                        id="editorialLineFilterSelect"
                        value={stagedEditorialLine}
                        onChange={(e) => setStagedEditorialLine(e.target.value)}
                    >
                        <option value="">Tutti i generi</option>
                        {availableGenres.map((genreOption, index) => (
                            <option key={index} value={genreOption}>
                                {genreOption}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Filtro per Sconto (Select) */}
                <div className="mb-3">
                    <div className="d-flex justify-content-between align-items-center mb-1">
                        <label htmlFor="discountStatusFilterSelect" className="form-label d-block">Stato Sconto:</label>
                        {stagedHasDiscount !== null && (
                            <button
                                type="button"
                                className="btn btn-sm btn-link text-decoration-none p-0"
                                onClick={() => handleResetIndividualFilter(setStagedHasDiscount, null)}
                                title="Resetta stato sconto"
                                style={{ lineHeight: 1 }}
                            > x </button>
                        )}
                    </div>
                    <select
                        className="form-select"
                        id="discountStatusFilterSelect"
                        value={stagedHasDiscount === null ? "any" : (stagedHasDiscount ? "yes" : "no")}
                        onChange={(e) => {
                            if (e.target.value === "yes") setStagedHasDiscount(true);
                            else if (e.target.value === "no") setStagedHasDiscount(false);
                            else setStagedHasDiscount(null); // "any"
                        }}
                    >
                        <option value="any">Qualsiasi</option>
                        <option value="yes">In Sconto</option>
                        <option value="no">Non in Sconto</option>
                    </select>
                </div>

                {/* Pulsante per Applicare i Filtri */}
                <div className="d-grid mt-4">
                    <button type="button" className="btn btn-primary" onClick={handleSubmitFilters}>
                        Applica Filtri
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Filter;