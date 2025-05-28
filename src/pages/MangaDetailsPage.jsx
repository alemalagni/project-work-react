import { Link } from "react-router-dom";

function MangaDetailsPage({ data }) {

    const { slug, title, ISBN, release_date, price, pages, genre, series_description, imagePath } = data;

    return (

        <>
            <div>
                <Link to={`/manga/${slug}`}>
                    <img src={imagePath} alt={title} />
                    <div>
                        <h5>{title}</h5>
                        <p>"{series_description}"</p>
                        <article>Number of pages: {pages}</article>
                        <article>Genre: {genre}</article>
                        <article>{price}</article>
                        <article>ISBN: {ISBN}</article>
                        <article>Relase: {release_date}</article>
                    </div>
                </Link>
            </div>
        </>

    )
}

export default MangaDetailsPage;