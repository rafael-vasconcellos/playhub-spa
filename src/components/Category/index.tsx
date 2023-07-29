import { useState } from 'react'
import './style.css'
import { API_KEY } from '../../config'
import Item from '../Item'
import { useQuery } from 'react-query'

type categoryProps = {
    id: number,
    name: string,
    type: string
}
const Category:React.FC<categoryProps> = function( {id, type, name} ) {
    const contentSchema = {title: '', name: '', backdrop_path: '', poster_path: '', id: undefined}
    const [skeleton, setSkeleton] = useState('text-zinc-500 bg-zinc-500 animate-pulse')
    const [ contents, setContents ] = useState(Array(8).fill(contentSchema))
    //const { data, isFetching } = 
    useQuery(`discover shows ${type} ${name}`, async() => {
            await new Promise( resolve => setTimeout(resolve, 3000) )
            return await fetch(`https://api.themoviedb.org/3/discover/${type}?include_adult=true&include_video=false&language=pt-BR&page=1&sort_by=popularity.desc&with_genres=${id}`, {
                headers: {"Authorization": API_KEY}
            } ).then(res => res.json()).then(res => { 
                setContents(() => res.results)
                setSkeleton(() => '')
                return res
            } )
        }, { staleTime: 1000*180 /* 3min */ }
    )

    return (
        <div className='category'>
                <h1 className={`${skeleton} px-2 inline-block text-2xl font-bold`}>{type==='tv'? 'Séries de ' : 'Filmes de '}{name}</h1>
                <div className='carrosel-itens flex' style={ {maxWidth: '98vw'} }>
                        <div className="cursor-pointer h-full pt-28 px-1">
                            <button className="bg-zinc-700 rounded-full px-4 pb-3 pt-2 font-bold text-4xl"
                             onClick={(e:any) => {
                                let el = e.target.parentElement?.nextSibling
                                el.scrollBy(-el.offsetWidth, 0)
                            } }>
                                {"<"}
                            </button>
                        </div>

                        <div className='flex gap-5 items-start px-3 py-4 overflow-x-scroll overflow-y-visible scroll-smooth'>

                            {contents.map(e => <Item title={e.title ?? e.name} pic={e.backdrop_path ?? e.poster_path} id={e.id} type={type} key={`${e.id ?? Math.random()}`} />)}

                        </div>

                        <div className="cursor-pointer h-full pt-28 pl-3">
                            <button className="bg-zinc-700 rounded-full px-4 pb-3 pt-2 font-bold text-4xl"
                             onClick={(e:any) => {
                                let el = e.target.parentElement?.previousSibling
                                el.scrollBy(el.offsetWidth, 0)
                            } }>
                                {">"}
                            </button>
                        </div>
                </div>
        </div>
    )
}


export default Category