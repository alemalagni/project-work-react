function MangaCardOnCart({ item, onRemove }) {

    
  const prezzoBase = parseFloat(item.price);
  const discount = Number(item.discount) / 100;
  const prezzoScontato = prezzoBase * (1 - discount);
  const prezzoTotale = prezzoScontato * item.quantity;

  return (
    <li className="list-group-item d-flex align-items-center justify-content-between">
      <img src={item.imagePath} alt={item.title} style={{ width: 60, height: "auto" }} />
      <div className="flex-grow-1 ms-3">
        <strong>{item.title}</strong><br />
        Quantità: {item.quantity}<br />
        Prezzo: {prezzoTotale.toFixed(2).replace(".", ",")}€
      </div>
      <button 
        className="btn btn-sm btn-danger" 
        onClick={() => onRemove(item.id)} 
        aria-label={`Rimuovi ${item.title} dal carrello`}
      >
        &times;
      </button>
    </li>
  );
}

export default MangaCardOnCart;
