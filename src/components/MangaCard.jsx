import { Link } from "react-router-dom"

function MangaCard({ data }) {
    return (
        <Link to={`/manga/${data.slug}`}>
            <div className="card shadow-sm h-100">
                <div>
                    <img className="card-img-top mx-auto d-block mt-3" src={data.imagePath} alt={data.title} style={{ maxHeight: "250px", width: "auto", objectFit: "cover" }} />
                </div>
                <div className="card-body d-flex flex-column">
                    <div>
                        <strong>{data.title}</strong>
                        <p>{data.price}</p>
                    </div>
                    <div className="mt-auto">
                        < button className="btn btn-outline-primary w-100 mt-3">Acquista</button>
                    </div>
                </div>
            </div >
        </Link>
    )
}

export default MangaCard