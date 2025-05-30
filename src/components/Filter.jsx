const Filter = ({
    isOffcanvasOpen,
    setIsOffcanvasOpen,
    filterPriceRange,
    setFilterPriceRange,
    filterEditorialLine,
    setFilterEditorialLine,
}) => {
    // Handler per applicare i filtri e chiudere l'offcanvas
    const handleApplyFilters = () => {
        const closeButton = document.querySelector('#filterOffcanvas .btn-close');
        if (closeButton) {
            closeButton.click();
        }
    };

    return (
        <div className="offcanvas offcanvas-end" tabIndex="-1" id="filterOffcanvas" aria-labelledby="filterOffcanvasLabel">
            <div className="offcanvas-header">
                <h5 className="offcanvas-title" id="filterOffcanvasLabel">Filtri</h5>
                <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"
                    onClick={() => setIsOffcanvasOpen(false)} // Aggiorna lo stato React alla chiusura
                ></button>
            </div>
            <div className="offcanvas-body">
                {/* Filtro per il prezzo (range) */}
                <div className="mb-3">
                    <label htmlFor="priceRange" className="form-label">
                        Prezzo Max: {filterPriceRange.toFixed(2)}€
                    </label>
                    <input
                        type="range"
                        className="form-range"
                        id="priceRange"
                        min="0.00"
                        max="50.00"
                        step="0.01"
                        value={filterPriceRange}
                        onChange={(e) => setFilterPriceRange(parseFloat(e.target.value))}
                    />
                </div>

                {/* Filtro per Linea Editoriale (select) */}
                <div className="mb-3">
                    <label htmlFor="editorialLine" className="form-label d-block">Genere:</label>
                    <select
                        className="form-select"
                        id="editorialLine"
                        value={filterEditorialLine}
                        onChange={(e) => setFilterEditorialLine(e.target.value)}
                    >
                        <option value="">Tutti</option>
                        <option value="Shonen">Shonen</option>
                        <option value="Shojo">Shojo</option>
                        <option value="Seinen">Seinen</option>
                        <option value="Josei">Josei</option>
                        <option value="Kodomo">Kodomo</option>
                        <option value="Mecha">Mecha</option>
                        <option value="Spokon">Spokon</option>
                        <option value="Romakome">Romakome</option>
                        <option value="Aniparo">Aniparo</option>
                        <option value="Gekiga">Gekiga</option>
                        <option value="Gore">Gore</option>
                        <option value="Meitantei">Meitantei</option>
                        <option value="Thriller">Thriller</option>
                        <option value="Fantasy">Fantasy</option>
                        <option value="Horror">Horror</option>
                        <option value="Storico">Storico</option>
                        <option value="Commedia">Commedia</option>
                        <option value="Drammatico">Drammatico</option>
                        <option value="Sci-fi">Sci-fi</option>
                        <option value="Slice of Life">Slice of Life</option>
                        <option value="Harem">Harem</option>
                        <option value="Yuri">Yuri</option>
                        <option value="Yaoi">Yaoi</option>
                        <option value="Cyberpunk">Cyberpunk</option>
                    </select>
                </div>

                <div className="d-grid mt-4">
                    <button className="btn btn-primary" onClick={handleApplyFilters}>Applica Filtri</button>
                </div>
            </div>
        </div>
    );
}

export default Filter;