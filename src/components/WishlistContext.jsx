import { createContext, useContext, useState } from "react";

const WishlistContext = createContext();

export const useWishlist = () => useContext(WishlistContext);

export const WishlistProvider = ({ children }) => {
    const [wishlist, setWishlist] = useState([]);

    const addToWishlist = (item) => {
        setWishlist((prev) => {
            // Evita duplicati
            if (prev.find((m) => m.slug === item.slug)) return prev;
            return [...prev, item];
        });
    };

    return (
        <WishlistContext.Provider value={{ wishlist, addToWishlist }}>
            {children}
        </WishlistContext.Provider>
    );
};
