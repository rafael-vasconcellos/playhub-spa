import { useState, useEffect } from 'react'
import './style.css'
import config from '../../config.json'
import { filmes, series } from '../../genres.tsx'
import Item from '../Item/index.tsx'

export default function Search() {
    const [ contents, setContents ] = useState([] as any[])

    function get_content(e:any) {
        setContents( () => [] )
        if (e.target.value === '') {return false}
        let query = []
        query.push( [ filmes.list.find(indice => indice.name.includes(e.target.value))?.id, 'movie' ] )
        query.push( [ series.list.find(indice => indice.name.includes(e.target.value))?.id, 'tv' ] )

        for (let indice of query) {
            if (indice[0]) {
                ajax(`https://api.themoviedb.org/3/discover/${indice[1]}?include_adult=true&include_video=false&language=pt-BR&page=1&sort_by=popularity.desc&with_genres=${indice[0]}`, indice[1])
            }

            ajax(`https://api.themoviedb.org/3/search/${indice[1]}?query=${e.target.value}&include_adult=true&language=pt-BR&page=1`, indice[1])
        }
    }

    function ajax(url: string, type: string) {
        let xml = new XMLHttpRequest()
        xml.open('GET', url)
        xml.setRequestHeader('accept', 'application/json')
        xml.setRequestHeader('Authorization', config.api_key)
        xml.onload = function() { if (xml?.status === 200) {
            let res = JSON.parse(xml.response)?.results
            res.forEach( (indice:any) => {indice.type = type} )
            setContents( (prevState) => {
                let new_value = [...prevState, ...res]
                return new_value.sort( () => Math.round(Math.random()) )
            } )
        } }
        xml.send()
    }

    useEffect( () => {
        let element:any = document.querySelector('#search')
        element.onsearch = get_content

        return () => {element = undefined}
    }, [] )

    return (
        <section className="w-full">
            <input type="search" className='text-zinc-800' id="search" placeholder='Digite sua pesquisa...' />
            <div className='flex flex-wrap bg-zinc-950'>
                {contents.map(e => <Item title={e.title ?? e.name} pic={e.backdrop_path ?? e.poster_path} id={e.id} type={e.type} key={contents.indexOf(e)} />)}
            </div>
        </section>
    )
}


// https://api.themoviedb.org/3/search/${type}?query=${e.target.value}&include_adult=true&language=pt-BR&page=1