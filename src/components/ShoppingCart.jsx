import React, { useState, useEffect } from 'react';

export default function ShoppingCart() {
    const [cartItems, setCartItems] = useState([]);

    useEffect(() => {
        const savedCart = localStorage.getItem('cart');
        if (savedCart) {
            try {
                setCartItems(JSON.parse(savedCart));
            } catch (error) {
                console.error("Errore nel parsing del carrello dal localStorage:", error);
                setCartItems([]);
            }
        }
    }, []);

    const addToCart = (itemToAdd) => {
        const existingItem = cartItems.find(item => item.id === itemToAdd.id);

        let updatedCart;
        if (existingItem) {
            updatedCart = cartItems.map(item =>
                item.id === itemToAdd.id
                    ? { ...item, quantity: item.quantity + 1 }
                    : item
            );
        } else {
            updatedCart = [...cartItems, { ...itemToAdd, quantity: 1 }];
        }

        setCartItems(updatedCart);
        localStorage.setItem('cart', JSON.stringify(updatedCart));
    };

    const removeFromCart = (itemId) => {
        const updatedCart = cartItems.filter(item => item.id !== itemId);
        setCartItems(updatedCart);

        localStorage.setItem('cart', JSON.stringify(updatedCart));
    };

    const clearCart = () => {
        setCartItems([]);
        localStorage.removeItem('cart');
    };

    // Esempio di un articolo che potresti aggiungere
    const exampleManga = {
        id: 'manga-123',
        title: 'One Piece Vol. 100',
        price: 7.50,
        image: 'path/to/one-piece-100.jpg'
    };

    return (
        <div className="container my-5">
            <h2>Il Mio Carrello</h2>
            <button onClick={() => addToCart(exampleManga)}>Aggiungi One Piece Vol. 100</button>
            <button onClick={clearCart} className="ms-2">Svuota Carrello</button>

            {cartItems.length === 0 ? (
                <p>Il carrello è vuoto.</p>
            ) : (
                <ul className="list-group mt-3">
                    {cartItems.map(item => (
                        <li key={item.id} className="list-group-item d-flex justify-content-between align-items-center">
                            <div>
                                <h5>{item.title}</h5>
                                <p>Prezzo: €{item.price.toFixed(2)} | Quantità: {item.quantity}</p>
                            </div>
                            <button className="btn btn-danger btn-sm" onClick={() => removeFromCart(item.id)}>
                                Rimuovi
                            </button>
                        </li>
                    ))}
                </ul>
            )}
            <p className="mt-3">
                Totale articoli nel carrello: {cartItems.reduce((total, item) => total + item.quantity, 0)}
            </p>
            <p className="mt-3">
                Costo totale: €{cartItems.reduce((total, item) => total + (item.price * item.quantity), 0).toFixed(2)}
            </p>
        </div>
    );
}
