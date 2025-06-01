import MangaCard from '../components/MangaCard';
import { useWishlist } from '../contexts/WishListContext';

function Wishlist() {
    const { wishlist } = useWishlist();

    return (
        <div className="container mt-4">
            <h1 className="text-center mb-4">La mia Wishlist</h1>
            {wishlist && wishlist.length > 0 ? (
                <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
                    {wishlist.map(manga => (
                        <div key={manga.slug} className="col">
                            <MangaCard data={manga} />
                        </div>
                    ))}
                </div>
            ) : (
                <div className="alert alert-info text-center" role="alert">
                    La tua wishlist è vuota. Aggiungi i tuoi manga preferiti!
                </div>
            )}
        </div>
    );
}

export default Wishlist;