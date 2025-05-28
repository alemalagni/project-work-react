import axios from "axios";
import { useEffect, useState } from "react";
import MangaCard from "../components/MangaCard";


function MangaPage() {

    const [manga, setManga] = useState([])
    console.log(import.meta.env.VITE_PUBLIC_PATH)
    function getManga() {
        axios.get(import.meta.env.VITE_PUBLIC_PATH + 'manga')
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
            <h1>Lista di manga</h1>
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