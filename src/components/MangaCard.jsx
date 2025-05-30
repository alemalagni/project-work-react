// import { Link } from "react-router-dom"

// function MangaCard({ data }) {
//     const prezzo = String(data.price);
//     let decimale = prezzo.slice(prezzo.indexOf(".") + 1);

//     if (prezzo.slice(prezzo.indexOf(".") + 1).length === 1) {
//         decimale = prezzo.slice(prezzo.indexOf(".") + 1) + "0";
//     } else if (prezzo.slice(prezzo.indexOf(".") + 1).length === 0) {
//         decimale = "00";
//     } else if (prezzo.slice(prezzo.indexOf(".") + 1).length === 2) {
//         decimale = prezzo.slice(prezzo.indexOf(".") + 1);
//     }

//     const prezzoNuovo = prezzo.slice(0, prezzo.indexOf(".")) + "," + decimale;

//     // calcolo dello sconto e del prezzo scontato
//     const discountValue = data.discount / 100;
//     const discount = (discountValue * data.price).toFixed(2);
//     const prezzoScontato = data.price - (discount);
//     console.log(prezzoScontato);


//     return (
//         <div className="card shadow-sm h-100">
//             <Link to={`/manga/${data.slug}`}>
//                 <div>
//                     <img className="card-img-top mx-auto d-block mt-3" src={data.imagePath} alt={data.title} style={{ maxHeight: "250px", width: "auto", objectFit: "cover" }} />
//                 </div>
//             </Link>
//             <div className="card-body d-flex flex-column justify-content-between">
//                 <div className="text-center">
//                     <p><strong>{data.title}</strong></p>
//                     {(data.discount !== 0) ? (
//                         // Avvolgi i due span in un Fragment
//                         <>
//                             <span><strong>{`${prezzoNuovo}€`}</strong></span>
//                             <span><strong>{`${prezzoScontato}€`}</strong></span>
//                         </>
//                     ) : (
//                         <span><strong>{`${prezzoNuovo}€`}</strong></span>
//                     )}
//                     <p><strong>Genere:</strong> {`${data.genre}`}</p>
//                 </div>
//                 <button className="btn btn-warning text-primary-emphasis mt-4">
//                     <i className="fas fa-shopping-cart me-2"></i>Aggiungi al carrello
//                 </button>
//             </div>
//         </div >
//     )
// }

// export default MangaCard

import { Link } from "react-router-dom";

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

    // CALCOLO DELLO SCONTO
    const prezzoBaseNumerico = parseFloat(data.price);
    // controllo che sia numero
    const discountPercentualeNumerico = Number(data.discount);
    const discount = discountPercentualeNumerico / 100;
    const prezzoScontatoNumerico = prezzoBaseNumerico * (1 - discount);
    const prezzoScontatoFormattato = prezzoScontatoNumerico.toFixed(2).replace(".", ",");

    return (
        <div className="card shadow-sm h-100">
            <Link to={`/manga/${data.slug}`}>
                <div>
                    <img
                        className="card-img-top mx-auto d-block mt-3"
                        src={data.imagePath}
                        alt={data.title}
                        style={{ maxHeight: "250px", width: "auto", objectFit: "cover" }}
                    />
                </div>
            </Link>
            <div className="card-body d-flex flex-column justify-content-between">
                <div className="text-center">
                    <p><strong>{data.title}</strong></p>
                </div>
                <div className="mt-1 d-flex flex-column">
                    <div className="text-center">
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

                        <p><strong>Genere:</strong> {`${data.genre}`}</p>
                    </div>

                    <button className="btn btn-warning text-primary-emphasis mt-1">
                        <i className="fas fa-shopping-cart me-2"></i>Aggiungi al carrello
                    </button>
                </div>
            </div>
        </div >
    );
}

export default MangaCard;