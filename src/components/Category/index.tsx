import { useState, useEffect } from 'react'
import './style.css'
import config from '../../config.json'
import Item from '../Item'

type categoryProps = {
    id: number,
    name: string,
    type: string
}
const Category:React.FC<categoryProps> = function( {id, name, type} ) {
    const contentSchema = {title: '', backdrop_path: '', id: undefined}
    const [skeleton, setSkeleton] = useState('text-zinc-500 bg-zinc-500 animate-pulse')
    const [ contents, setContents ] = useState(Array(8).fill(contentSchema))

    useEffect( () => {
        let xml:XMLHttpRequest | undefined = new XMLHttpRequest()
        xml.open('GET', `https://api.themoviedb.org/3/discover/${type}?include_adult=true&include_video=false&language=pt-BR&page=1&sort_by=popularity.desc&with_genres=${id}`)
        xml.setRequestHeader('accept', 'application/json')
        xml.setRequestHeader('Authorization', config.api_key)
        xml.onload = function() { if (xml?.status===200) {
            let res = JSON.parse(xml.response)
            setContents(() => res.results)
            setSkeleton(() => '')
        } }
        xml.send()

        return () => {
            xml = undefined
        }

    }, [] )

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

                        <div className='flex gap-5 items-start py-5 px-3 overflow-x-scroll overflow-y-visible scroll-smooth'>

                            {contents.map(e => <Item title={e.title ?? e.name} pic={e.backdrop_path ?? e.poster_path} id={e.id} type={type} key={e.id} />)}

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