function manga({ img, title, price }) {
    return (
        <div>
            <div>
                <img src={img} alt="" />
            </div>
            <div>
                <strong>{title}</strong>
                <p>{price}</p>
            </div>
            <button>Acquista</button>
        </div>
    )
}

export default manga;