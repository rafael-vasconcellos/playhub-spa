import H_Item from "../H_Item"


type AsideContent = {
    "adult": boolean,
    "backdrop_path": string,
    "id": number,
    "title": string,
    "name": string
    "original_language": string,
    "original_title": string,
    "original_name": string
    "overview": string,
    "poster_path": string,
    "media_type": string,
    "genre_ids": number[]
    "popularity": number,
    "release_date": string,
    "video": boolean,
    "vote_average": number,
    "vote_count": number
}

const Aside: React.FC<{content: AsideContent[], name: string}> = function( {content, name} ) {

    return (
        <aside className="absolute top-0 right-4">
            <h1 className="font-bold text-xl">{name}{name? ':' : ''}</h1>
            <div>
                {content.map(e => 
                    <H_Item type={e.media_type} title={e.title ?? e.name} pic={e.backdrop_path ?? e.poster_path} 
                    original_title={e.original_title ?? e.original_name}
                    id={e.id} key={`aside ${e.id}`} />)}
            </div>
        </aside>
    )
}

export default Aside