import { Link } from "react-router-dom";
import DiscountBedge from "./DiscountBedge";
import HeartIcon from "./HeartIcon";
import { useWishlist } from "./WishlistContext";


function MangaCard({ data }) {
    const { addToWishlist } = useWishlist();


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
    const discountPercentualeNumerico = Number(data.discount);
    const discount = discountPercentualeNumerico / 100;
    const prezzoScontatoNumerico = prezzoBaseNumerico * (1 - discount);
    const prezzoScontatoFormattato = prezzoScontatoNumerico.toFixed(2).replace(".", ",");



    return (
        <div className="card shadow-sm h-100" style={{ position: "relative" }}>
            {/* Bottone cuore */}
            <button

                style={{

                    position: "absolute",
                    top: "10px",
                    right: "10px",
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    padding: 0,
                    margin: 0,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    width: "40px",
                    height: "40px",
                    zIndex: 20,
                }}
                aria-label="Vai alla wishlist"
            >

                {/* NAMOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO   <-------------- INSERIRE QUI IL COMPONENTE DEL CUORE */}
                <HeartIcon
                    manga={data} // passa l'intero manga o solo lo slug
                    onToggle={(liked) => {
                        if (liked) {
                            addToWishlist(data);
                        }
                    }}
                />
            </button>

            {/* Badge sconto sotto il cuore */}
            {/* {discountPercentualeNumerico > 0 && (

          <DiscountBedge discount={discountPercentualeNumerico} />
        
      )} */}

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
                    <p>
                        <strong>{data.title}</strong>
                    </p>
                </div>
                <div className="mt-1 d-flex flex-column">
                    <div className="text-center">
                        {discountPercentualeNumerico > 0 ? (
                            <>
                                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.25rem' }}>
                                    <DiscountBedge discount={discountPercentualeNumerico} />
                                    <div>
                                        <span className="text-decoration-line-through text-muted me-2">
                                            <strong>{`${prezzoNuovo}€`}</strong>
                                        </span>
                                        <span className="text-danger">
                                            <strong>{`${prezzoScontatoFormattato}€`}</strong>
                                        </span>
                                    </div>
                                </div>

                            </>
                        ) : (
                            <span>
                                <strong>{`${prezzoNuovo}€`} </strong>
                            </span>

                        )}
                        <div>

                            <p>
                                <strong>Genere:</strong> {`${data.genre}`}
                            </p>
                        </div>

                    </div>

                    <button className="btn btn-warning text-primary-emphasis mt-1">
                        <i className="fas fa-shopping-cart me-2"></i>Aggiungi al carrello
                    </button>
                </div>
            </div>
        </div>
    );
}

export default MangaCard;
