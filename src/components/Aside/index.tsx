import H_Item from "../H_Item"


const Aside: React.FC<{content: any[], name: string}> = function( {content, name} ) {

    return (
        <aside className="absolute top-0 right-4">
            <h1 className="font-bold text-xl">{name}{name? ':' : ''}</h1>
            <div>
                {content.map(e => <H_Item type={e.media_type} title={e.title ?? e.name} pic={e.backdrop_path ?? e.poster_path} original_title={e.original_title ?? e.original_name} key={`aside ${e.id}`} />)}
            </div>
        </aside>
    )
}

export default Aside