import { useState, useEffect } from 'react'
import './style.css'
import { API_KEY } from '../../config'
import { filmes, series } from '../../genres.tsx'
import Item from '../Item/index.tsx'
import Profile from '../Profile/index.tsx'

export default function Search() {
    let page = 1
    const [ contents, setContents ] = useState([] as any[])
    const [ loading, setLoading ] = useState(false)

    async function fetchData(url: string, type: string) {
        return fetch(url, {headers: {"Authorization": API_KEY} } ).then(response => response.json())
        .then(res => { 
            if ( res.results?.length ?? 0 > 0 ) {
                res.results.forEach( (indice:any) => {indice.type = type} )
                setContents( 
                    (prevState) => [...prevState, ...res.results].sort( () => Math.round(Math.random()) )
                )
                return res
            } 

        } )
    }

    async function get_content(e:any) { 
        const section:any = document.querySelector('section:has(.results)')
        section.onscrollend = () => { if ( section.children[1].value !== '' && page ) { 
            console.log(page)
            get_content( {target: section.children[1]} )
        } }


        if (e.target.value === '') { return false }
        else { setLoading(true) }
        let query = []
        query.push( [ filmes.list.find(indice => indice.name.includes(e.target.value))?.id, 'movie' ] )
        query.push( [ series.list.find(indice => indice.name.includes(e.target.value))?.id, 'tv' ] )

        let responses: Promise<any>[] = []
        for (let indice of query) {
            if (indice[0]) {
                responses.push( 
                    fetchData(`https://api.themoviedb.org/3/discover/${indice[1]}?include_adult=true&include_video=false&language=pt-BR&page=${page}&sort_by=popularity.desc&with_genres=${indice[0]}`, indice[1]) 
                )
            }

            responses.push( 
                fetchData(`https://api.themoviedb.org/3/search/${indice[1]}?query=${e.target.value}&include_adult=true&language=pt-BR&page=${page}`, indice[1])
            )
        }

        Promise.all(responses).then( res => { 
            setLoading(false)
            if ( res[0]?.page === res[0]?.total_pages && res[1]?.page === res[1]?.total_pages ) {
                let section:any = document.querySelector('section > .results')
                section.onscrollend = undefined
                page = 0
                console.log('Search done')

            } else { page++ }

        } )
    }


    useEffect( () => { 
        let search:any = document.querySelector('#search')
        search.onsearch = (e:any) => { 
            setContents( () => [] ) ; page = 1
            get_content(e)
        }

        return () => { search = undefined }

    }, [] )

    return (
        <section className="w-full bg-zinc-950">
                <Profile href={'/src/assets/profile.jpg'} />
                <input type="search" className='text-zinc-800' id="search" placeholder='Digite sua pesquisa...' />
                <div className='results flex flex-wrap justify-center items-start px-10 bg-zinc-950'>
                    {contents.map(e => <Item title={e.title ?? e.name} pic={e.backdrop_path ?? e.poster_path} id={e.id} type={e.type} key={contents.indexOf(e)} />)}
                </div>

                { loading && 
                    <div className={`flex justify-center`}>
                        <svg className={`m-auto`} shapeRendering="auto" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" 
                        width="400px" height="400px" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid">
                            <path d="M45 50A5 5 0 0 0 55 50A5 5.5 0 0 1 45 50" fill="#ffffff" stroke="none">
                            <animateTransform attributeName="transform" type="rotate" dur="1s" repeatCount="indefinite" keyTimes="0;1" values="0 50 50.25;360 50 50.25"></animateTransform>
                            </path>
                        </svg>
                    </div>
                }
        </section>
    )
}




// https://api.themoviedb.org/3/search/${type}?query=${e.target.value}&include_adult=true&language=pt-BR&page=1
