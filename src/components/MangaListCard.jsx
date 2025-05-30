import { Link } from "react-router-dom";
import DiscountBedge from "./DiscountBedge";

function MangaListCard({ data }) {

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

    // CALCOLO DELLO SCONTO
    const prezzoBaseNumerico = parseFloat(data.price);
    // controllo che sia numero
    const discountPercentualeNumerico = Number(data.discount);
    const discount = discountPercentualeNumerico / 100;
    const prezzoScontatoNumerico = prezzoBaseNumerico * (1 - discount);
    const prezzoScontatoFormattato = prezzoScontatoNumerico.toFixed(2).replace(".", ",");

    return (
        <div className="card shadow-sm h-100 flex-row align-items-center p-2" style={{ position: 'relative' }}>
            <DiscountBedge discount={discountPercentualeNumerico} />
            <Link to={`/manga/${data.slug}`}>
                <img
                    className="rounded"
                    src={data.imagePath}
                    alt={data.title}
                    style={{ height: "120px", width: "80px", objectFit: "cover" }}
                />
            </Link>
            <div className="card-body d-flex flex-column justify-content-between ms-3 p-2">
                <div>
                    <h5 className="mb-1">
                        <Link to={`/manga/${data.slug}`} style={{ color: "inherit", textDecoration: "none" }}>
                            {data.title}
                        </Link>
                    </h5>
                    <div>
                        {Number(data.discount) > 0 ? (
                            <>
                                <span className="text-decoration-line-through text-muted me-2">
                                    <strong>{`${prezzoNuovo}€`}</strong>
                                </span>
                                <span className="text-danger">
                                    <strong>{`${prezzoScontatoFormattato}€`}</strong>
                                </span>
                            </>
                        ) : (
                            <span>
                                <strong>{`${prezzoNuovo}€`}</strong>
                            </span>
                        )}
                    </div>
                    <div className="text-muted small mt-1">
                        <strong>Genere:</strong> {data.genre}
                    </div>
                </div>
                <button className="btn btn-warning text-primary-emphasis mt-2 align-self-end">
                    <i className="fas fa-shopping-cart me-2"></i>Aggiungi al carrello
                </button>
            </div>
        </div>
    );
}

export default MangaListCard;