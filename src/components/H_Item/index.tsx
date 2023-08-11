import { Link } from "react-router-dom"
import { routesInfo, strip } from "../../global"
import { path } from "../utils"

type ItemProps = { 
    title?: string,
    original_title?: string,
    pic: string,
    type: string,
    id: number
}

const H_Item: React.FC<ItemProps> = function( { title, pic, original_title, type, id } ) {
    const skeleton = !pic? 'bg-zinc-500' : ''
    function store() { 
        original_title = strip(original_title)
        const obj = {name: strip(title), original_title, id}
        const { name } = obj
        if ( name && original_title && id && !routesInfo.includes(obj) ) {
            routesInfo.push( obj )
        }
    }

    return (
        <Link to={path(type, title, original_title)} onClick={store}>
            <div className="flex gap-2 my-5 items-center" >
                <div className={`${skeleton} bg-contain bg-no-repeat`} style={ {width: '75px', height: '113px', backgroundImage: `url(https://www.themoviedb.org/t/p/w300_and_h450_bestv2${pic})`} } />
                <p style={ {maxWidth: '160px'} }>{title ?? 'Título'}</p>
            </div>
        </Link>
    )
}

export default H_Item