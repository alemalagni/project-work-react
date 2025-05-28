import { Link } from "react-router-dom"


function SeriesCard({serie}) {


    return (

        <>
            <div className="card shadow-sm h-100">
                <div>
                    <img className="card-img-top mx-auto d-block mt-3" src={serie.imagePath} alt={serie.name} style={{ maxHeight: "250px", width: "auto", objectFit: "cover" }} />
                </div>
                <div className="card-body d-flex flex-column">
                    <div>
                        <strong>{serie.name}</strong>
                        <p className="text-small">{serie.description}</p>
                        <p>Numero volumi: {serie.number_volumes}</p>
                    </div>
                <div className="mt-auto">
                    <Link to={`/serie/${serie.id}`} className="btn btn-outline-primary w-100 mt-3">
                        Tutti i volumi
                    </Link>
                </div>
                </div>
            </div >
        </>
    )
}

export default SeriesCard