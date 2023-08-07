import { Link } from "react-router-dom"
import { path } from "../Details/utils"

type ItemProps = { 
    type?: string,
    title?: string,
    pic?: string,
    id?: number | undefined,
    original_title?: string,
}

const H_Item: React.FC<ItemProps> = function( { type, title, pic, original_title } ) {
    const skeleton = !pic? 'bg-zinc-500' : ''

    return (
        <Link to={path(type, title, original_title)}>
            <div className="flex gap-2 my-5 items-center" >
                <div className={`${skeleton} bg-contain bg-no-repeat`} style={ {width: '75px', height: '113px', backgroundImage: `url(https://www.themoviedb.org/t/p/w300_and_h450_bestv2${pic})`} } />
                <p style={ {maxWidth: '160px'} }>{title ?? 'Título'}</p>
            </div>
        </Link>
    )
}

export default H_Item