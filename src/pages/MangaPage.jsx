import { useEffect, useState } from "react";
import axios from "axios";
import MangaCard from "../components/MangaCard";

function MangaPage() {

    const [mangas, setManga] = useState([]);

    const url = 'http://127.0.0.1:3007/manga';

    function mangaList() {

        axios.get(url)
            .then(response => { setManga(response.data) })
            .catch(err => console.log(err))
    };

    useEffect(mangaList, []);

    return (

        <>
            <section>
                <div>
                    {mangas.length ? mangas.map(manga => (
                        <div key={manga.id}>
                            <MangaCard data={manga} />
                        </div>
                    )) : <div>Sorry, we don't have any manga in this moment. Try later.</div>}
                </div>
            </section>
        </>

    )
}

export default MangaPage;