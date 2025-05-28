import manga from './manga'

function MangaCard() {
    return (
        <div>
            <ul style={'display: none'}>
                {manga.map(manga => (
                    <li key={manga.id} />
                ))}
            </ul>
        </div>
    )
}

export default MangaCard