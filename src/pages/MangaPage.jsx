import axios from "axios";
import { useEffect, useState } from "react";
import MangaCard from "../components/MangaCard";


function MangaPage() {

    const [manga, setManga] = useState([]);
    const [search, setSearch] = useState('');

    function getManga() {
        axios.get(import.meta.env.VITE_PUBLIC_PATH + 'manga', {
            params: {
                search
            }
        })
            .then(res => {
                console.log(res.data)
                setManga(res.data)
            })
            .catch(err => console.log(err))
    };

    function searchManga(e) {
        e.preventDefault();
        getManga();
    };

    useEffect(() => {
        getManga()
    }, []);

    return (

        <>
            <div className="d-flex justify-content-between mt-4">
                <h1>Lista di manga</h1>
                <form className="row g-3" onSubmit={searchManga}>
                    <div className="col-auto">
                        <label className="visually-hidden">Cerca</label>
                        <input type="text" className="form-control" placeholder="Cerca"
                            value={search} onChange={(e) => setSearch(e.target.value)} />
                    </div>
                    <div className="col-auto">
                        <button type="submit" className="btn btn-primary mb-3">Cerca</button>
                    </div>
                </form>
            </div>
            <div className="row">
                {manga.length ? manga.map(manga => (
                    <div key={manga.id} className="col-12 col-md-4 mt-3">
                        <MangaCard data={manga} />
                    </div>
                )) : <div>Nessun elemento trovato</div>}
            </div>
        </>

    )
}

export default MangaPage;