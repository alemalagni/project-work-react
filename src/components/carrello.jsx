import { useState } from 'react';

function Carrello() {
    const [carrello, setCarrello] = useState([]);

    const addProduct = (product) => {
        setCarrello([...carrello, product]);
    };

    const removeProduct = (id) => {
        setCarrello(carrello.filter(product => product.id !== id));
    };

    const tot = () => {
        carrello.reduce((total, product) => total + product.price, 0);
    };

    return (
        <div className='container-carrello'>
            <h2 className='titolo-carrello'>Carrello</h2>
            {carrello.map(product => (
                <div key={product.id} className='container-prezzo'>
                    {product.name} - {product.price}
                    <button className='remove-button' onClick={() => removeProduct(product.id)}>Rimuovi</button>
                </div>
            ))}
            <p className='totale-carrello'>Totale: {tot()}</p>
        </div>
    );
};

export default Carrello;