import { Link } from "react-router-dom"

function MangaCard({ data }) {
    const prezzo = String(data.price);
    let decimale = prezzo.slice(prezzo.indexOf(".") + 1);

    if (prezzo.slice(prezzo.indexOf(".") + 1).length === 1) {
        decimale = prezzo.slice(prezzo.indexOf(".") + 1) + "0";
    } else if (prezzo.slice(prezzo.indexOf(".") + 1).length === 0) {
        decimale = "00";
    } else if (prezzo.slice(prezzo.indexOf(".") + 1).length === 2) {
        decimale = prezzo.slice(prezzo.indexOf(".") + 1);
    }

    const prezzoNuovo = prezzo.slice(0, prezzo.indexOf(".")) + "," + decimale;

    return (
        <div className="card shadow-sm h-100">
            <Link to={`/manga/${data.slug}`}>
                <div>
                    <img className="card-img-top mx-auto d-block mt-3" src={data.imagePath} alt={data.title} style={{ maxHeight: "250px", width: "auto", objectFit: "cover" }} />
                </div>
            </Link>
            <div className="card-body d-flex flex-column">
                <div className="text-center">
                    <p><strong>{data.title}</strong></p>
                    <p><strong>{`${prezzoNuovo}€`}</strong></p>
                    <p><strong>Genere:</strong> {`${data.genre}`}</p>
                </div>
                <button className="btn btn-warning text-primary-emphasis mt-4">
                    <i className="fas fa-shopping-cart me-2"></i>Aggiungi al carrello
                </button>
            </div>
        </div >
    )
}

export default MangaCard