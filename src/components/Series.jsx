import axios from "axios"
import { useEffect, useState } from "react"
import SeriesCard from "./SeriesCard"


function Series() {

    const [series, setSeries] = useState([])

    function getSeries() {
        axios.get('http://127.0.0.1:4000/manga/series')
            .then(res => {
                console.log(res.data)
                setSeries(res.data)
            })
            .catch(err => console.log(err))
    }

    useEffect(() => {
        getSeries()
    }, [])


    return (

        <>
            <div className="row">
                {series.length ? series.map(series => (
                    <div key={series.id} className="col-12 col-md-4 mt-3">
                        <SeriesCard serie={series} />
                    </div>
                )) : <div>Nessun elemento trovato</div>}
            </div>
        </>
    )
}

export default Series